
"use client"

import Image from "next/image"
import { X, ShoppingCart, Plus, Minus } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"

type CartSheetProps = {
  children: React.ReactNode;
};

export function CartSheet({ children }: CartSheetProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, checkout } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantityInCart, 0);

  const handleCheckout = () => {
    checkout();
  }

  return (
    <Sheet>
      {children}
      <SheetContent className="flex flex-col w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <SheetHeader className="px-6">
          <SheetTitle className="font-headline text-2xl">Your Cart</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-headline text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground mt-2">Add items to get started.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto -mx-6 px-6">
            <ul className="space-y-4 py-4">
              {cart.map((product) => (
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
                     <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(product.id, product.quantityInCart - 1)}><Minus className="h-3 w-3" /></Button>
                      <span className="text-sm font-medium w-4 text-center">{product.quantityInCart}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(product.id, product.quantityInCart + 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove from cart"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {cart.length > 0 && (
          <SheetFooter className="flex-col gap-4 border-t pt-4 px-6">
            <div className="flex justify-between font-semibold text-lg">
                <span>Subtotal</span>
                <span>रू {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <SheetClose asChild>
                <Button className="w-full font-bold" onClick={handleCheckout}>Proceed to Checkout</Button>
            </SheetClose>
            <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
