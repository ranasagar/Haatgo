
"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Package,
  ShoppingCart,
  Map,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrders } from "@/context/order-context";
import { useProducts } from "@/context/product-context";
import { useRoutes } from "@/context/route-context";
import { useUsers } from "@/context/user-context";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { orders } = useOrders();
  const { products } = useProducts();
  const { routes } = useRoutes();
  const { users } = useUsers();

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;
  const recentOrders = orders.slice(0, 5);
  const recentSales = orders.filter(o => o.status === 'Delivered').slice(0, 5);
  
  const statusColors: { [key: string]: string } = {
    "Delivered": "bg-green-600 hover:bg-green-700 text-white",
    "On the Way": "bg-blue-500 hover:bg-blue-600 text-white",
    "Confirmed": "bg-yellow-500 hover:bg-yellow-600 text-white",
    "Pending": "bg-gray-400"
  };

  const getUser = (userId: string | null) => {
    if (!userId) return { name: "Guest", email: "N/A" };
    return users.find(u => u.id === userId) || { name: "Unknown User", email: "N/A" };
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              Total products in inventory
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{pendingOrdersCount}</div>
            <p className="text-xs text-muted-foreground">
              Orders requiring confirmation or delivery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{routes.length}</div>
            <p className="text-xs text-muted-foreground">
              Total routes configured
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Customers and admins
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                The 5 most recent orders from your store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/orders">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                   <TableHead className="hidden xl:table-cell">
                    Product
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Date
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{getUser(order.userId).name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {getUser(order.userId).email}
                      </div>
                    </TableCell>
                     <TableCell className="hidden xl:table-cell">
                      {order.productName}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs text-white", statusColors[order.status])} variant="secondary">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell xl:table-column">
                      {order.date}
                    </TableCell>
                    <TableCell className="text-right">रू{order.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Recently fulfilled orders.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            {recentSales.map(sale => {
                const user = getUser(sale.userId);
                return (
                    <div key={sale.id} className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={`https://placehold.co/100x100.png?text=${user.name.charAt(0)}`} alt="Avatar" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                            {user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                            {user.email}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+रू{sale.amount.toFixed(2)}</div>
                    </div>
                )
            })}
             {recentSales.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">No sales completed yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
