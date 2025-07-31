
"use client";

import { useProducts } from "@/context/product-context";
import { Tag, Sparkles, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const specialTags = ['On Sale', 'Cheap in Bulk', 'Featured', 'Best Seller'];

const tagIcons: { [key: string]: React.ReactNode } = {
    'On Sale': <Tag className="h-4 w-4 text-red-500" />,
    'Cheap in Bulk': <Sparkles className="h-4 w-4 text-green-500" />,
    'Featured': <Star className="h-4 w-4 text-yellow-500" />,
    'Best Seller': <TrendingUp className="h-4 w-4 text-blue-500" />,
};

export function ProductMarquee() {
  const { products } = useProducts();

  const specialProducts = products.filter(p => p.tags && p.tags.some(tag => specialTags.includes(tag)));

  if (specialProducts.length === 0) {
    return null;
  }

  // Duplicate the content for a seamless loop
  const marqueeContent = [...specialProducts, ...specialProducts, ...specialProducts];

  return (
    <div className="w-full">
        <div className="relative flex w-full overflow-hidden rounded-lg bg-muted p-2 shadow-inner">
            <div className="flex-shrink-0 flex items-center pr-4">
                <Tag className="h-6 w-6 text-primary" />
                <span className="font-headline font-semibold ml-2 text-primary">Special Offers</span>
            </div>
            <div className="flex-grow relative overflow-hidden">
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
            </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-start mt-2 px-2 text-xs text-muted-foreground">
            {specialTags.map(tag => (
                <div key={tag} className="flex items-center gap-1.5">
                    {tagIcons[tag]}
                    <span>{tag}</span>
                </div>
            ))}
        </div>
    </div>
  );
}
