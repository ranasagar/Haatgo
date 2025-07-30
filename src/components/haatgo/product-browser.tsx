"use client"

import { useState } from "react"
import type { Product } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "./product-card"

type ProductBrowserProps = {
  allProducts: Product[];
  categories: string[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
};

export function ProductBrowser({ allProducts, categories, wishlist, onToggleWishlist }: ProductBrowserProps) {
  const [activeTab, setActiveTab] = useState(categories[0]);

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
          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some(item => item.id === product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
