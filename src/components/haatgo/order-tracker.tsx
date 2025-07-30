
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, Truck, CheckCircle2, CircleDot, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOrders } from "@/context/order-context"
import { AnimatePresence, motion } from "framer-motion"

const orderSteps = [
  { name: "Pending", icon: CircleDot },
  { name: "Confirmed", icon: CheckCircle2 },
  { name: "On the Way", icon: Truck },
  { name: "Delivered", icon: Package },
]

export function OrderTracker() {
  const { orders } = useOrders()
  const latestOrder = orders.length > 0 ? orders[0] : null;
  const currentStepIndex = latestOrder ? orderSteps.findIndex(step => step.name === latestOrder.status) : -1;

  if (!latestOrder) {
    return (
        <Card className="shadow-lg rounded-xl overflow-hidden">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Your Order Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center text-center text-muted-foreground h-40 flex-col gap-2">
                    <Info className="h-8 w-8" />
                    <p className="font-semibold">No Active Order</p>
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
        <CardDescription>Tracking order: <strong>{latestOrder.id} - {latestOrder.product}</strong></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col gap-4">
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2" />
           <AnimatePresence>
              <motion.div
                className="absolute left-4 top-0 w-0.5 bg-primary -translate-x-1/2"
                initial={{ height: 0 }}
                animate={{ height: `${(currentStepIndex / (orderSteps.length -1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
          {orderSteps.map((step, index) => {
            const isActive = index <= currentStepIndex
            return (
              <div key={step.name} className="flex items-center gap-4 relative">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 transition-colors duration-300",
                    isActive ? "border-primary" : "border-border"
                  )}
                >
                  <step.icon
                    className={cn(
                      "h-5 w-5 transition-colors duration-300",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>
                <span className={cn("font-medium transition-colors duration-300", isActive ? "text-foreground" : "text-muted-foreground")}>
                  {step.name}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
