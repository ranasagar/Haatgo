
"use client";

import { CartSheet } from "@/components/haatgo/cart-sheet";
import { AppHeader } from "./header";
import { FloatingChatButtons } from "./floating-chat-buttons";
import { StickyLivestreamBar } from "./sticky-livestream-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <CartSheet>
        <AppHeader />
        <StickyLivestreamBar />
        {children}
      </CartSheet>
      <FloatingChatButtons />
    </div>
  );
}
