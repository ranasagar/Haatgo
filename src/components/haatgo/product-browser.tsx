
"use client"

import { useState } from "react"
import { useProducts } from "@/context/product-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ProductCard } from "./product-card"
import { categories, districts, productTags } from "@/lib/data"
import { MapPin, Tag, List, Search } from "lucide-react";

export function ProductBrowser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeDistrict, setActiveDistrict] = useState(districts[0]);
  const [activeTag, setActiveTag] = useState<(typeof productTags)[number]>(productTags[0]);
  const { products: allProducts } = useProducts();
  
  const filteredProducts = allProducts.filter(product => {
    const searchMatch = searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
    const districtMatch = activeDistrict === 'All Districts' || product.district === activeDistrict;
    const tagMatch = activeTag === 'All Tags' || (product.tags && product.tags.includes(activeTag));
    const statusMatch = product.status === 'active';
    return searchMatch && categoryMatch && districtMatch && tagMatch && statusMatch;
  });

  const soldOutProducts = allProducts.filter(product => {
    const searchMatch = searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
    const districtMatch = activeDistrict === 'All Districts' || product.district === activeDistrict;
    const tagMatch = activeTag === 'All Tags' || (product.tags && product.tags.includes(activeTag));
    const statusMatch = product.status === 'archived' || product.quantity === 0;
    return searchMatch && categoryMatch && districtMatch && tagMatch && statusMatch;
  });

  const availableProducts = filteredProducts.filter(p => p.quantity > 0);


  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Browse Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="text" 
                    placeholder="Search for products..."
                    className="w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <List className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                 <Select value={activeTag} onValueChange={setActiveTag}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Filter by Tag" />
                    </SelectTrigger>
                    <SelectContent>
                        {productTags.map(tag => (
                            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                    <p className="text-sm">Try adjusting your filters or search term.</p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
