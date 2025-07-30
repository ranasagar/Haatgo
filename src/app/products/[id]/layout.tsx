
"use client";

import { AppShell } from "@/components/haatgo/app-shell";

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <AppShell>
          {children}
      </AppShell>
  );
}
