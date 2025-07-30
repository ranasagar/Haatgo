
"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageSquare } from "lucide-react"

// NOTE: Using inline SVGs as lucide-react doesn't have brand icons.
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);
const ViberIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M14.43,2.5l-2.07,7.21c-.23,.79-.8,1.35-1.59,1.59l-7.21,2.07c-1.03,.3-1.3,1.55-.4,2.23l.89,.68c.24,.18,.54,.28,.84,.28h0c1.3,0,2.54-.51,3.47-1.44l5.3-5.3c2.02-2.02,2.02-5.3,0-7.32l-.68-.89c-.68-.89-1.93-1.19-2.23,.4Z M14.3,13.82l-5.3,5.3c-.94,.94-2.17,1.44-3.47,1.44h0c-.3,0-.6-.09-.84-.28l-.89-.68c-.89-.68-.63-1.93,.4-2.23l7.21-2.07c.79-.23,1.35-.8,1.59-1.59l2.07-7.21c.3-1.03,1.55-1.3,2.23-.4l.89,.68c2.02,2.02,2.02,5.3,0,7.32l-.68,.89c-.11,.14-.24,.27-.38,.38Z" /></svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
)

const FacebookMessengerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.64-.1 2.42-.29.43-.11.63-.59.4-.99l-1.9-3.23c-.23-.39-.75-.54-1.18-.33a7.05 7.05 0 0 1-7.74-7.74c0-3.32 2.31-6.14 5.43-6.84.4-.09.79.16.88.55l.89 3.86c.09.39-.16.79-.55.88a3.1 3.1 0 0 0-2.45 2.45c-.09.4-.49.64-.88.55l-3.86-.89c-.4-.09-.64-.49-.55-.88C4.14 8.31 6.96 6 10.28 6c3.89 0 7.06 3.17 7.06 7.06a7.05 7.05 0 0 1-3.32 5.95c-.39.23-.54.75-.33 1.18l3.23 1.9c.4.23.99.03.99-.4A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10z"></path></svg>
)


// In a real app, these would come from a database, managed in the admin panel.
const chatLinks = {
    whatsapp: 'https://wa.me/9779800000000',
    viber: 'viber://chat?number=%2B9779800000000',
    instagram: 'https://ig.me/m/haatgo',
    facebook: 'https://m.me/haatgo'
}

export function FloatingChatButtons() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild size="icon" className="rounded-full h-12 w-12 bg-[#25D366] hover:bg-[#128C7E] text-white">
                           <a href={chatLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                             <WhatsAppIcon className="h-6 w-6" />
                           </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>Chat on WhatsApp</p>
                    </TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild size="icon" className="rounded-full h-12 w-12 bg-[#7360F2] hover:bg-[#5f48ea] text-white">
                            <a href={chatLinks.viber} target="_blank" rel="noopener noreferrer">
                                <ViberIcon className="h-6 w-6" />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>Chat on Viber</p>
                    </TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild size="icon" className="rounded-full h-12 w-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-90 text-white">
                           <a href={chatLinks.instagram} target="_blank" rel="noopener noreferrer">
                             <InstagramIcon className="h-6 w-6" />
                           </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>Message on Instagram</p>
                    </TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild size="icon" className="rounded-full h-12 w-12 bg-[#00B2FF] hover:bg-[#0084ff] text-white">
                           <a href={chatLinks.facebook} target="_blank" rel="noopener noreferrer">
                             <FacebookMessengerIcon className="h-6 w-6" />
                           </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>Message on Messenger</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
