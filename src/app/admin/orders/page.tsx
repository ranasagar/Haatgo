
"use client";
import * as React from "react";
import { File, ListFilter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrders } from "@/context/order-context";
import type { Order } from "@/lib/data";
import { useUsers } from "@/context/user-context";
import { useDeliveries } from "@/context/delivery-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { users } = useUsers();
  const { deliveries, setDeliveries } = useDeliveries();
  const { toast } = useToast();

  const getUserName = (userId: string | null) => {
    if (!userId) return "Guest";
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };
  
  const handleUpdateStatus = (order: Order, status: Order['status']) => {
    updateOrderStatus(order.id, status);
    
    if (status === 'On the Way') {
      // Check if a delivery already exists for this order
      const deliveryExists = deliveries.some(d => d.orderId === order.id);
      
      if (!deliveryExists) {
        const user = users.find(u => u.id === order.userId);
        if (user) {
          const newDelivery = {
            id: `del-${Date.now()}`,
            orderId: order.id,
            customerName: user.name,
            address: "Default Address", // This could be fetched from user profile in a real app
            lat: 27.7172, // Default lat/lon for demo
            lon: 85.3240,
            status: 'Out for Delivery' as const,
            driver: "Ram Kumar"
          };
          setDeliveries(prev => [...prev, newDelivery]);
          toast({
            title: "Delivery Created",
            description: `Delivery for order ${order.id} has been dispatched.`
          });
        }
      } else {
         toast({
            title: "Order Status Updated",
            description: `Order ${order.id} is now ${status}.`
          });
      }
    } else {
        toast({
            title: "Order Status Updated",
            description: `Order ${order.id} is now ${status}.`
        });
    }
  };

  const statusColors: { [key: string]: string } = {
    "Delivered": "bg-green-600 hover:bg-green-700 text-white",
    "On the Way": "bg-blue-500 hover:bg-blue-600 text-white",
    "Confirmed": "bg-yellow-500 hover:bg-yellow-600 text-white",
    "Pending": "bg-gray-400"
  };

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="on-the-way">On the Way</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Manage your orders and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-1/5 sm:table-cell">
                    Order ID
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="hidden sm:table-cell font-medium">
                      {order.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {getUserName(order.userId)}
                    </TableCell>
                    <TableCell>
                      {order.productName} (x{order.quantity})
                    </TableCell>
                    <TableCell>
                       <Badge variant='secondary' className={cn("text-white", statusColors[order.status])}>
                          {order.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.date}
                    </TableCell>
                    <TableCell className="text-right">रू{order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order, 'Pending')}>Pending</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order, 'Confirmed')}>Confirmed</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order, 'On the Way')}>On the Way</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order, 'Delivered')}>Delivered</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{orders.length}</strong> of <strong>{orders.length}</strong> orders
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
