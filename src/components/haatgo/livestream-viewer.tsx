
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


export function LivestreamViewer() {
  // In a real application, this would come from a backend or API call to Facebook.
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Simulate live status toggling every 10 seconds for demonstration
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline text-xl">
          Live Broadcast
        </CardTitle>
        <Badge variant={isLive ? "default" : "destructive"} className={cn("transition-all", isLive ? "bg-green-600 hover:bg-green-700" : "")}>
          {isLive ? <Wifi className="h-4 w-4 mr-2" /> : <WifiOff className="h-4 w-4 mr-2" />}
          {isLive ? 'Online' : 'Offline'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          {isLive ? (
            <div className="text-center text-muted-foreground">
              {/* In a real app, this would be the Facebook embed iframe */}
              <Video className="h-16 w-16 mx-auto text-primary" />
              <p>Livestream is active.</p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <Video className="h-16 w-16 mx-auto" />
              <p>Livestream is currently offline.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
