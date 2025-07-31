"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchForecast, type ForecastOutput } from "@/ai/flows/forecast-flow";
import { Sun, Cloud, Cloudy, CloudSun, CloudRain, CloudSnow, CloudLightning, Wind } from "lucide-react";

const weatherIcons: { [key: string]: React.ReactNode } = {
    Sun: <Sun className="h-6 w-6 text-yellow-500" />,
    Cloud: <Cloud className="h-6 w-6 text-gray-400" />,
    Cloudy: <Cloudy className="h-6 w-6 text-gray-500" />,
    CloudSun: <CloudSun className="h-6 w-6 text-yellow-500" />,
    CloudRain: <CloudRain className="h-6 w-6 text-blue-400" />,
    CloudSnow: <CloudSnow className="h-6 w-6 text-blue-200" />,
    CloudLightning: <CloudLightning className="h-6 w-6 text-yellow-400" />,
    Wind: <Wind className="h-6 w-6 text-gray-400" />,
};

export function WeatherForecast() {
  const [forecastData, setForecastData] = useState<ForecastOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForecast = async () => {
      try {
        setLoading(true);
        const data = await fetchForecast({ location: "Kathmandu" });
        setForecastData(data);
      } catch (error) {
        console.error("Failed to fetch forecast:", error);
      } finally {
        setLoading(false);
      }
    };
    getForecast();
  }, []);

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">7-Day Forecast</CardTitle>
        <CardDescription>Weather outlook for Kathmandu.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(7)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                    <div className="w-24">
                        <Skeleton className="h-5 w-20 mb-1" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-5 w-16" />
                </div>
            ))}
          </div>
        ) : forecastData ? (
          <ul className="space-y-4">
            {forecastData.forecast.map((day, index) => (
              <li key={index} className="flex items-center justify-between gap-4">
                <div className="w-24">
                    <p className="font-semibold text-sm">{day.day}</p>
                    <p className="text-xs text-muted-foreground">{day.date}</p>
                </div>
                <span className="text-muted-foreground flex-grow text-sm text-center">{day.condition}</span>
                {weatherIcons[day.icon] || <Sun className="h-6 w-6 text-yellow-500" />}
                <span className="font-bold text-base w-12 text-right">{day.temp}°C</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center">Could not load weather forecast.</p>
        )}
      </CardContent>
    </Card>
  );
}
