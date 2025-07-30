
"use client"

import Image from "next/image"
import { Info, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCart } from "@/context/cart-context"

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const getStockBadge = () => {
    if (product.quantity === 0) {
      return <Badge variant="destructive" className="absolute top-2 left-2">Sold Out</Badge>;
    }
    if (product.quantity <= 5) {
      return <Badge variant="secondary" className="absolute top-2 left-2 bg-yellow-400 text-yellow-900">Low Stock</Badge>;
    }
    return null;
  };
  
  return (
    <TooltipProvider>
      <Card className={cn("overflow-hidden rounded-lg group transition-all hover:shadow-md flex flex-col", className)}>
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint}
            />
            {getStockBadge()}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-headline font-semibold text-lg leading-tight">{product.name}</h3>
              {product.description && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                      <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{product.description}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-muted-foreground text-sm">{product.category}</p>
              {product.quantity > 0 && <p className="text-sm text-muted-foreground">{product.quantity} left</p>}
            </div>
             <div className="flex-grow" />
            <div className="flex justify-between items-end mt-4">
               <p className="font-bold text-primary text-lg">
                रू {product.price.toLocaleString()}
                <span className="text-sm font-medium text-muted-foreground"> / {product.measurement}</span>
              </p>
              <Button 
                size="sm" 
                onClick={() => addToCart(product)} 
                disabled={product.quantity === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
