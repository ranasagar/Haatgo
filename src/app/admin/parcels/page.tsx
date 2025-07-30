
"use client"

import * as React from "react"
import { MoreHorizontal, Send, Truck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useParcels } from "@/context/parcel-context"
import type { Parcel } from "@/lib/data"
import { routeStops } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ParcelsPage() {
    const { parcels, setParcels } = useParcels();
    const [mapUrl, setMapUrl] = React.useState('');

    const generateMapUrl = React.useCallback(() => {
        if (parcels.length === 0) {
            const bbox = [87.0, 26.9, 87.9, 27.1].join(',');
            const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
            setMapUrl(url);
            return
        };

        const stopsInUse = new Set([...parcels.map(p => p.fromStop), ...parcels.map(p => p.toStop)]);
        
        const relevantStops = routeStops.filter(s => stopsInUse.has(s.name));

        if (relevantStops.length === 0) return;

        const lats = relevantStops.map(d => d.lat);
        const lons = relevantStops.map(d => d.lon);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);
        
        const latPad = (maxLat - minLat) * 0.2 || 0.1;
        const lonPad = (maxLon - minLon) * 0.2 || 0.1;

        const bbox = [minLon - lonPad, minLat - latPad, maxLon + lonPad, maxLat + latPad].join(',');
        
        const markers = relevantStops.map(stop => {
            return `marker=${stop.lat},${stop.lon},blue`;
        }).join('&');
        
        const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markers}`;
        
        setMapUrl(url);
    }, [parcels]);

    React.useEffect(() => {
        generateMapUrl();
    }, [generateMapUrl]);

    const handleUpdateStatus = (id: string, status: Parcel['status']) => {
        setParcels(prev => prev.map(p => p.id === id ? {...p, status} : p));
    };

    const statusColors: { [key: string]: string } = {
        "Completed": "bg-green-600 hover:bg-green-700 text-white",
        "On the Way": "bg-blue-500 hover:bg-blue-600 text-white",
        "Ready for Pickup": "bg-yellow-500 hover:bg-yellow-600 text-white",
        "Pending": "bg-gray-400"
    };

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Truck /> Parcel Route Overview</CardTitle>
                <CardDescription>
                    A map showing all pickup and drop-off locations for user parcels.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative rounded-lg overflow-hidden h-96">
                {mapUrl && (
                    <iframe
                    className="w-full h-full border-0 rounded-lg"
                    src={mapUrl}
                    title="Parcels Map"
                    key={mapUrl}
                    ></iframe>
                )}
                </div>
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Parcels</CardTitle>
          <CardDescription>
            View and update the status of all user-to-user parcels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parcel ID</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="hidden md:table-cell">Sender</TableHead>
                <TableHead className="hidden md:table-cell">Receiver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parcels.map((parcel) => (
                <TableRow key={parcel.id}>
                  <TableCell className="font-medium">{parcel.id}</TableCell>
                  <TableCell>{parcel.fromStop}</TableCell>
                  <TableCell>{parcel.toStop}</TableCell>
                  <TableCell className="hidden md:table-cell">{parcel.senderName}</TableCell>
                   <TableCell className="hidden md:table-cell">{parcel.receiverName}</TableCell>
                  <TableCell>
                    <Badge variant='secondary' className={cn("text-white", statusColors[parcel.status])}>
                      {parcel.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(parcel.id, 'Pending')}>Pending</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(parcel.id, 'On the Way')}>On the Way</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(parcel.id, 'Ready for Pickup')}>Ready for Pickup</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(parcel.id, 'Completed')}>Completed</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
