
"use client";

import { useState, useEffect } from "react";
import { productRecommendations } from "@/ai/flows/product-recommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/data";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type RecommendationsProps = {
  allProducts: Product[];
};

export function Recommendations({ allProducts }: RecommendationsProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecs() {
      if (allProducts.length === 0) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Using hardcoded sample data for demonstration
        const result = await productRecommendations({
          browsingHistory: "User looked at rice cookers, instant noodles, and warm jackets.",
          pastPurchases: "User bought a fleece blanket and a solar-powered lamp.",
        });

        // Match recommendations with actual products.
        const matchedProducts = result.recommendations
          .map(recName => {
            const cleanRecName = recName.toLowerCase().replace(/s$/, ''); // remove plural 's'
            return allProducts.find(p => p.name.toLowerCase().includes(cleanRecName));
          })
          .filter((p): p is Product => p !== undefined);
        
        const uniqueProducts = Array.from(new Set(matchedProducts.map(p => p.id))).map(id => matchedProducts.find(p => p.id === id)!);

        setRecommendedProducts(uniqueProducts.slice(0, 5)); // Limit to 5 for the carousel
      } catch (error) {
        console.error("Failed to get recommendations:", error);
        // Gracefully fail by showing no recommendations
        setRecommendedProducts([]);
      } finally {
        setLoading(false);
      }
    }
    getRecs();
  }, [allProducts]);

  if (loading) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2"><Sparkles className="text-primary h-5 w-5" /> Just For You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3 w-1/3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendedProducts.length === 0) {
    return null; // Don't show the component if there are no recommendations or if an error occurred
  }

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <Sparkles className="text-primary h-5 w-5" /> Just For You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: recommendedProducts.length > 2, // Only loop if there are enough items
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendedProducts.map((product) => (
              <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3">
                <ProductCard
                  product={product}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
