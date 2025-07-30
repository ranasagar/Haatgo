
"use client"

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import { LivestreamViewer } from "./livestream-viewer";
import { cn } from "@/lib/utils";

export function StickyLivestreamBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled more than, say, 50px
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Dialog>
      <div className={cn(
          "sticky top-16 z-30 flex justify-center py-2 bg-background/80 backdrop-blur-sm transition-all duration-300",
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <DialogTrigger asChild>
            <Button className="font-bold shadow-lg">
              <Radio className="mr-2 h-5 w-5 animate-pulse" />
              Watch Live
            </Button>
        </DialogTrigger>
      </div>
      
      <DialogContent className="max-w-6xl p-0 border-0 h-[80vh]">
         <DialogHeader className="sr-only">
          <DialogTitle>Livestream</DialogTitle>
          <DialogDescription>
            Watch the live broadcast and participate in the chat.
          </DialogDescription>
        </DialogHeader>
        <LivestreamViewer isDialog={true} />
      </DialogContent>
    </Dialog>
  );
}
