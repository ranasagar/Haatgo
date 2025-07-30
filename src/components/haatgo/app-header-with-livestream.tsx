
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
import { AppHeader } from "./header";
import { cn } from "@/lib/utils";

export function AppHeaderWithLivestream() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Dialog>
      <AppHeader />
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
