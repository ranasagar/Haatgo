
"use client"

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


export function AppHeaderWithLivestream() {
  return (
    <Dialog>
      <AppHeader
        livestreamTrigger={
          <DialogTrigger asChild>
            <Button className="font-bold">
              <Radio className="mr-2 h-5 w-5" />
              Watch Live
            </Button>
          </DialogTrigger>
        }
      />
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
