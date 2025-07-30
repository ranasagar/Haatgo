
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useDeliveries } from "@/context/delivery-context"
import { useParcels } from "@/context/parcel-context"
import { useAuth } from "@/context/auth-context"
import { Package, Send, ShoppingBag } from "lucide-react"

const statusColors: { [key: string]: string } = {
    "Completed": "bg-green-100 text-green-800 border-green-200",
    "Out for Delivery": "bg-blue-100 text-blue-800 border-blue-200",
    "On the Way": "bg-blue-100 text-blue-800 border-blue-200",
    "Ready for Pickup": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Pending": "bg-gray-100 text-gray-800 border-gray-200",
}

export function MyOrders() {
  const { deliveries } = useDeliveries();
  const { parcels } = useParcels();
  const { user, isAdmin } = useAuth();

  const userDeliveries = isAdmin 
    ? deliveries 
    : user ? deliveries.filter(d => d.customerName === user.displayName) : [];

  const userParcels = isAdmin
    ? parcels
    : user ? parcels.filter(p => p.senderName === user.displayName || p.receiverName === user.displayName) : [];


  const allTasks = [
    ...userDeliveries.map(d => ({
        id: d.id,
        type: 'Delivery' as const,
        description: `Order for ${d.customerName}`,
        destination: d.address,
        status: d.status,
    })),
    ...userParcels.map(p => ({
        id: p.id,
        type: 'Parcel' as const,
        description: `From ${p.senderName} to ${p.receiverName}`,
        destination: p.toStop,
        status: p.status
    }))
  ].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Route Manifest</CardTitle>
      </CardHeader>
      <CardContent>
        {allTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mb-4" />
            <p className="font-semibold">{isAdmin ? "No tasks for today" : "You have no active deliveries or parcels"}</p>
            <p className="text-sm">{isAdmin ? "The seller's tasks will appear here." : "Your items will appear here once they are on the route."}</p>
          </div>
        ) : (
            <ScrollArea className="h-60">
                <ul className="space-y-4">
                    {allTasks.map(task => (
                        <li key={task.id} className="flex items-center gap-3">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                {task.type === 'Delivery' ? <Package className="h-4 w-4 text-primary" /> : <Send className="h-4 w-4 text-primary" />}
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold">{task.description}</p>
                                <p className="text-sm text-muted-foreground">{task.destination}</p>
                            </div>
                            <Badge variant="outline" className={cn("text-xs font-bold", statusColors[task.status])}>
                                {task.status}
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
