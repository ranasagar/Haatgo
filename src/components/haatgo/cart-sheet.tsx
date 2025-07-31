
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
import { useAppSettings } from "@/context/app-settings-context"
import { ScrollArea } from "@/components/ui/scroll-area"

type CartSheetProps = {
  children: React.ReactNode;
};

export function CartSheet({ children }: CartSheetProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, checkout } = useCart();
  const { settings } = useAppSettings();

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
  const vatAmount = priceAfterDiscount * (settings.vatRate / 100);
  const grandTotal = priceAfterDiscount + vatAmount;


  const handleCheckout = () => {
    checkout();
  }

  return (
    <Sheet>
      {children}
      <SheetContent className="flex w-full flex-col sm:max-w-md md:max-w-lg lg:max-w-xl">
        <SheetHeader>
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
          <div className="flex min-h-0 flex-1 flex-col">
            <ScrollArea className="-mx-6 flex-grow">
                <ul className="space-y-4 px-6 py-4">
                {cart.map((product) => {
                    const { originalPrice, effectivePrice, discountApplied } = getPriceInfo(product);

                    return (
                        <li key={product.id} className="flex items-center gap-2 sm:gap-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={80}
                                height={80}
                                className="rounded-md object-cover h-16 w-16 sm:h-20 sm:w-20"
                                data-ai-hint={product.dataAiHint}
                            />
                            <div className="flex-grow min-w-0">
                                <p className="font-semibold whitespace-normal break-words">{product.name}</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-sm font-bold text-primary">रू {effectivePrice.toLocaleString()}</p>
                                    {discountApplied && (
                                        <p className="text-xs text-muted-foreground line-through">रू {originalPrice.toLocaleString()}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, product.quantityInCart - 1)}><Minus className="h-4 w-4" /></Button>
                                    <span className="w-4 text-center text-sm font-medium">{product.quantityInCart}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, product.quantityInCart + 1)}><Plus className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                                onClick={() => removeFromCart(product.id)}
                                aria-label="Remove from cart"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </li>
                    )
                })}
                </ul>
            </ScrollArea>
          </div>
        )}
        {cart.length > 0 && (
          <SheetFooter className="flex-col gap-4 border-t pt-4">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>रू {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                 <div className="flex justify-between font-semibold text-green-600">
                    <span>Discount</span>
                    <span>- रू {totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                 <div className="flex justify-between">
                    <span>VAT ({settings.vatRate}%)</span>
                    <span>+ रू {vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>रू {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <SheetClose asChild>
                  <Button className="w-full font-bold" onClick={handleCheckout}>Proceed to Checkout</Button>
              </SheetClose>
              <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
