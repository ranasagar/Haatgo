
"use client"

import { useState } from "react"
import { useProducts } from "@/context/product-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ProductCard } from "./product-card"
import { categories } from "@/lib/data"

export function ProductBrowser() {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const { products: allProducts } = useProducts();

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Browse Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0]} onValueChange={setActiveTab} className="w-full">
          <div className="w-full">
             <Carousel
              opts={{
                align: "start",
                dragFree: true,
              }}
              className="w-full px-10"
            >
              <CarouselContent>
                <TabsList className="bg-transparent p-0 m-0">
                  {categories.map((category) => (
                    <CarouselItem key={category} className="basis-auto pl-2">
                      <TabsTrigger value={category}>{category}</TabsTrigger>
                    </CarouselItem>
                  ))}
                </TabsList>
              </CarouselContent>
              <CarouselPrevious className="h-8 w-8 bg-background/80 hover:bg-background border-primary text-primary hover:text-primary disabled:opacity-0" />
              <CarouselNext className="h-8 w-8 bg-background/80 hover:bg-background border-primary text-primary hover:text-primary disabled:opacity-0" />
            </Carousel>
          </div>
            {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {(activeTab === 'All' ? allProducts : allProducts.filter(p => p.category === category)).map((product) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                            />
                        ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
