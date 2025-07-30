
"use client";

import { useState } from "react";
import { AppHeader } from "@/components/haatgo/header";
import { WishlistSheet } from "@/components/haatgo/wishlist-sheet";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/data";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();

  const handleToggleWishlist = (product: Product) => {
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
  };

  return (
    <WishlistSheet wishlist={wishlist} onToggleWishlist={handleToggleWishlist}>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader wishlistCount={wishlist.length} />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
             {children}
            </div>
        </main>
      </div>
    </WishlistSheet>
  );
}
