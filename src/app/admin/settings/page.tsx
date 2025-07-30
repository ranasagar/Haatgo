
"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
    const { toast } = useToast();
    const [links, setLinks] = useState({
        whatsapp: '+9779800000000',
        viber: '+9779800000000',
        instagram: 'haatgo',
        facebook: 'haatgo'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setLinks(prev => ({...prev, [id]: value}));
    }

    const handleSave = () => {
        // In a real app, you would save these to a database.
        // For this demo, we'll just show a success toast.
        console.log("Saving links:", links);
        toast({
            title: "Settings Saved",
            description: "Your chat and messenger links have been updated.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Settings</CardTitle>
                <CardDescription>Manage the contact links for the floating chat buttons on your storefront.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" value={links.whatsapp} onChange={handleInputChange} placeholder="e.g., +9779800000000" />
                    <p className="text-sm text-muted-foreground">Include country code. This will generate a <code>https://wa.me/</code> link.</p>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="viber">Viber Number</Label>
                    <Input id="viber" value={links.viber} onChange={handleInputChange} placeholder="e.g., +9779800000000" />
                     <p className="text-sm text-muted-foreground">Include country code. This will generate a <code>viber://chat?number=</code> link.</p>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="instagram">Instagram Username</Label>
                    <Input id="instagram" value={links.instagram} onChange={handleInputChange} placeholder="e.g., your_username" />
                     <p className="text-sm text-muted-foreground">This will generate a <code>https://ig.me/m/</code> link.</p>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="facebook">Facebook Page Username/ID</Label>
                    <Input id="facebook" value={links.facebook} onChange={handleInputChange} placeholder="e.g., yourpage" />
                    <p className="text-sm text-muted-foreground">This will generate a <code>https://m.me/</code> link.</p>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}
