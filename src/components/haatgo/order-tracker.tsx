"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle2, CircleDot } from "lucide-react"
import { cn } from "@/lib/utils"

const orderSteps = [
  { name: "Pending", icon: CircleDot },
  { name: "Confirmed", icon: CheckCircle2 },
  { name: "On the Way", icon: Truck },
  { name: "Delivered", icon: Package },
]

export function OrderTracker() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % orderSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Your Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col gap-4">
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2" />
          {orderSteps.map((step, index) => {
            const isActive = index <= currentStep
            return (
              <div key={step.name} className="flex items-center gap-4 relative">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full bg-background border-2",
                    isActive ? "border-primary" : "border-border"
                  )}
                >
                  <step.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>
                <span className={cn("font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
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
