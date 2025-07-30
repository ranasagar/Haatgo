
"use client"

import { useState } from "react"
import { useProducts } from "@/context/product-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductCard } from "./product-card"
import { categories, districts } from "@/lib/data"
import { MapPin } from "lucide-react";

export function ProductBrowser() {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [activeDistrict, setActiveDistrict] = useState(districts[0]);
  const { products: allProducts } = useProducts();
  
  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = activeTab === 'All' || product.category === activeTab;
    const districtMatch = activeDistrict === 'All Districts' || product.district === activeDistrict;
    const statusMatch = product.status === 'active';
    return categoryMatch && districtMatch && statusMatch;
  });

  const soldOutProducts = allProducts.filter(product => {
    const categoryMatch = activeTab === 'All' || product.category === activeTab;
    const districtMatch = activeDistrict === 'All Districts' || product.district === activeDistrict;
    const statusMatch = product.status === 'active';
    const soldOutMatch = product.quantity === 0;
    return categoryMatch && districtMatch && statusMatch && soldOutMatch;
  });

  const availableProducts = filteredProducts.filter(p => p.quantity > 0);


  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Browse Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
             <Select value={activeDistrict} onValueChange={setActiveDistrict}>
                <SelectTrigger className="w-full sm:w-[200px]">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Filter by District" />
                </SelectTrigger>
                <SelectContent>
                    {districts.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="w-full overflow-hidden">
                <div className="w-full relative px-10">
                    <Carousel
                        opts={{
                            align: "start",
                            dragFree: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-1">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="flex-nowrap">
                                    {categories.map((category) => (
                                        <CarouselItem key={category} className="pl-1 basis-auto">
                                            <TabsTrigger value={category}>{category}</TabsTrigger>
                                        </CarouselItem>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 bg-background/80 hover:bg-background border-primary text-primary hover:text-primary disabled:opacity-0" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 bg-background/80 hover:bg-background border-primary text-primary hover:text-primary disabled:opacity-0" />
                    </Carousel>
                </div>
            </div>
        </div>
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {availableProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
                 {soldOutProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            {availableProducts.length === 0 && soldOutProducts.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p className="font-semibold">No products found</p>
                    <p className="text-sm">Try adjusting your category or district filter.</p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}

    