
"use client"

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/context/app-settings-context";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    const { toast } = useToast();
    const { settings, setSettings } = useAppSettings();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type } = e.target;
        setSettings(prev => ({
            ...prev, 
            [id]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    }

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettings(prev => ({...prev, appLogo: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    }


    const handleSave = () => {
        // In a real app, you would save these to a database.
        // For this demo, we'll just show a success toast and update context.
        // The value is already updated via handleInputChange and setSettings.
        toast({
            title: "Settings Saved",
            description: "Your settings have been updated.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Manage general application settings, finances, and contact links.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="appName">Application Name</Label>
                    <Input id="appName" value={settings.appName} onChange={handleInputChange} placeholder="e.g., HaatGo" />
                    <p className="text-sm text-muted-foreground">This name will appear throughout the application.</p>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="appLogo">Application Logo</Label>
                    {settings.appLogo && (
                        <Image src={settings.appLogo} alt="App Logo Preview" width={64} height={64} className="rounded-md border p-1" />
                    )}
                    <Input id="appLogoInput" type="file" onChange={handleLogoChange} accept="image/*" className="file:text-primary file:font-semibold"/>
                    <p className="text-sm text-muted-foreground">Recommended size: 64x64px. Will replace the default truck icon.</p>
                </div>

                <Separator />
                <h3 className="font-semibold text-lg">Financial Settings</h3>
                <div className="grid gap-2">
                    <Label htmlFor="vatRate">VAT Rate (%)</Label>
                    <Input id="vatRate" type="number" value={settings.vatRate} onChange={handleInputChange} placeholder="e.g., 13" />
                    <p className="text-sm text-muted-foreground">The Value Added Tax rate to be applied at checkout.</p>
                </div>


                 <div className="border-t pt-6 grid gap-6">
                    <h3 className="font-semibold text-lg">Contact Links</h3>
                    <div className="grid gap-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input id="whatsapp" value={settings.whatsapp} onChange={handleInputChange} placeholder="e.g., +9779800000000" />
                        <p className="text-sm text-muted-foreground">Include country code. This will generate a <code>https://wa.me/</code> link.</p>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="viber">Viber Number</Label>
                        <Input id="viber" value={settings.viber} onChange={handleInputChange} placeholder="e.g., +9779800000000" />
                         <p className="text-sm text-muted-foreground">Include country code. This will generate a <code>viber://chat?number=</code> link.</p>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="instagram">Instagram Username</Label>
                        <Input id="instagram" value={settings.instagram} onChange={handleInputChange} placeholder="e.g., your_username" />
                         <p className="text-sm text-muted-foreground">This will generate a <code>https://ig.me/m/</code> link.</p>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="facebook">Facebook Page Username/ID</Label>
                        <Input id="facebook" value={settings.facebook} onChange={handleInputChange} placeholder="e.g., yourpage" />
                        <p className="text-sm text-muted-foreground">This will generate a <code>https://m.me/</code> link.</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}
