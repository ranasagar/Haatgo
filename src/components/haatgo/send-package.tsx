
"use client"

import * as React from "react"
import { Send, PackagePlus, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import { routeStops } from "@/lib/data"
import { useParcels } from "@/context/parcel-context"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

const defaultParcel = {
    fromStop: '',
    toStop: '',
    senderName: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: '',
    description: ''
}

export function SendPackage() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [newParcel, setNewParcel] = React.useState(defaultParcel);
    const { addParcel } = useParcels();
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setNewParcel(prev => ({...prev, [id]: value}));
    }

    const handleSelectChange = (field: 'fromStop' | 'toStop') => (value: string) => {
        setNewParcel(prev => ({...prev, [field]: value}));
    }

    const handleSubmit = () => {
        if (
            newParcel.fromStop && newParcel.toStop && newParcel.fromStop !== newParcel.toStop &&
            newParcel.senderName && newParcel.senderPhone &&
            newParcel.receiverName && newParcel.receiverPhone &&
            newParcel.description
        ) {
            addParcel(newParcel);
            toast({
                title: "Package Request Sent!",
                description: "Your package is scheduled for pickup.",
            });
            setNewParcel(defaultParcel);
            setIsOpen(false);
        } else {
             toast({
                title: "Incomplete Information",
                description: "Please fill out all fields and ensure pickup and destination are different.",
                variant: "destructive"
            });
        }
    }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-xl">Send a Package</CardTitle>
                <Send className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Need to send something to the next village? We can deliver it along our route.
                </p>
            </CardContent>
            <CardFooter>
                 <DialogTrigger asChild>
                    <Button className="w-full">
                        <PackagePlus className="mr-2 h-4 w-4" />
                        Create a Shipment
                    </Button>
                </DialogTrigger>
            </CardFooter>
        </Card>
        <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
                <DialogTitle>Create a Shipment</DialogTitle>
                <DialogDescription>
                    Fill in the details below to send a package from one stop to another.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="fromStop">From</Label>
                         <Select onValueChange={handleSelectChange('fromStop')} value={newParcel.fromStop}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a pickup stop" />
                            </SelectTrigger>
                            <SelectContent>
                                {routeStops.map(stop => (
                                    <SelectItem key={stop.name} value={stop.name}>{stop.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="toStop">To</Label>
                         <Select onValueChange={handleSelectChange('toStop')} value={newParcel.toStop}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a destination" />
                            </SelectTrigger>
                            <SelectContent>
                                {routeStops.map(stop => (
                                    <SelectItem key={stop.name} value={stop.name}>{stop.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="senderName">Sender Name</Label>
                        <Input id="senderName" value={newParcel.senderName} onChange={handleInputChange} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="senderPhone">Sender Phone</Label>
                        <Input id="senderPhone" type="tel" value={newParcel.senderPhone} onChange={handleInputChange} />
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="receiverName">Receiver Name</Label>
                        <Input id="receiverName" value={newParcel.receiverName} onChange={handleInputChange} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="receiverPhone">Receiver Phone</Label>
                        <Input id="receiverPhone" type="tel" value={newParcel.receiverPhone} onChange={handleInputChange} />
                    </div>
                </div>
                <Separator />
                 <div className="grid gap-2">
                    <Label htmlFor="description">Package Description</Label>
                    <Textarea id="description" placeholder="e.g., A small box of clothes, important documents" value={newParcel.description} onChange={handleInputChange} />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSubmit} className="w-full">
                    Confirm Shipment for <span className="font-bold ml-1"> रू100</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
