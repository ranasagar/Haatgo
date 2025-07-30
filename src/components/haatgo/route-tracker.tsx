
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

const initialRouteStops = [
  { name: "Chisapani Market", eta: "9:00 AM", passed: false },
  { name: "Bhedetar Junction", eta: "11:30 AM", passed: false },
  { name: "Sankhejung Village", eta: "2:00 PM", passed: false },
]

export function RouteTracker() {
  const [routeStops, setRouteStops] = useState(initialRouteStops);
  // NOTE: In a real app, you would fetch the route status from your backend.
  // For now, we simulate the state locally. In a real-world scenario, you might use
  // something like Firebase Realtime Database or Firestore to listen for changes
  // pushed by the admin and update the state here.

  const nextStop = routeStops.find(stop => !stop.passed);

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Seller's Route Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-lg overflow-hidden mb-4">
          <Image
            src="https://placehold.co/600x400"
            alt="Map of route"
            width={600}
            height={400}
            className="w-full h-auto"
            data-ai-hint="nepal landscape map"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
        <ul className="space-y-3">
          {routeStops.map((stop) => (
            <li key={stop.name} className="flex items-center gap-3">
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
