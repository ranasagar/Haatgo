
"use client"

import Link from "next/link"
import { Truck, Radio, Heart, User, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppSettings } from "@/context/app-settings-context";

type AppHeaderProps = {
  wishlistCount: number;
};

export function AppHeader({ wishlistCount }: AppHeaderProps) {
  const { settings } = useAppSettings();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Truck className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-foreground">{settings.appName}</h1>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
