
"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, Truck, CheckCircle2, CircleDot, Info, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOrders } from "@/context/order-context"
import { useAuth } from "@/context/auth-context"
import { ScrollArea } from "../ui/scroll-area"
import { AnimatePresence, motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Order } from "@/lib/data"

const orderSteps = [
  { name: "Pending", icon: CircleDot },
  { name: "Confirmed", icon: CheckCircle2 },
  { name: "On the Way", icon: Truck },
  { name: "Delivered", icon: Package },
]

const statusHierarchy = orderSteps.map(s => s.name);

type ConsolidatedShipment = {
    district: string;
    productDetails: string;
    totalAmount: number;
    earliestDate: string;
    status: Order['status'];
    orderIds: string;
}

function ShipmentTracker({ shipment }: { shipment: ConsolidatedShipment }) {
    const currentStepIndex = statusHierarchy.indexOf(shipment.status);
    const progressPercentage = currentStepIndex >= 0 ? (currentStepIndex / (orderSteps.length -1)) * 100 : 0;

    return (
        <div className="p-4 border rounded-lg bg-background">
            <div className="flex justify-between items-start mb-3 gap-2">
                <div className="flex-grow">
                    <p className="font-bold">{shipment.productDetails}</p>
                    <p className="text-sm text-muted-foreground">Shipment from {shipment.district}</p>
                     <p className="text-xs text-muted-foreground">Order Date: {shipment.earliestDate}</p>
                </div>
                 <p className="text-lg font-bold text-primary whitespace-nowrap">रू{shipment.totalAmount.toFixed(2)}</p>
            </div>
            
             <div className="relative flex justify-between pt-2">
                <div className="absolute left-0 top-5 w-full h-1 bg-border -translate-y-1/2" />
                <AnimatePresence>
                <motion.div
                    className="absolute left-0 top-5 h-1 bg-primary -translate-y-1/2"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                </AnimatePresence>

                {orderSteps.map((step, index) => {
                    const isActive = index <= currentStepIndex;
                    return (
                        <div key={step.name} className="z-10 flex flex-col items-center text-center px-1">
                            <div
                                className={cn(
                                    "flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 transition-colors duration-300",
                                    isActive ? "border-primary" : "border-border"
                                )}
                            >
                                <step.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                            </div>
                            <span className={cn(
                                "text-xs mt-1 transition-colors sm:block hidden", 
                                isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                            )}>
                                {step.name}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export function OrderTracker() {
  const { orders } = useOrders()
  const { user } = useAuth()

  const userOrders = user ? orders.filter(o => o.userId === user.uid) : [];

  const consolidatedShipments = useMemo(() => {
    const groupedByDistrict = userOrders.reduce((acc, order) => {
        if (!acc[order.district]) {
            acc[order.district] = [];
        }
        acc[order.district].push(order);
        return acc;
    }, {} as Record<string, Order[]>);

    return Object.values(groupedByDistrict).map(districtOrders => {
        const earliestOrder = districtOrders.reduce((earliest, current) => new Date(current.date) < new Date(earliest.date) ? current : earliest);
        
        const overallStatusIndex = Math.min(
            ...districtOrders.map(o => statusHierarchy.indexOf(o.status))
        );

        const shipment: ConsolidatedShipment = {
            district: earliestOrder.district,
            productDetails: districtOrders.map(o => `${o.productName} (x${o.quantity})`).join(', '),
            totalAmount: districtOrders.reduce((sum, o) => sum + o.amount, 0),
            earliestDate: earliestOrder.date,
            status: statusHierarchy[overallStatusIndex],
            orderIds: districtOrders.map(o => o.id).join(', '),
        };
        return shipment;
    });
  }, [userOrders]);


  if (!user || userOrders.length === 0) {
    return (
        <Card className="shadow-lg rounded-xl overflow-hidden">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Your Order Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center text-center text-muted-foreground h-40 flex-col gap-2">
                    <Info className="h-8 w-8" />
                    <p className="font-semibold">No Active Orders</p>
                    <p className="text-sm">Place an order to track its status here.</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Your Order Status</CardTitle>
        <CardDescription>Tracking your shipments by district.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
            <div className="space-y-4 pr-4">
              {consolidatedShipments.length > 0 ? (
                  consolidatedShipments.map(shipment => (
                      <ShipmentTracker key={shipment.district} shipment={shipment} />
                  ))
              ) : (
                  <div className="flex items-center justify-center text-center text-muted-foreground h-40 flex-col gap-2">
                    <Info className="h-8 w-8" />
                    <p className="font-semibold">No Active Orders</p>
                  </div>
              )}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
