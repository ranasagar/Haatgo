
"use client";

import { useState, useCallback } from "react";
import type { Product } from "@/lib/data";
import { categories } from "@/lib/data";

import { AppHeader } from "@/components/haatgo/header";
import { LivestreamViewer } from "@/components/haatgo/livestream-viewer";
import { RouteTracker } from "@/components/haatgo/route-tracker";
import { OrderTracker } from "@/components/haatgo/order-tracker";
import { Recommendations } from "@/components/haatgo/recommendations";
import { ProductBrowser } from "@/components/haatgo/product-browser";
import { WishlistSheet } from "@/components/haatgo/wishlist-sheet";
import { useToast } from "@/hooks/use-toast";
import { MyOrders } from "@/components/haatgo/my-orders";
import { FloatingChatButtons } from "@/components/haatgo/floating-chat-buttons";
import { useProducts } from "@/context/product-context";

export default function Home() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();
  const { products } = useProducts();

  const handleToggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const isWishlisted = prev.some((item) => item.id === product.id);
      if (isWishlisted) {
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        });
        return prev.filter((item) => item.id !== product.id);
      } else {
        toast({
          title: "Added to Wishlist!",
          description: `${product.name} has been added to your wishlist.`,
        });
        return [...prev, product];
      }
    });
  }, [toast]);

  return (
    <WishlistSheet wishlist={wishlist} onToggleWishlist={handleToggleWishlist}>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader wishlistCount={wishlist.length} />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:gap-8">
            <LivestreamViewer />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <aside className="lg:col-span-1 flex flex-col gap-6 lg:gap-8">
                <RouteTracker />
                <MyOrders />
                <OrderTracker />
              </aside>
              <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
                <Recommendations allProducts={products} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />
                <ProductBrowser categories={categories} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} />
              </div>
            </div>
          </div>
        </main>
        <FloatingChatButtons />
      </div>
    </WishlistSheet>
  );
}
