
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppSettings } from "@/context/app-settings-context"

// NOTE: Using inline SVGs for brand icons to ensure consistent styling.
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
);
const ViberIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7.5 7.5C4.03 9.25 2.25 12.97 3.5 16.5c1.25 3.53 5 4.75 8.5 3.5s4.75-5 3.5-8.5c-.25-.69-.58-1.32-1-1.89" /><path d="m14 11.5 3 2.5" /><path d="M14.5 18.5c.31.25.65.45.91.7.39.38.61.94.61 1.55A2.32 2.32 0 0 1 14 23a2.32 2.32 0 0 1-2-2.25c0-.61.22-1.17.61-1.55" /><path d="M18.89 12.11c.31-.25.65-.45.91-.7.39-.38.61-.94.61-1.55A2.32 2.32 0 0 0 18.5 8a2.32 2.32 0 0 0-2 2.25c0 .61.22 1.17.61 1.55" /><path d="M14.5 5.5a2.32 2.32 0 0 0-2-2.25 2.32 2.32 0 0 0-2 2.25c0 .61.22 1.17.61 1.55a2.12 2.12 0 0 0 2.78 0c.31-.25.65-.45.91-.7" /></svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
)
const FacebookMessengerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /><path d="m9.5 12.5 4-3" /><path d="m13.5 9.5-4 3" /></svg>
);


export function FloatingChatButtons() {
    const [isOpen, setIsOpen] = useState(false);
    const { settings } = useAppSettings();

    const chatLinks = [
        { id: 'whatsapp', href: `https://wa.me/${settings.whatsapp.replace(/\+/g, '')}`, label: 'Chat on WhatsApp', icon: WhatsAppIcon, color: "bg-[#25D366] hover:bg-[#128C7E]" },
        { id: 'viber', href: `viber://chat?number=%2B${settings.viber.replace(/\+/g, '')}`, label: 'Chat on Viber', icon: ViberIcon, color: "bg-[#7360F2] hover:bg-[#5f48ea]" },
        { id: 'instagram', href: `https://ig.me/m/${settings.instagram}`, label: 'Message on Instagram', icon: InstagramIcon, color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90" },
        { id: 'facebook', href: `https://m.me/${settings.facebook}`, label: 'Message on Messenger', icon: FacebookMessengerIcon, color: "bg-[#00B2FF] hover:bg-[#0084ff]" },
    ].filter(link => {
        if (!settings[link.id as keyof typeof settings]) return false;
        return true;
    });


    return (
        <TooltipProvider>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
                <div className={cn("flex flex-col items-center gap-3 transition-all duration-300", isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}>
                    {chatLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                             <Tooltip key={link.id}>
                                <TooltipTrigger asChild>
                                    <Button asChild size="icon" className={cn("rounded-full h-12 w-12 text-white", link.color)}>
                                       <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                                         <Icon className="h-6 w-6" />
                                       </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                    <p>{link.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                </div>
                
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"
                            className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                        >
                           {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>{isOpen ? "Close" : "Contact Us"}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    )
}
