
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LivestreamViewer } from "./livestream-viewer";
import { Radio } from "lucide-react";

export function LivestreamDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold w-full sm:w-auto text-lg py-6 sm:py-4">
          <Radio className="mr-2 h-5 w-5" />
          Watch Live Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl p-0 border-0">
         <DialogHeader className="sr-only">
          <DialogTitle>Livestream</DialogTitle>
          <DialogDescription>
            Watch the live broadcast and participate in the chat.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
                 <div className="aspect-video bg-muted rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg flex items-center justify-center">
                    {/* Main video player content from LivestreamViewer will be implicitly here if we structure it well */}
                 </div>
            </div>
            <div className="lg:col-span-1 flex flex-col bg-background rounded-br-lg rounded-bl-lg lg:rounded-bl-none lg:rounded-tr-lg">
                {/* Chat content from LivestreamViewer goes here */}
            </div>
        </div>
        <LivestreamViewer isDialog={true} />
      </DialogContent>
    </Dialog>
  );
}
