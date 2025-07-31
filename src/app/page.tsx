
"use client";

import { LiveIndicator } from "@/components/haatgo/live-indicator";
import { MyOrders } from "@/components/haatgo/my-orders";
import { OrderTracker } from "@/components/haatgo/order-tracker";
import { ProductBrowser } from "@/components/haatgo/product-browser";
import { Recommendations } from "@/components/haatgo/recommendations";
import { RouteTracker } from "@/components/haatgo/route-tracker";
import { SendPackage } from "@/components/haatgo/send-package";
import { useProducts } from "@/context/product-context";
import { AppShell } from "@/components/haatgo/app-shell";

export default function Home() {
  const { products } = useProducts();

  return (
    <AppShell>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col gap-6 lg:gap-8">
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
    </AppShell>
  );
}
