"use client"

import { Truck, Radio, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type AppHeaderProps = {
  wishlistCount: number;
};

export function AppHeader({ wishlistCount }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Truck className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-foreground">HaatGo</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button className="font-bold hidden sm:flex" size="sm">
            <Radio className="mr-2 h-4 w-4" />
            Watch Live
          </Button>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open Wishlist">
              <div className="relative">
                <Heart className="h-6 w-6 text-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Button>
          </SheetTrigger>
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
