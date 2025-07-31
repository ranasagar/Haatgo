
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
import type { CartItem } from "@/context/cart-context"
import { cn } from "@/lib/utils"

const CartListItem = ({ item, getPriceInfo, updateQuantity, removeFromCart }: { item: CartItem, getPriceInfo: (item: CartItem) => any, updateQuantity: (id: string, q: number) => void, removeFromCart: (id: string) => void }) => {
    const { originalPrice, effectivePrice, discountApplied } = getPriceInfo(item);
    
    return (
        <li className="flex flex-col sm:grid sm:grid-cols-[auto_1fr_auto] sm:grid-rows-2 sm:items-center py-4 gap-x-4">
             <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-muted sm:row-span-2">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-center"
                    data-ai-hint={item.dataAiHint}
                />
            </div>

            <div className="flex justify-between mt-2 sm:mt-0">
                <div>
                    <h3 className="text-base font-medium text-foreground">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                </div>
                 <div className="text-right ml-4">
                    <p className="font-medium">रू{effectivePrice.toLocaleString()}</p>
                    {discountApplied && (
                        <p className="text-sm text-muted-foreground line-through">रू{originalPrice.toLocaleString()}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 sm:mt-0 sm:col-start-2">
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantityInCart - 1)}><Minus className="h-4 w-4" /></Button>
                    <span className="w-4 text-center font-medium">{item.quantityInCart}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantityInCart + 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="font-medium text-destructive hover:text-destructive/80"
                    onClick={() => removeFromCart(item.id)}
                >
                    Remove
                </Button>
            </div>
        </li>
    )
}

export function CartSheet({ children }: { children: React.ReactNode }) {
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
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle className="font-headline text-2xl">Your Cart</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-headline text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground mt-2">Add items to get started.</p>
          </div>
        ) : (
            <div className="mt-8 flex-1 overflow-y-auto">
                <ScrollArea className="h-full">
                    <ul role="list" className="divide-y divide-border px-6">
                        {cart.map((item) => (
                           <CartListItem 
                                key={item.id}
                                item={item}
                                getPriceInfo={getPriceInfo}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                           />
                        ))}
                    </ul>
                </ScrollArea>
            </div>
        )}
        
        {cart.length > 0 && (
          <SheetFooter className="flex-col gap-4 border-t bg-background px-6 py-4">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-muted-foreground">रू {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                 <div className="flex justify-between font-semibold text-green-600">
                    <span className="text-green-600">Discount</span>
                    <span>- रू {totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT ({settings.vatRate}%)</span>
                    <span className="text-muted-foreground">+ रू {vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-medium text-foreground">
                <p>Total</p>
                <p>रू {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
             <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
                <p>Shipping and taxes calculated at checkout.</p>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
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
