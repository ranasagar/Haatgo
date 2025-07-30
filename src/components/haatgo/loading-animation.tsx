
"use client";

import { Truck } from "lucide-react";

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary">
      <div className="relative w-48 h-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center animate-drive">
          <Truck className="w-20 h-20 text-primary" />
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-foreground animate-pulse">
        Loading...
      </p>
      <div className="w-48 h-1 mt-2 bg-primary/20 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-progress w-full"></div>
      </div>
    </div>
  );
}
