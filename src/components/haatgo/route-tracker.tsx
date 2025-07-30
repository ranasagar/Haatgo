
"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Truck, Package, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { routeStops as initialRouteStops } from "@/lib/data"
import { useDeliveries } from "@/context/delivery-context"
import { useParcels } from "@/context/parcel-context"

const routeStopsWithTime = initialRouteStops.map((stop, index) => ({
    ...stop,
    eta: `${9 + index * 2}:${index === 1 ? '30' : '00'} ${index < 2 ? "AM" : "PM"}` ,
    passed: index < 1,
}));


export function RouteTracker() {
  const [routeStops, setRouteStops] = useState(routeStopsWithTime);
  const [mapUrl, setMapUrl] = useState('');
  const { deliveries } = useDeliveries();
  const { parcels } = useParcels();

  const nextStop = routeStops.find(stop => !stop.passed);
  
  const generateMapUrl = useMemo(() => {
    const allStops = [...routeStops];

    deliveries.forEach(d => {
        if (!allStops.find(s => s.lat === d.lat && s.lon === d.lon)) {
            allStops.push({ name: d.customerName, lat: d.lat, lon: d.lon, type: 'delivery', passed: false, eta: '' });
        }
    });

    const parcelStopNames = new Set(parcels.flatMap(p => [p.fromStop, p.toStop]));
    parcelStopNames.forEach(name => {
        const stop = initialRouteStops.find(s => s.name === name);
        if (stop && !allStops.find(s => s.name === name)) {
            allStops.push({ ...stop, type: 'parcel', passed: false, eta: '' });
        } else if (stop) {
            const existing = allStops.find(s => s.name === name);
            if (existing && !existing.type) (existing as any).type = 'parcel';
        }
    });


    const lats = allStops.map(s => s.lat);
    const lons = allStops.map(s => s.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    
    const latPad = (maxLat - minLat) * 0.2 || 0.1;
    const lonPad = (maxLon - minLon) * 0.2 || 0.1;

    const bbox = [minLon - lonPad, minLat - latPad, maxLon + lonPad, maxLat + latPad].join(',');
    
    const markers = allStops.map(stop => {
        let color = 'blue'; // Default for parcel/route stops
        if ((stop as any).type === 'delivery') {
            color = 'purple';
        } else if ((stop as any).passed) {
            color = 'green';
        } else if (!(stop as any).type) {
            color = 'orange';
        }
        return `marker=${stop.lat},${stop.lon},${color}`;
    }).join('&');
    
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markers}`;
    
    setMapUrl(url);

  }, [routeStops, deliveries, parcels]);

  useEffect(() => {
    generateMapUrl;
  }, [generateMapUrl]);

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Seller's Route Today</CardTitle>
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
             {nextStop ? (
              <>
                <h3 className="font-bold font-headline text-lg flex items-center gap-2"><Truck /> Next Stop: {nextStop.name}</h3>
                <p className="text-sm">Arriving at approx. {nextStop.eta}</p>
              </>
            ) : (
                 <h3 className="font-bold font-headline text-lg flex items-center gap-2"><Truck /> Route Completed!</h3>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4 px-2">
            <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-orange-500" /><span>Route Stop</span></div>
            <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-green-500" /><span>Passed Stop</span></div>
            <div className="flex items-center gap-1.5"><Home className="h-3 w-3 text-purple-500" /><span>Delivery</span></div>
            <div className="flex items-center gap-1.5"><Package className="h-3 w-3 text-blue-500" /><span>Parcel Hub</span></div>
        </div>
        <ul className="space-y-3">
          {routeStops.map((stop) => (
            <li key={stop.name} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md">
              <MapPin className={cn("h-5 w-5", stop.passed ? 'text-green-500' : 'text-primary')} />
              <span className={cn("flex-grow", stop.passed ? 'line-through text-muted-foreground' : 'font-medium')}>
                {stop.name}
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{stop.eta}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
