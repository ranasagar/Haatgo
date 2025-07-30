
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useOrders } from "@/context/order-context"
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import { useUserProfile } from "@/context/user-profile-context"
import dynamic from 'next/dynamic'

const InteractiveMap = dynamic(() => import('@/components/haatgo/interactive-map'), { ssr: false });

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const { profile, setProfile } = useUserProfile();
  const { toast } = useToast();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [address, setAddress] = useState(profile.address);
  const [lat, setLat] = useState(profile.lat);
  const [lon, setLon] = useState(profile.lon);
  
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  useEffect(() => {
    if (user?.displayName) {
      const nameParts = user.displayName.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
    }
  }, [user]);

  useEffect(() => {
    setAddress(profile.address);
    setLat(profile.lat);
    setLon(profile.lon);
  }, [profile]);

  if (!user) {
    // This should be handled by middleware, but as a fallback:
    useEffect(() => {
        router.push('/login');
    }, [router]);
    return null;
  }

  const handleProfileUpdate = async () => {
    setLoadingProfile(true);
    const displayName = `${firstName} ${lastName}`.trim();
    try {
      await updateProfile(user, { displayName });
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (!currentPassword || !newPassword) {
        toast({ title: "Please fill all password fields", variant: "destructive"});
        return;
    }

    setLoadingPassword(true);

    try {
      if(user.email) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        
        toast({
          title: "Password Updated",
          description: "You have been logged out for security. Please log in again with your new password.",
        });
        await logout();
      }
    } catch (error: any) {
        let errorMessage = "Failed to update password.";
        if (error.code === 'auth/wrong-password') {
            errorMessage = "The current password you entered is incorrect.";
        }
         if (error.code === 'auth/weak-password') {
            errorMessage = "The new password is too weak. It should be at least 6 characters.";
        }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoadingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };
  
  const handleAddressUpdate = () => {
    setLoadingAddress(true);
    if (!address) {
        toast({ title: "Address is required", variant: "destructive" });
        setLoadingAddress(false);
        return;
    }
    setProfile({ address, lat, lon });
    toast({
        title: "Address Updated",
        description: "Your address has been successfully saved.",
    });
    setLoadingAddress(false);
  }

  const handlePositionChange = (position: { lat: number, lng: number }) => {
    setLat(position.lat.toString());
    setLon(position.lng.toString());
  }

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information and photo.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex flex-col items-center gap-4">
             <Avatar className="h-24 w-24">
              <AvatarImage src={user.photoURL || `https://placehold.co/100x100.png`} alt="User Avatar" />
              <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" disabled>Upload Photo</Button>
          </div>
          <div className="grid gap-4 flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={user.email || ''} readOnly disabled />
              </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button onClick={handleProfileUpdate} disabled={loadingProfile}>
            {loadingProfile ? 'Saving...' : 'Save Changes'}
            </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
            <CardDescription>Update your primary shipping address. Drag the pin to set your location.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g., 123 Main St, Kathmandu" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="lat">Latitude</Label>
                    <Input id="lat" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="e.g., 27.7172" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="lon">Longitude</Label>
                    <Input id="lon" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="e.g., 85.3240" />
                </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-64 border">
              <InteractiveMap 
                position={{ lat: parseFloat(lat), lng: parseFloat(lon) }} 
                onPositionChange={handlePositionChange}
              />
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button onClick={handleAddressUpdate} disabled={loadingAddress}>
                {loadingAddress ? 'Saving...' : 'Save Address'}
            </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button onClick={handlePasswordUpdate} disabled={loadingPassword}>
                {loadingPassword ? 'Updating...' : 'Update Password'}
            </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View your past orders and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">रू{order.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">You haven't placed any orders yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
