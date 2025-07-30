
"use client"

import Image from "next/image"
import Link from "next/link"
import { Info, ShoppingCart, Star, Sparkles } from "lucide-react"
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

const tagColors: { [key: string]: string } = {
  'Featured': 'bg-yellow-400 text-yellow-900',
  'Best Seller': 'bg-blue-400 text-blue-900',
  'On Sale': 'bg-red-500 text-white',
  'Cheap in Bulk': 'bg-green-500 text-white',
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const isSoldOut = product.quantity === 0;
  const isOnSale = product.tags?.includes('On Sale');
  const salePrice = isOnSale ? product.price * 0.85 : product.price;

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
             <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                {product.tags?.map(tag => (
                    <Badge key={tag} className={cn("text-xs", tagColors[tag])}>
                       {tag === 'Featured' && <Star className="h-3 w-3 mr-1" />}
                       {tag === 'On Sale' && <Sparkles className="h-3 w-3 mr-1" />}
                        {tag}
                    </Badge>
                ))}
            </div>
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
              {!isSoldOut && product.quantity <= 10 && <p className="text-sm text-yellow-600 font-semibold">{product.quantity} left</p>}
            </div>
             <div className="flex-grow" />
             {product.tags?.includes('Cheap in Bulk') && product.bulkPrice && product.bulkQuantity && (
                <div className="mt-2 text-xs text-green-700 font-bold bg-green-100 p-2 rounded-md">
                    Buy {product.bulkQuantity} or more for रू{product.bulkPrice.toLocaleString()} each!
                </div>
             )}
            <div className="flex justify-between items-end mt-4">
               <div className="flex flex-col">
                  {isOnSale ? (
                    <>
                      <p className="font-bold text-primary text-lg">
                        रू {salePrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        <span className="text-sm font-medium text-muted-foreground"> / {product.measurement}</span>
                      </p>
                      <p className="text-sm text-muted-foreground line-through">
                        रू {product.price.toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <p className="font-bold text-primary text-lg">
                      रू {product.price.toLocaleString()}
                      <span className="text-sm font-medium text-muted-foreground"> / {product.measurement}</span>
                    </p>
                  )}
               </div>
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
