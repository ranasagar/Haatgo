
import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { cn } from '@/lib/utils';
import { AppSettingsProvider } from '@/context/app-settings-context';
import { AuthProvider } from '@/context/auth-context';
import { ProductProvider } from '@/context/product-context';
import { DeliveryProvider } from '@/context/delivery-context';

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
            <ProductProvider>
                <DeliveryProvider>
                    {children}
                </DeliveryProvider>
            </ProductProvider>
          </AppSettingsProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
