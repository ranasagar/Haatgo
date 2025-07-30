
"use client";

import { Home, Package, ShoppingCart, Map, Clapperboard, Truck, Settings, BookOpen, Info, Wallet, LogOut, User as UserIcon, Store, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useAppSettings();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/routes", icon: Map, label: "Routes" },
    { href: "/admin/deliveries", icon: Truck, label: "Deliveries" },
    { href: "/admin/parcels", icon: Send, label: "Parcels" },
    { href: "/admin/livestream", icon: Clapperboard, label: "Livestream" },
    { href: "/admin/accounting", icon: Wallet, label: "Accounting" },
    { href: "/admin/setup-guide", icon: BookOpen, label: "Setup Guide" },
    { href: "/admin/about", icon: Info, label: "About" },
  ];

  const AppLogo = () => (
    <>
      {settings.appLogo ? (
        <Image src={settings.appLogo} alt={settings.appName} width={24} height={24} />
      ) : (
        <Store className="h-6 w-6" />
      )}
    </>
  );

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <div className="flex items-center gap-2">
              <AppLogo />
              <span className="text-lg font-semibold">{settings.appName}</span>
           </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/admin/settings" legacyBehavior passHref>
                        <SidebarMenuButton isActive={pathname === '/admin/settings'} tooltip="Settings">
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-4">
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
        <main className="flex-1 p-4 sm:px-6 sm:py-4 md:gap-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
