
"use client";

import { AppHeaderWithLivestream } from "@/components/haatgo/app-header-with-livestream";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeaderWithLivestream />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
             {children}
            </div>
        </main>
      </div>
  );
}
