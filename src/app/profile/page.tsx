
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const userOrders = [
  { id: "#1005", product: "Warm Fleece Jacket", status: "Delivered", date: "2023-06-27", amount: "रू1500.00" },
  { id: "#1004", product: "Stainless Steel Pot Set", status: "On the Way", date: "2023-06-26", amount: "रू2500.00" },
  { id: "#1003", product: "Basmati Rice (25kg)", status: "Confirmed", date: "2023-06-25", amount: "रू3200.00" },
  { id: "#1002", product: "Solar Powered Lamp", status: "Delivered", date: "2023-06-24", amount: "रू800.00" },
  { id: "#1001", product: "Durable Farm Shovel", status: "Delivered", date: "2023-06-23", amount: "रू650.00" },
];


export default function ProfilePage() {
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
              <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="outline">Upload Photo</Button>
          </div>
          <div className="grid gap-4 flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button>Save Changes</Button>
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
                <Input id="current-password" type="password" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button>Update Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View your past orders and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
