
"use client"

import { useState } from "react"
import { useProducts } from "@/context/product-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "./product-card"
import { categories } from "@/lib/data"

export function ProductBrowser() {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const { products: allProducts } = useProducts();

  const filteredProducts = activeTab === 'All'
    ? allProducts
    : allProducts.filter((p) => p.category === activeTab);

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Browse Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0]} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6 mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
            {categories.map((category) => (
                <TabsContent key={category} value={category}>
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
