
"use client"

import * as React from "react"
import { MoreHorizontal, Truck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeliveries } from "@/context/delivery-context"
import type { Delivery } from "@/lib/data"
import { cn } from "@/lib/utils"
import { sendOrderNotification } from "@/ai/flows/notification-flow"
import { useToast } from "@/hooks/use-toast"
import { useUserProfile } from "@/context/user-profile-context"
import { useOrders } from "@/context/order-context"


export default function DeliveriesPage() {
    const { deliveries, setDeliveries } = useDeliveries();
    const { profile } = useUserProfile();
    const { orders, updateOrderStatus } = useOrders();
    const [mapUrl, setMapUrl] = React.useState('');
    const { toast } = useToast();

    const generateMapUrl = React.useCallback(() => {
        if (deliveries.length === 0) return;

        const lats = deliveries.map(d => d.lat);
        const lons = deliveries.map(d => d.lon);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);
        
        const latPad = (maxLat - minLat) * 0.2 || 0.1;
        const lonPad = (maxLon - minLon) * 0.2 || 0.1;

        const bbox = [minLon - lonPad, minLat - latPad, maxLon + lonPad, maxLat + latPad].join(',');
        
        const markers = deliveries.map(delivery => {
            const color = delivery.status === 'Completed' ? 'green' : (delivery.status === 'Out for Delivery' ? 'blue' : 'orange');
            return `marker=${delivery.lat},${delivery.lon},${color}`;
        }).join('&');
        
        const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markers}`;
        
        setMapUrl(url);
    }, [deliveries]);

    React.useEffect(() => {
        generateMapUrl();
    }, [generateMapUrl]);

    const handleUpdateStatus = async (delivery: Delivery, status: Delivery['status']) => {
        setDeliveries(prev => prev.map(d => d.id === delivery.id ? {...d, status} : d));
        
        let orderStatus: "Pending" | "Confirmed" | "On the Way" | "Delivered" = "On the Way";
        if (status === 'Completed') {
            orderStatus = 'Delivered';
        } else if (status === 'Pending') {
            orderStatus = 'Confirmed'; // A delivery can be pending while order is confirmed
        }

        updateOrderStatus(delivery.orderId, orderStatus);

        // Don't send notification if user has no whatsapp number configured
        if (!profile.whatsapp) {
          console.log(`User ${delivery.customerName} has no WhatsApp number configured. Skipping notification.`);
          return;
        }

        try {
            const result = await sendOrderNotification({
                customerName: delivery.customerName,
                contact: profile.whatsapp,
                orderId: delivery.orderId,
                productName: "Your recent order", // Simplified for now
                newStatus: status,
            });
            if (result.success) {
                toast({
                    title: "Notification Sent!",
                    description: `User ${delivery.customerName} has been notified about their order status.`,
                });
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Failed to send notification:", error);
            toast({
                title: "Notification Failed",
                description: "Could not send status update notification to the user.",
                variant: "destructive",
            });
        }
    };


  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Truck /> Delivery Overview</CardTitle>
                <CardDescription>
                    A map showing all delivery locations. Orange is pending, Blue is out for delivery, Green is completed.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative rounded-lg overflow-hidden h-96">
                {mapUrl && deliveries.length > 0 ? (
                    <iframe
                    className="w-full h-full border-0 rounded-lg"
                    src={mapUrl}
                    title="Deliveries Map"
                    key={mapUrl}
                    ></iframe>
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">No active deliveries to display on the map.</p>
                  </div>
                )}
                </div>
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Deliveries</CardTitle>
          <CardDescription>
            View and update the status of all deliveries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.length > 0 ? deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.orderId}</TableCell>
                  <TableCell>{delivery.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">{delivery.address}</TableCell>
                   <TableCell className="hidden md:table-cell">{delivery.driver}</TableCell>
                  <TableCell>
                    <Badge variant={
                        delivery.status === 'Completed' ? 'default' : delivery.status === 'Out for Delivery' ? 'secondary' : 'outline'
                    } className={cn({
                        "bg-green-600 hover:bg-green-700 text-white": delivery.status === 'Completed',
                        "bg-blue-500 hover:bg-blue-600 text-white": delivery.status === 'Out for Delivery',
                    })}>
                      {delivery.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(delivery, 'Pending')}>Pending</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(delivery, 'Out for Delivery')}>Out for Delivery</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(delivery, 'Completed')}>Completed</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">No deliveries found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
