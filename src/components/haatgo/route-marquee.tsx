
"use client";

import { useState, useEffect } from "react";
import { useRoutes } from "@/context/route-context";
import { getRouteConditions } from "@/ai/flows/route-conditions-flow";
import { Megaphone, CloudSun, TrafficCone, Sparkle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function RouteMarquee() {
  const { routes } = useRoutes();
  const [conditions, setConditions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const activeRoute = routes.length > 0 ? routes[0] : null;

  useEffect(() => {
    const fetchConditions = async () => {
      if (!activeRoute) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const result = await getRouteConditions({
          routeName: activeRoute.name,
          stops: activeRoute.stops.map(s => s.name),
        });
        setConditions(result.conditions);
      } catch (error) {
        console.error("Failed to fetch route conditions:", error);
        setConditions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConditions();
  }, [activeRoute]);

  const getIconForCondition = (condition: string) => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes("rain") || lowerCaseCondition.includes("showers")) return <CloudSun className="h-4 w-4 text-blue-500" />;
    if (lowerCaseCondition.includes("traffic") || lowerCaseCondition.includes("delay") || lowerCaseCondition.includes("construction")) return <TrafficCone className="h-4 w-4 text-orange-500" />;
    if (lowerCaseCondition.includes("sun") || lowerCaseCondition.includes("clear")) return <CloudSun className="h-4 w-4 text-yellow-500" />;
    return <Sparkle className="h-4 w-4 text-primary" />;
  };

  if (loading) {
    return <Skeleton className="h-10 w-full rounded-lg" />;
  }

  if (!activeRoute || conditions.length === 0) {
    return null;
  }

  // We duplicate the content to ensure a seamless loop for the marquee effect.
  const marqueeContent = [...conditions, ...conditions, ...conditions];

  return (
    <div className="relative flex w-full overflow-hidden rounded-lg bg-muted p-2 shadow-inner">
      <div className="flex-shrink-0 flex items-center pr-4">
        <Megaphone className="h-6 w-6 text-primary" />
        <span className="font-headline font-semibold ml-2 text-primary">Live Updates</span>
      </div>
      <div className="flex-grow relative overflow-hidden">
        <div className="absolute inset-0 flex items-center animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {marqueeContent.map((condition, index) => (
            <div key={index} className="flex items-center mx-4">
              {getIconForCondition(condition)}
              <span className="ml-2 text-sm text-muted-foreground">{condition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
