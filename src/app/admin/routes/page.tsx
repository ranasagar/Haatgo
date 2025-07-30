
"use client";
import * as React from "react";
import { File, ListFilter, MoreHorizontal, PlusCircle, CheckCircle, MapPin } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Stop = {
    name: string;
    passed: boolean;
};

type Route = {
    id: string;
    name: string;
    stops: Stop[];
    date: string;
};

const initialRoutes: Route[] = [
    {
        id: "1",
        name: "Chisapani - Sankhejung",
        stops: [
            { name: "Chisapani Market", passed: false },
            { name: "Bhedetar Junction", passed: false },
            { name: "Sankhejung Village", passed: false },
        ],
        date: "2024-07-25",
    },
];


export default function RoutesPage() {
    const [open, setOpen] = React.useState(false);
    const [routes, setRoutes] = React.useState<Route[]>(initialRoutes);
    const [selectedRoute, setSelectedRoute] = React.useState<Route | null>(null);

    const handleToggleStop = (stopName: string) => {
        if (selectedRoute) {
            const updatedStops = selectedRoute.stops.map(stop =>
                stop.name === stopName ? { ...stop, passed: !stop.passed } : stop
            );
            const updatedRoute = { ...selectedRoute, stops: updatedStops };
            setSelectedRoute(updatedRoute);
            setRoutes(prevRoutes => prevRoutes.map(r => r.id === updatedRoute.id ? updatedRoute : r));
        }
    };

    const openManageDialog = (route: Route) => {
        setSelectedRoute(route);
    }
    
    const closeManageDialog = () => {
        setSelectedRoute(null);
    }

  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed" className="hidden sm:flex">
              Completed
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Today
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>This Week</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>This Month</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Route
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Route</DialogTitle>
                  <DialogDescription>
                    Create a new seller route. Add stops one by one.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="routeName" className="text-right">
                      Route Name
                    </Label>
                    <Input id="routeName" defaultValue="East Nepal Route" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stop" className="text-right">
                      Stop 1
                    </Label>
                    <Input id="stop" defaultValue="Chisapani Market" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                   <Button type="button" variant="outline">Add Another Stop</Button>
                  <Button type="submit" onClick={() => setOpen(false)}>Save Route</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Seller Routes</CardTitle>
              <CardDescription>
                Manage seller routes and their stops.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map(route => (
                    <TableRow key={route.id}>
                        <TableCell className="font-medium">
                        {route.name}
                        </TableCell>
                        <TableCell>
                        {route.stops.map(s => s.name).join(', ')}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {route.date}
                        </TableCell>
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
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openManageDialog(route)}>Manage Route</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
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
                Showing <strong>1-1</strong> of <strong>3</strong> routes
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
       <Dialog open={!!selectedRoute} onOpenChange={(isOpen) => !isOpen && closeManageDialog()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Manage Route: {selectedRoute?.name}</DialogTitle>
                    <DialogDescription>
                        Click on a stop to mark it as passed. This will update the customer view.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <ul className="space-y-3">
                        {selectedRoute?.stops.map((stop) => (
                            <li key={stop.name}>
                                <Button
                                    variant="outline"
                                    className={cn("w-full justify-start", stop.passed && "line-through text-muted-foreground")}
                                    onClick={() => handleToggleStop(stop.name)}
                                >
                                    {stop.passed ? (
                                        <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                                    ) : (
                                        <MapPin className="h-5 w-5 mr-3 text-primary" />
                                    )}
                                    {stop.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <DialogFooter>
                    <Button onClick={closeManageDialog}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
