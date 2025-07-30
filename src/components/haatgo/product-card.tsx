"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import type { Product } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ProductCardProps = {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  className?: string;
};

export function ProductCard({ product, isWishlisted, onToggleWishlist, className }: ProductCardProps) {
  return (
    <Card className={cn("overflow-hidden rounded-lg group transition-all hover:shadow-md", className)}>
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full h-9 w-9"
            onClick={() => onToggleWishlist(product)}
            aria-label="Toggle Wishlist"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all",
                isWishlisted ? "text-red-500 fill-red-500" : "text-foreground"
              )}
            />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-headline font-semibold text-lg truncate">{product.name}</h3>
          <p className="text-muted-foreground text-sm">{product.category}</p>
          <p className="font-bold text-primary text-lg mt-2">रू {product.price.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
