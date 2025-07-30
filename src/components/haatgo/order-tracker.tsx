
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, Truck, CheckCircle2, CircleDot, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOrders } from "@/context/order-context"
import { useAuth } from "@/context/auth-context"
import { ScrollArea } from "../ui/scroll-area"
import { AnimatePresence, motion } from "framer-motion"

const orderSteps = [
  { name: "Pending", icon: CircleDot },
  { name: "Confirmed", icon: CheckCircle2 },
  { name: "On the Way", icon: Truck },
  { name: "Delivered", icon: Package },
]

function SingleOrderTracker({ order }: { order: import("@/lib/data").Order }) {
    const currentStepIndex = orderSteps.findIndex(step => step.name === order.status);
    const progressPercentage = currentStepIndex >= 0 ? (currentStepIndex / (orderSteps.length -1)) * 100 : 0;

    return (
        <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="font-bold">{order.product}</p>
                    <p className="text-sm text-muted-foreground">{order.id} &bull; {order.date}</p>
                </div>
                 <p className="text-lg font-bold text-primary">रू{order.amount.toFixed(2)}</p>
            </div>
            
             <div className="relative flex justify-between pt-2">
                <div className="absolute left-0 top-[22px] w-full h-1 bg-border -translate-y-1/2" />
                <AnimatePresence>
                <motion.div
                    className="absolute left-0 top-[22px] h-1 bg-primary -translate-y-1/2"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                </AnimatePresence>

                {orderSteps.map((step, index) => {
                    const isActive = index <= currentStepIndex;
                    return (
                        <div key={step.name} className="z-10 flex flex-col items-center w-20 text-center">
                            <div
                                className={cn(
                                    "flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 transition-colors duration-300",
                                    isActive ? "border-primary" : "border-border"
                                )}
                            >
                                <step.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                            </div>
                            <span className={cn("text-xs mt-1 transition-colors", isActive ? "text-foreground font-semibold" : "text-muted-foreground")}>
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
        <CardDescription>Tracking your recent orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
            <div className="space-y-4 pr-4">
                {userOrders.map((order) => (
                    <SingleOrderTracker key={order.id} order={order} />
                ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
