
"use client"

import { useState, useEffect, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Truck, User, LayoutDashboard, LogOut, ShoppingCart } from "lucide-react"
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
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"

export function AppHeader() {
  const { settings } = useAppSettings();
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantityInCart, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          {settings.appLogo ? (
             <Image src={settings.appLogo} alt={settings.appName} width={32} height={32} className="h-8 w-8" />
          ) : (
             <Truck className="h-7 w-7 text-primary" />
          )}
          <h1 className="text-2xl font-headline font-bold text-foreground">{settings.appName}</h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open Cart">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-foreground" />
                {mounted && cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Button>
          </SheetTrigger>
          {mounted && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src={user.photoURL || "https://placehold.co/100x100"} alt="User Avatar" />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
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
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                        <Link href="/admin">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Admin Panel</span>
                        </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : mounted && !user ? (
            <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          ) : (
            <div className="h-9 w-28 animate-pulse rounded-md bg-muted" /> // Skeleton loader
          )}
        </div>
      </div>
    </header>
  );
}
