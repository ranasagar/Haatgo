
"use client";

import { LivestreamDialog } from "@/components/haatgo/livestream-dialog";
import { MyOrders } from "@/components/haatgo/my-orders";
import { OrderTracker } from "@/components/haatgo/order-tracker";
import { ProductBrowser } from "@/components/haatgo/product-browser";
import { Recommendations } from "@/components/haatgo/recommendations";
import { RouteTracker } from "@/components/haatgo/route-tracker";
import { SendPackage } from "@/components/haatgo/send-package";
import { useProducts } from "@/context/product-context";
import { FloatingChatButtons } from "@/components/haatgo/floating-chat-buttons";
import { CartSheet } from "@/components/haatgo/cart-sheet";
import { AppHeader } from "@/components/haatgo/header";
import { AppShell } from "@/components/haatgo/app-shell";

export default function Home() {
  const { products } = useProducts();

  return (
    <AppShell>
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="sticky top-16 bg-background/95 backdrop-blur-sm py-2 z-30 flex justify-center -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 px-4 sm:px-6 lg:px-8 mb-4 border-b">
              <LivestreamDialog />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <aside className="lg:col-span-1 flex flex-col gap-6 lg:gap-8">
                <RouteTracker />
                <SendPackage />
                <MyOrders />
                <OrderTracker />
              </aside>
              <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
                <Recommendations allProducts={products} />
                <ProductBrowser />
              </div>
            </div>
          </div>
        </main>
    </AppShell>
  );
}
