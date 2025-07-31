
"use client";

import { LiveIndicator } from "@/components/haatgo/live-indicator";
import { MyOrders } from "@/components/haatgo/my-orders";
import { OrderTracker } from "@/components/haatgo/order-tracker";
import { ProductBrowser } from "@/components/haatgo/product-browser";
import { Recommendations } from "@/components/haatgo/recommendations";
import { RouteTracker } from "@/components/haatgo/route-tracker";
import { SendPackage } from "@/components/haatgo/send-package";
import { useProducts } from "@/context/product-context";
import { RouteMarquee } from "@/components/haatgo/route-marquee";
import { AppHeader } from "@/components/haatgo/header";
import { StickyLivestreamBar } from "@/components/haatgo/sticky-livestream-bar";

export default function Home() {
  const { products } = useProducts();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <StickyLivestreamBar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col gap-6 lg:gap-8">
          <RouteMarquee />
          <LiveIndicator />
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
    </div>
  );
}
