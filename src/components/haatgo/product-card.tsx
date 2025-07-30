
"use client"

import Image from "next/image"
import Link from "next/link"
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
  const isSoldOut = product.quantity === 0;

  return (
    <TooltipProvider>
      <Card className={cn("overflow-hidden rounded-lg group transition-all hover:shadow-md flex flex-col", { "bg-muted/50": isSoldOut }, className)}>
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative">
            <Link href={`/products/${product.id}`} className={cn({"pointer-events-none": isSoldOut})}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className={cn("object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105", { "grayscale": isSoldOut })}
                data-ai-hint={product.dataAiHint}
              />
            </Link>
            {isSoldOut && <Badge variant="destructive" className="absolute top-2 left-2">Sold Out</Badge>}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-start justify-between gap-2">
               <Link href={`/products/${product.id}`} className={cn("hover:underline", {"pointer-events-none": isSoldOut})}>
                    <h3 className="font-headline font-semibold text-lg leading-tight">{product.name}</h3>
               </Link>
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
              <p className="text-sm text-muted-foreground">{product.category}</p>
              {!isSoldOut && product.quantity <= 5 && <p className="text-sm text-yellow-600 font-semibold">{product.quantity} left</p>}
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
                disabled={isSoldOut}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isSoldOut ? "Sold Out" : "Add to cart"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

    