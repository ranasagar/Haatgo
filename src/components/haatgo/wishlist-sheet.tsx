"use client"

import Image from "next/image"
import { X, ShoppingCart } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/lib/data"

type WishlistSheetProps = {
  children: React.ReactNode;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
};

export function WishlistSheet({ children, wishlist, onToggleWishlist }: WishlistSheetProps) {
  return (
    <Sheet>
      {children}
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Your Wishlist</SheetTitle>
        </SheetHeader>
        <Separator />
        {wishlist.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-headline text-xl font-semibold">Your wishlist is empty</h3>
            <p className="text-muted-foreground mt-2">Add items you love to see them here.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto -mx-6 px-6">
            <ul className="space-y-4 py-4">
              {wishlist.map((product) => (
                <li key={product.id} className="flex items-center gap-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover h-16 w-16"
                    data-ai-hint={product.dataAiHint}
                  />
                  <div className="flex-grow">
                    <p className="font-semibold truncate">{product.name}</p>
                    <p className="text-sm text-primary font-bold">रू {product.price.toLocaleString()}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                    onClick={() => onToggleWishlist(product)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {wishlist.length > 0 && (
            <SheetFooter>
              <Button className="w-full font-bold">Proceed to Checkout</Button>
            </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
