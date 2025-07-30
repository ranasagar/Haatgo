
"use client";

import { Home, Package, ShoppingCart, Map, PanelLeft, Clapperboard, Truck, Settings, BookOpen, Info, Wallet, LogOut, User as UserIcon, Store } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppSettings } from "@/context/app-settings-context";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useAppSettings();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/routes", icon: Map, label: "Routes" },
    { href: "/admin/deliveries", icon: Truck, label: "Deliveries" },
    { href: "/admin/livestream", icon: Clapperboard, label: "Livestream" },
    { href: "/admin/accounting", icon: Wallet, label: "Accounting" },
    { href: "/admin/setup-guide", icon: BookOpen, label: "Setup Guide" },
    { href: "/admin/about", icon: Info, label: "About" },
  ];

  const AppLogo = () => (
    <>
      {settings.appLogo ? (
        <Image src={settings.appLogo} alt={settings.appName} width={24} height={24} className="transition-all group-hover:scale-110" />
      ) : (
        <Store className="h-5 w-5 transition-all group-hover:scale-110" />
      )}
    </>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-sidebar sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
           <AppLogo />
            <span className="sr-only">{settings.appName}</span>
          </Link>
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground md:h-8 md:w-8"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-sidebar text-sidebar-foreground border-sidebar-border">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin/settings"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground md:h-8 md:w-8"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-sidebar text-sidebar-foreground border-sidebar-border">Settings</TooltipContent>
              </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs bg-sidebar text-sidebar-foreground border-sidebar-border">
               <SheetHeader>
                  <SheetTitle className="text-sidebar-foreground">Menu</SheetTitle>
                </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-4">
                <Link
                   href="/"
                   className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <AppLogo />
                  <span className="sr-only">{settings.appName}</span>
                </Link>
                 {[...navItems, { href: "/admin/settings", icon: Settings, label: "Settings" }].map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-4 px-2.5 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                 ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto">
            {user && (
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
                            <UserIcon className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            )}
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
