
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useOrders } from "@/context/order-context"
import { ShoppingBag } from "lucide-react"

const statusColors: { [key: string]: string } = {
    "Delivered": "bg-green-100 text-green-800 border-green-200",
    "On the Way": "bg-blue-100 text-blue-800 border-blue-200",
    "Confirmed": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Pending": "bg-gray-100 text-gray-800 border-gray-200",
}

export function MyOrders() {
  const { orders } = useOrders();

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mb-4" />
            <p className="font-semibold">No orders yet</p>
            <p className="text-sm">Your past orders will appear here.</p>
          </div>
        ) : (
            <ScrollArea className="h-60">
                <ul className="space-y-4">
                    {orders.map(order => (
                        <li key={order.id} className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">{order.product}</p>
                                <p className="text-sm text-muted-foreground">{order.id} - {order.date}</p>
                            </div>
                            <Badge variant="outline" className={cn("text-xs font-bold", statusColors[order.status])}>
                                {order.status}
                            </Badge>
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
