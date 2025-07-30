
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const userOrders = [
  { id: "#1005", product: "Warm Fleece Jacket", status: "Delivered", date: "2023-06-27" },
  { id: "#1004", product: "Stainless Steel Pot Set", status: "On the Way", date: "2023-06-26" },
  { id: "#1003", product: "Basmati Rice (25kg)", status: "Confirmed", date: "2023-06-25" },
  { id: "#1002", product: "Solar Powered Lamp", status: "Delivered", date: "2023-06-24" },
  { id: "#1001", product: "Durable Farm Shovel", status: "Delivered", date: "2023-06-23" },
];

const statusColors: { [key: string]: string } = {
    "Delivered": "bg-green-100 text-green-800 border-green-200",
    "On the Way": "bg-blue-100 text-blue-800 border-blue-200",
    "Confirmed": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Pending": "bg-gray-100 text-gray-800 border-gray-200",
}

export function MyOrders() {
  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60">
            <ul className="space-y-4">
                {userOrders.map(order => (
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
      </CardContent>
    </Card>
  )
}
