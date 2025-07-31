
"use client";

import { AppHeader } from "@/components/haatgo/header";

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      {children}
    </div>
  );
}
