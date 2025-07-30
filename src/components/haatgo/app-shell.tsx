
"use client";

import { CartSheet } from "@/components/haatgo/cart-sheet";
import { AppHeaderWithLivestream } from "./app-header-with-livestream";
import { FloatingChatButtons } from "./floating-chat-buttons";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <CartSheet>
        <AppHeaderWithLivestream />
        {children}
      </CartSheet>
      <FloatingChatButtons />
    </div>
  );
}
