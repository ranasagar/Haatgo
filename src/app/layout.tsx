
import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { cn } from '@/lib/utils';
import { AppSettingsProvider } from '@/context/app-settings-context';
import { AuthProvider } from '@/context/auth-context';
import { ProductProvider } from '@/context/product-context';
import { DeliveryProvider } from '@/context/delivery-context';
import { ParcelProvider } from '@/context/parcel-context';
import { CartProvider } from '@/context/cart-context';
import { OrderProvider } from '@/context/order-context';
import { UserProfileProvider } from '@/context/user-profile-context';
import { ReviewProvider } from '@/context/review-context';
import { RouteProvider } from '@/context/route-context';
import { UserProvider } from '@/context/user-context';

export const metadata: Metadata = {
  title: 'HaatGo',
  description: 'A traveling digital marketplace for Nepal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "font-body"
        )}
      >
        <AuthProvider>
          <AppSettingsProvider>
            <UserProfileProvider>
              <ProductProvider>
                <DeliveryProvider>
                  <ParcelProvider>
                    <RouteProvider>
                      <UserProvider>
                        <OrderProvider>
                          <CartProvider>
                            <ReviewProvider>
                              {children}
                            </ReviewProvider>
                          </CartProvider>
                        </OrderProvider>
                      </UserProvider>
                    </RouteProvider>
                  </ParcelProvider>
                </DeliveryProvider>
              </ProductProvider>
            </UserProfileProvider>
          </AppSettingsProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
