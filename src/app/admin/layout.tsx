import { Home, Package, ShoppingCart, Map, PanelLeft, Clapperboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/routes", icon: Map, label: "Routes" },
    { href: "/admin/livestream", icon: Clapperboard, label: "Livestream" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
           <svg
              className="h-5 w-5 transition-all group-hover:scale-110"
              viewBox="0 0 512 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M188.8 96l54.3 93.7-54.3 93.7H74.5L20.2 189.7 74.5 96h114.3zM512 254.3c0 13.3-5.1 25.8-14.3 35.1l-100.8 100.8c-12.2 12.2-28.8 18.8-46.3 18.8H254.3l54.3-93.7-54.3-93.7h96.4c13.3 0 25.8 5.1 35.1 14.3l61.9 61.9c9.1 9.2 14.3 21.8 14.3 35.1zM323.2 96l54.3 93.7-54.3 93.7H208.9l-54.3-93.7 54.3-93.7h114.3z" />
            </svg>
            <span className="sr-only">HaatGo</span>
          </Link>
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
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
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                   href="/"
                   className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <svg
                    className="h-5 w-5 transition-all group-hover:scale-110"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M188.8 96l54.3 93.7-54.3 93.7H74.5L20.2 189.7 74.5 96h114.3zM512 254.3c0 13.3-5.1 25.8-14.3 35.1l-100.8 100.8c-12.2 12.2-28.8 18.8-46.3 18.8H254.3l54.3-93.7-54.3-93.7h96.4c13.3 0 25.8 5.1 35.1 14.3l61.9 61.9c9.1 9.2 14.3 21.8 14.3 35.1zM323.2 96l54.3 93.7-54.3 93.7H208.9l-54.3-93.7 54.3-93.7h114.3z" />
                  </svg>
                  <span className="sr-only">HaatGo</span>
                </Link>
                 {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                 ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
