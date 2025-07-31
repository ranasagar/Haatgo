
"use client";
import * as React from "react";
import { format } from "date-fns"
import { File, ListFilter, MoreHorizontal, PlusCircle, CheckCircle, MapPin, Loader2, Sun, Cloud, Cloudy, CloudSun, CloudRain, CloudSnow, CloudLightning, Wind, Calendar as CalendarIcon, Repeat, ArrowRight } from "lucide-react";

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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRoutes } from "@/context/route-context";
import type { Route, RouteStop } from "@/context/route-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchForecast, type ForecastOutput } from "@/ai/flows/forecast-flow";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const defaultNewRoute: Partial<Route> & { stops: ({ name: string, date: Date | undefined, time: string })[] } = {
    name: '',
    isRoundTrip: false,
    stops: [
        { name: '', date: new Date(), time: '09:00 AM' },
        { name: '', date: new Date(), time: '02:00 PM' }
    ],
};

const weatherIcons: { [key: string]: React.ReactNode } = {
    Sun: <Sun className="h-5 w-5 text-yellow-500" />,
    Cloud: <Cloud className="h-5 w-5 text-gray-400" />,
    Cloudy: <Cloudy className="h-5 w-5 text-gray-500" />,
    CloudSun: <CloudSun className="h-5 w-5 text-yellow-500" />,
    CloudRain: <CloudRain className="h-5 w-5 text-blue-400" />,
    CloudSnow: <CloudSnow className="h-5 w-5 text-blue-200" />,
    CloudLightning: <CloudLightning className="h-5 w-5 text-yellow-400" />,
    Wind: <Wind className="h-5 w-5 text-gray-400" />,
};


function ForecastDisplay({ forecast, stopName }: { forecast: ForecastOutput; stopName: string }) {
    return (
        <Card className="my-4 bg-muted/50">
            <CardHeader className="p-4">
                <CardTitle className="text-base">7-Day Forecast for {stopName}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <ul className="space-y-3">
                    {forecast.forecast.map((day, index) => (
                        <li key={index} className="flex items-center justify-between gap-2 text-sm">
                             <div className="w-20">
                                <p className="font-semibold">{day.day}</p>
                                <p className="text-xs text-muted-foreground">{day.date}</p>
                            </div>
                            <span className="flex-grow text-center text-muted-foreground">{day.condition}</span>
                            {weatherIcons[day.icon] || <Sun className="h-5 w-5 text-yellow-500" />}
                            <span className="font-bold w-12 text-right">{day.temp}°C</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default function RoutesPage() {
    const [open, setOpen] = React.useState(false);
    const { routes, updateRoute, addRoute } = useRoutes();
    const { toast } = useToast();
    const [selectedRoute, setSelectedRoute] = React.useState<Route | null>(null);
    const [newRoute, setNewRoute] = React.useState(defaultNewRoute);
    const [weatherData, setWeatherData] = React.useState<ForecastOutput | null>(null);
    const [loadingWeatherFor, setLoadingWeatherFor] = React.useState<string | null>(null);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);


    const handleToggleStop = (stopName: string, stopIndex: number) => {
        if (selectedRoute) {
            const updatedStops = selectedRoute.stops.map((stop, index) =>
                stop.name === stopName && index === stopIndex ? { ...stop, passed: !stop.passed } : stop
            );
            const updatedRoute = { ...selectedRoute, stops: updatedStops };
            setSelectedRoute(updatedRoute);
            updateRoute(updatedRoute);
        }
    };

    const openManageDialog = (route: Route) => {
        setSelectedRoute(route);
    }
    
    const closeManageDialog = () => {
        setSelectedRoute(null);
        setWeatherData(null);
    }
    
    const handleCheckWeather = async (stopName: string) => {
        if (!stopName) {
            toast({ title: "Please enter a location name first.", variant: "destructive"});
            return;
        }
        setLoadingWeatherFor(stopName);
        setWeatherData(null);
        try {
            const forecast = await fetchForecast({ location: stopName });
            setWeatherData(forecast);
        } catch (error) {
            console.error("Failed to fetch weather forecast:", error);
            toast({
                title: "Error",
                description: "Could not fetch weather forecast for this location.",
                variant: "destructive",
            });
        } finally {
            setLoadingWeatherFor(null);
        }
    }


    const handleAddStop = () => {
        setNewRoute(prev => ({
            ...prev,
            stops: [...(prev.stops || []), { name: '', date: new Date(), time: '09:00 AM' }]
        }));
    };
    
    const handleStopChange = (index: number, field: 'name' | 'time', value: string) => {
        const updatedStops = [...(newRoute.stops || [])];
        updatedStops[index] = { ...updatedStops[index], [field]: value };
        setNewRoute(prev => ({ ...prev, stops: updatedStops }));
    };

    const handleDateChange = (index: number, date: Date | undefined) => {
        const updatedStops = [...(newRoute.stops || [])];
        updatedStops[index] = { ...updatedStops[index], date };
        setNewRoute(prev => ({ ...prev, stops: updatedStops }));
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewRoute(prev => ({...prev, [id]: value}));
    }

    const handleSaveRoute = () => {
        let routeStops = (newRoute.stops || [])
            .filter(s => s.name.trim() !== '' && s.time.trim() !== '' && s.date)
            .map(s => ({ 
                name: s.name,
                date: format(s.date!, "yyyy-MM-dd"),
                time: s.time,
                passed: false 
            }));

        if (newRoute.isRoundTrip && routeStops.length > 1) {
            const returnStops = [...routeStops].slice(0, -1).reverse();
            routeStops = [...routeStops, ...returnStops];
        }

        if (newRoute.name && routeStops.length >= 2) {
            const routeToAdd: Omit<Route, 'id'> = {
                name: newRoute.name,
                isRoundTrip: !!newRoute.isRoundTrip,
                startLocation: routeStops[0].name,
                endLocation: newRoute.isRoundTrip ? routeStops[0].name : routeStops[routeStops.length - 1].name,
                stops: routeStops.map(s => ({...s, lat: 27.7172, lon: 85.3240 })), // Dummy coords
                date: new Date().toISOString().split('T')[0],
            };
            addRoute(routeToAdd);
            setNewRoute(defaultNewRoute);
            setOpen(false);
        } else {
            toast({
                title: "Incomplete Information",
                description: "Please fill out route name and at least two stops (a start and an end) with valid details.",
                variant: "destructive"
            });
        }
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
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" onClick={() => setNewRoute(defaultNewRoute)}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Route
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Route</DialogTitle>
                  <DialogDescription>
                    Create a new seller route. Add stops and check their weather forecast.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Route Name
                    </Label>
                    <Input id="name" value={newRoute.name} onChange={handleInputChange} placeholder="e.g. East Nepal Circuit" className="col-span-3" />
                  </div>
                  <div className="items-top flex space-x-2 justify-end col-span-4">
                      <Checkbox 
                        id="isRoundTrip" 
                        checked={newRoute.isRoundTrip}
                        onCheckedChange={(checked) => setNewRoute(prev => ({...prev, isRoundTrip: !!checked}))}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="isRoundTrip"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Round Trip
                        </label>
                        <p className="text-sm text-muted-foreground">
                          The route will automatically create a return journey.
                        </p>
                      </div>
                  </div>
                  {newRoute.stops?.map((stop, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 p-3 border rounded-lg bg-muted/50">
                      <Label>{index === 0 ? "Start Location" : (index === newRoute.stops.length - 1 && !newRoute.isRoundTrip ? "End Location" : `Stop ${index + 1}`)}</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-2">
                          <Input value={stop.name} onChange={(e) => handleStopChange(index, 'name', e.target.value)} placeholder="e.g. Kathmandu" className="md:col-span-2" />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !stop.date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {stop.date ? format(stop.date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={stop.date}
                                onSelect={(date) => handleDateChange(index, date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                           <div className="flex gap-2">
                               <Input value={stop.time} onChange={(e) => handleStopChange(index, 'time', e.target.value)} placeholder="9:00 AM" className="w-full" />
                               <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  onClick={() => handleCheckWeather(stop.name)}
                                  disabled={loadingWeatherFor === stop.name}
                                  className="w-10"
                              >
                                    {loadingWeatherFor === stop.name ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Cloudy className="h-4 w-4" />
                                    )}
                              </Button>
                           </div>
                      </div>
                      {loadingWeatherFor === stop.name && (
                          <div className="text-center py-4">
                              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                              <p className="text-sm text-muted-foreground mt-2">Fetching forecast...</p>
                          </div>
                      )}
                       {weatherData && !loadingWeatherFor && (
                          <ForecastDisplay forecast={weatherData} stopName={stop.name} />
                      )}
                    </div>
                  ))}
                </div>
                <DialogFooter>
                   <Button type="button" variant="outline" onClick={handleAddStop}>Add Another Stop</Button>
                  <Button type="submit" onClick={handleSaveRoute}>Save Route</Button>
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
                    <TableHead>Route</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date Created
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isClient && routes.map(route => (
                    <TableRow key={route.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                              {route.name}
                              {route.isRoundTrip && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Repeat className="h-3 w-3" />
                                  Round Trip
                                </Badge>
                              )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {route.startLocation}
                        </TableCell>
                         <TableCell>
                          {route.endLocation}
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
                {isClient && (
                  <>Showing <strong>1-{routes.length}</strong> of <strong>{routes.length}</strong> routes</>
                )}
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
                        Mark stops as passed or check the 7-day weather forecast.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <ul className="space-y-3">
                        {selectedRoute?.stops.map((stop, index) => (
                           <li key={`${stop.name}-${index}`}>
                                <div className="flex items-center gap-2">
                                     <Button
                                        variant="outline"
                                        className={cn("w-full justify-start", stop.passed && "line-through text-muted-foreground")}
                                        onClick={() => handleToggleStop(stop.name, index)}
                                    >
                                        {stop.passed ? (
                                            <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                                        ) : (
                                            <MapPin className="h-5 w-5 mr-3 text-primary" />
                                        )}
                                        {stop.name}
                                         <span className="ml-auto text-xs text-muted-foreground">{format(new Date(stop.date), "MMM d")}, {stop.time}</span>
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => handleCheckWeather(stop.name)}
                                        disabled={loadingWeatherFor === stop.name}
                                    >
                                         {loadingWeatherFor === stop.name ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                         ) : (
                                            <Cloudy className="h-4 w-4" />
                                         )}
                                    </Button>
                                </div>
                                {loadingWeatherFor === stop.name && stop.name && (
                                    <div className="text-center py-4">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                        <p className="text-sm text-muted-foreground mt-2">Fetching forecast...</p>
                                    </div>
                                )}
                                {weatherData && loadingWeatherFor === null && (
                                    <ForecastDisplay forecast={weatherData} stopName={stop.name} />
                                )}
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
