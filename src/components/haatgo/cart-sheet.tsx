
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

  const getPriceInfo = (item: any) => {
      const originalPrice = item.price;
      let effectivePrice = originalPrice;
      let discountApplied = false;
      let discountType = '';

      const isBulk = item.tags?.includes('Cheap in Bulk') && 
                     item.bulkQuantity && 
                     item.bulkPrice && 
                     item.quantityInCart >= item.bulkQuantity;
      
      if (isBulk && item.bulkPrice) {
          effectivePrice = item.bulkPrice;
          discountApplied = true;
          discountType = 'Bulk';
      } else {
          const isOnSale = item.tags?.includes('On Sale');
          if (isOnSale) {
              effectivePrice = item.price * 0.85; // 15% discount
              discountApplied = true;
              discountType = 'Sale';
          }
      }

      const discountPerItem = originalPrice - effectivePrice;
      return { originalPrice, effectivePrice, discountPerItem, discountApplied, discountType };
  }

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantityInCart;
  }, 0);

  const totalDiscount = cart.reduce((acc, item) => {
    const { discountPerItem } = getPriceInfo(item);
    return acc + discountPerItem * item.quantityInCart;
  }, 0);

  const priceAfterDiscount = subtotal - totalDiscount;
  const vatAmount = priceAfterDiscount * 0.13;
  const grandTotal = priceAfterDiscount + vatAmount;


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
              {cart.map((product) => {
                const { originalPrice, effectivePrice, discountApplied } = getPriceInfo(product);

                return (
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
                            <div className="flex items-baseline gap-2">
                                <p className="text-sm text-primary font-bold">रू {effectivePrice.toLocaleString()}</p>
                                {discountApplied && (
                                    <p className="text-xs text-muted-foreground line-through">रू {originalPrice.toLocaleString()}</p>
                                )}
                            </div>
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
                )
              })}
            </ul>
          </div>
        )}
        {cart.length > 0 && (
          <SheetFooter className="flex-col gap-2 border-t pt-4 px-6">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>रू {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                 <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- रू {totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                 <div className="flex justify-between">
                    <span>VAT (13%)</span>
                    <span>+ रू {vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>रू {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
