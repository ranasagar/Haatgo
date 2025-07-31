
"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/context/product-context";
import { Tag, Sparkles, Star, TrendingUp, Clock, Sun, Cloud, Cloudy, CloudSun, CloudRain, CloudSnow, CloudLightning, Wind, Thermometer, Calendar } from "lucide-react";
import Link from "next/link";
import { fetchWeather, type WeatherOutput } from "@/ai/flows/weather-flow";
import { Skeleton } from "@/components/ui/skeleton";

const specialTags = ['On Sale', 'Cheap in Bulk', 'Featured', 'Best Seller'];

const tagIcons: { [key: string]: React.ReactNode } = {
    'On Sale': <Tag className="h-4 w-4 text-red-500" />,
    'Cheap in Bulk': <Sparkles className="h-4 w-4 text-green-500" />,
    'Featured': <Star className="h-4 w-4 text-yellow-500" />,
    'Best Seller': <TrendingUp className="h-4 w-4 text-blue-500" />,
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
    Thermometer: <Thermometer className="h-5 w-5 text-red-500" />,
}

export function ProductMarquee() {
  const { products } = useProducts();
  const [weather, setWeather] = useState<WeatherOutput | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const getWeather = async () => {
        try {
            const weatherData = await fetchWeather({ location: "Kathmandu" });
            setWeather(weatherData);
        } catch (error) {
            console.error("Failed to fetch weather", error);
        }
    }
    getWeather();
    
    const updateDateTime = () => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
        setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  const specialProducts = products.filter(p => p.tags && p.tags.some(tag => specialTags.includes(tag)));

  if (specialProducts.length === 0 && !weather) {
    return null;
  }

  const marqueeContent = specialProducts.length > 0 ? [...specialProducts, ...specialProducts, ...specialProducts] : [];

  return (
    <div className="w-full">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-between items-center mb-2 px-2 text-xs text-muted-foreground">
            <div className="hidden sm:flex flex-wrap gap-x-4 gap-y-1 items-center">
                {specialTags.map(tag => (
                    <div key={tag} className="flex items-center gap-1.5">
                        {tagIcons[tag]}
                        <span>{tag}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                 {currentDay ? (
                     <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold text-sm text-muted-foreground">{currentDay}</span>
                    </div>
                 ) : (
                    <Skeleton className="h-5 w-20" />
                 )}
                 {weather ? (
                    <div className="flex items-center gap-2">
                        {weatherIcons[weather.icon] || <Sun className="h-5 w-5 text-yellow-500" />}
                        <span className="font-semibold text-sm text-muted-foreground">{weather.temperature}°C, {weather.condition}</span>
                    </div>
                ) : (
                    <Skeleton className="h-5 w-32" />
                )}
                 {currentTime ? (
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold text-sm text-muted-foreground">{currentTime}</span>
                    </div>
                ): (
                    <Skeleton className="h-5 w-20" />
                )}
            </div>
        </div>
        <div className="relative flex w-full overflow-hidden rounded-lg bg-muted p-2 shadow-inner items-center">
            <div className="flex-shrink-0 flex items-center pr-4 border-r border-border/50">
                <Tag className="h-6 w-6 text-primary" />
                <span className="font-headline font-semibold ml-2 text-primary hidden sm:inline">Special Offers</span>
            </div>
            <div className="flex-grow relative overflow-hidden h-6">
                {marqueeContent.length > 0 && (
                    <div className="absolute inset-0 flex items-center animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
                    {marqueeContent.map((product, index) => (
                        <Link 
                        href={`/products/${product.id}`} 
                        key={`${product.id}-${index}`} 
                        className="flex items-center mx-4 hover:bg-background/50 p-1 rounded-md transition-colors"
                        >
                        {product.tags && tagIcons[product.tags.find(t => specialTags.includes(t))!] }
                        <span className="ml-2 text-sm text-muted-foreground font-medium">{product.name}</span>
                        </Link>
                    ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

