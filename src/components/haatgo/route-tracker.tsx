
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Clock, Truck, Package, Home, X, Flag, FlagTriangleRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDeliveries } from "@/context/delivery-context"
import { useParcels } from "@/context/parcel-context"
import { useRoutes } from "@/context/route-context"
import type { RouteStop } from "@/context/route-context"
import { Button } from "../ui/button"
import { format } from "date-fns"

export function RouteTracker() {
  const { routes } = useRoutes();
  const [mapUrl, setMapUrl] = useState('');
  const [selectedStop, setSelectedStop] = useState<RouteStop | null>(null);
  const { deliveries } = useDeliveries();
  const { parcels } = useParcels();

  // For this component, we'll just display the first route if multiple exist.
  const activeRoute = routes.length > 0 ? routes[0] : null;
  const routeStops = activeRoute ? activeRoute.stops : [];
  const nextStop = routeStops.find(stop => !stop.passed);
  
  useEffect(() => {
    let url = '';
    const allStopsForMap: (RouteStop & { type?: string })[] = routeStops.map(s => ({ ...s, type: 'route' }));

    if (selectedStop) {
      const bbox = [selectedStop.lon - 0.01, selectedStop.lat - 0.01, selectedStop.lon + 0.01, selectedStop.lat + 0.01].join(',');
      const marker = `marker=${selectedStop.lat},${selectedStop.lon},red`;
      url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${marker}`;
    } else {
        deliveries.forEach(d => {
            if (!allStopsForMap.find(s => s.lat === d.lat && s.lon === d.lon)) {
                allStopsForMap.push({ name: d.customerName, lat: d.lat, lon: d.lon, type: 'delivery', passed: false, date: new Date().toISOString().split('T')[0], time: '' });
            }
        });

        const parcelStopNames = new Set(parcels.flatMap(p => [p.fromStop, p.toStop]));
        parcelStopNames.forEach(name => {
            const stop = routeStops.find(s => s.name === name);
            if (stop) {
                const existing = allStopsForMap.find(s => s.name === name);
                if (existing) existing.type = 'parcel';
            }
        });

        if (allStopsForMap.length === 0) {
            setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=80,26,90,31&layer=mapnik`);
            return;
        }

        const lats = allStopsForMap.map(s => s.lat);
        const lons = allStopsForMap.map(s => s.lon);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);
        
        const latPad = (maxLat - minLat) * 0.2 || 0.1;
        const lonPad = (maxLon - minLon) * 0.2 || 0.1;

        const bbox = [minLon - lonPad, minLat - latPad, maxLon + lonPad, maxLat + latPad].join(',');
        
        const markers = allStopsForMap.map(stop => {
            let color = 'blue'; // Default for parcel stops
            if (stop.type === 'delivery') color = 'purple';
            else if (stop.type === 'route') color = stop.passed ? 'green' : 'orange';
            return `marker=${stop.lat},${stop.lon},${color}`;
        }).join('&');
        
        url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markers}`;
    }
    setMapUrl(url);
  }, [routeStops, deliveries, parcels, selectedStop]);

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-xl">Seller's Route Today</CardTitle>
                {activeRoute && <CardDescription>{activeRoute.name}</CardDescription>}
            </div>
            {selectedStop && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedStop(null)} className="flex items-center gap-1">
                    <X className="h-4 w-4" />
                    Clear View
                </Button>
            )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-lg overflow-hidden mb-4">
          {mapUrl && (
            <iframe
              className="w-full h-64 border-0 rounded-lg"
              src={mapUrl}
              title="Route Map"
              key={mapUrl} // Re-render iframe when URL changes
            ></iframe>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-2 left-4 text-white">
             {activeRoute && nextStop ? (
              <>
                <h3 className="font-bold font-headline text-lg flex items-center gap-2"><Truck /> Next Stop: {nextStop.name}</h3>
                <p className="text-sm">Arriving on {format(new Date(nextStop.date), "PPP")} at approx. {nextStop.time}</p>
              </>
            ) : activeRoute ? (
                 <h3 className="font-bold font-headline text-lg flex items-center gap-2"><Truck /> Route Completed!</h3>
            ) : (
                 <h3 className="font-bold font-headline text-lg flex items-center gap-2"><Truck /> No active route.</h3>
            )}
          </div>
        </div>
        
        {activeRoute && (
            <div className="flex justify-between text-sm font-medium mb-4 px-2">
                <div className="flex items-center gap-2">
                    <Flag className="text-primary h-5 w-5" />
                    <span>Start: {activeRoute.startLocation}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <FlagTriangleRight className="text-primary h-5 w-5" />
                    <span>End: {activeRoute.endLocation}</span>
                </div>
            </div>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4 px-2">
            <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-orange-500" /><span>Route Stop</span></div>
            <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-green-500" /><span>Passed Stop</span></div>
            <div className="flex items-center gap-1.5"><Home className="h-3 w-3 text-purple-500" /><span>Delivery</span></div>
            <div className="flex items-center gap-1.5"><Package className="h-3 w-3 text-blue-500" /><span>Parcel Hub</span></div>
        </div>
        <ul className="space-y-3">
          {routeStops.length > 0 ? routeStops.map((stop) => (
            <li key={stop.name} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md cursor-pointer" onClick={() => setSelectedStop(stop)}>
              <MapPin className={cn("h-5 w-5", stop.passed ? 'text-green-500' : 'text-primary')} />
              <span className={cn("flex-grow", stop.passed ? 'line-through text-muted-foreground' : 'font-medium')}>
                {stop.name}
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{format(new Date(stop.date), "MMM d")}, {stop.time}</span>
              </div>
            </li>
          )) : (
            <p className="text-center text-muted-foreground text-sm py-4">No route defined for today.</p>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
