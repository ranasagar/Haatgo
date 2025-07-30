
"use client";

import { CartSheet } from "@/components/haatgo/cart-sheet";
import { AppHeader } from "@/components/haatgo/header";
import { FloatingChatButtons } from "./floating-chat-buttons";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <CartSheet>
        <AppHeader />
        {children}
      </CartSheet>
      <FloatingChatButtons />
    </div>
  );
}
