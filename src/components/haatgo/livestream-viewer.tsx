
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Video, Wifi, WifiOff, Send, Trash2, Facebook, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LivestreamData } from '@/ai/flows/livestream-fetcher';
import { useAppSettings } from '@/context/app-settings-context';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

type Comment = {
  id: number;
  author: string;
  avatar: string;
  message: string;
};

const initialComments: Comment[] = [
    { id: 1, author: "Sunita Rai", avatar: "https://placehold.co/100x100.png", message: "यो ज्याकेट को कति पर्छ?" },
    { id: 2, author: "Ramesh Thapa", avatar: "https://placehold.co/100x100.png", message: "Can you show the red shawl again?" },
];

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 7.5a4.5 4.5 0 0 1-4.5 4.5H12v6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 4.5-4.5V7.5a4.5 4.5 0 1 1 9 0z"></path></svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);


export function LivestreamViewer({ isDialog = false, streamData }: { isDialog?: boolean; streamData?: LivestreamData | null }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const { settings } = useAppSettings();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  const isLive = streamData?.isLive || false;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({
            title: "Authentication Required",
            description: "You must be logged in to send a message.",
            variant: "destructive",
        });
        return;
    }
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: user.displayName || user.email || 'Anonymous',
        avatar: user.photoURL || "https://placehold.co/100x100.png",
        message: newComment,
      };
      setComments(prev => [...prev, newCommentObj]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (id: number) => {
    setComments(prev => prev.filter(c => c.id !== id));
  }
  
  const SocialLink = ({ platform, username }: { platform: 'facebook' | 'tiktok' | 'instagram', username: string }) => {
    const Icon = platform === 'facebook' ? Facebook : platform === 'instagram' ? InstagramIcon : TikTokIcon;
    const url = platform === 'facebook' ? `https://facebook.com/${username}` : platform === 'instagram' ? `https://instagram.com/${username}` : `https://tiktok.com/@${username}`;
    
    if (!username) return null;

    return (
        <Button asChild size="sm" variant="outline" className="bg-background/20 hover:bg-background/40 border-white/50 text-white">
            <Link href={url} target="_blank" rel="noopener noreferrer">
                <Icon className="h-4 w-4 mr-2" />
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Link>
        </Button>
    )
  }

  const VideoScreen = ({ isLive, streamData, platform }: {isLive: boolean, streamData: LivestreamData | null | undefined, platform: 'facebook' | 'tiktok'}) => (
     <div className="w-full h-full flex items-center justify-center text-center text-foreground p-4 rounded-lg relative overflow-hidden bg-black">
        {isLive ? (
            <Video className="h-24 w-24 text-primary/30" />
        ) : (
            <div className="text-center text-muted-foreground z-10">
                <WifiOff className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <p className="mt-2 font-semibold">{platform.charAt(0).toUpperCase() + platform.slice(1)} Livestream is Offline</p>
                <p className="text-sm">Check our page for updates.</p>
            </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="relative z-10 text-left">
                <p className="font-semibold text-white text-lg">
                    {isLive ? (streamData?.title || "Livestream is active.") : "Follow us for the next livestream!"}
                </p>
                <div className="mt-2 flex items-center gap-2">
                   <SocialLink platform="facebook" username={settings.facebook} />
                   <SocialLink platform="tiktok" username={settings.tiktok} />
                   <SocialLink platform="instagram" username={settings.instagram} />
                </div>
            </div>
        </div>
    </div>
  )
  
  const ChatBox = () => (
      <div className="lg:col-span-1 flex flex-col bg-background rounded-br-lg rounded-bl-lg lg:rounded-bl-none lg:rounded-tr-lg">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto pr-2 h-0">
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3 group">
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src={comment.avatar} alt={comment.author} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted/60 rounded-lg px-3 py-2 text-sm flex-grow">
                                <p className="font-semibold">{comment.author}</p>
                                <p>{comment.message}</p>
                            </div>
                            {isAdmin && (
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600" onClick={() => handleDeleteComment(comment.id)} aria-label="Delete comment">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="pt-4 border-t">
                <form onSubmit={handleCommentSubmit} className="flex w-full items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL || "https://placehold.co/100x100.png"} alt="Your avatar" />
                        <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'G'}</AvatarFallback>
                    </Avatar>
                    <Input 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder={user ? "Add a comment..." : "Log in to chat"}
                        disabled={!user}
                        className="flex-grow" />
                    <Button type="submit" size="icon" disabled={!newComment.trim() || !user}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
        </div>
  )

  const renderFacebookTab = () => (
    <div className="lg:col-span-2 bg-black flex items-center justify-center relative rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg">
        <Badge variant={isLive ? "default" : "destructive"} className={cn("transition-all absolute top-4 left-4 z-10", isLive ? "bg-green-600 hover:bg-green-700" : "")}>
            {isLive ? <Wifi className="h-4 w-4 mr-2" /> : <WifiOff className="h-4 w-4 mr-2" />}
            {isLive ? 'Online' : 'Offline'}
        </Badge>
        <VideoScreen isLive={isLive} streamData={streamData} platform="facebook" />
    </div>
  );

  const renderTikTokTab = () => (
     <div className="lg:col-span-2 bg-muted flex items-center justify-center relative rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg">
        <Badge variant={"destructive"} className="transition-all absolute top-4 left-4 z-10">
            <WifiOff className="h-4 w-4 mr-2" /> Offline
        </Badge>
         <VideoScreen isLive={false} streamData={null} platform="tiktok" />
    </div>
  );

  if (isDialog) {
    return (
      <Tabs defaultValue="facebook" className="h-[80vh] flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-shrink-0">
          <div className="lg:col-span-2 p-4 flex justify-center">
            <TabsList className="grid w-full max-w-xs grid-cols-2">
              <TabsTrigger value="facebook"><Facebook className="mr-2 h-4 w-4" /> Facebook</TabsTrigger>
              <TabsTrigger value="tiktok"><TikTokIcon className="mr-2 h-4 w-4" /> TikTok</TabsTrigger>
            </TabsList>
          </div>
          <div className="hidden lg:block"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 flex-grow min-h-0">
            <TabsContent value="facebook" className="lg:col-span-2 h-full m-0">
              {renderFacebookTab()}
            </TabsContent>
            <TabsContent value="tiktok" className="lg:col-span-2 h-full m-0">
              {renderTikTokTab()}
            </TabsContent>
            <ChatBox />
        </div>
      </Tabs>
    );
  }

  return (
     <Tabs defaultValue="facebook" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="shadow-lg rounded-xl lg:col-span-2 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-xl">
                        Live Broadcast
                    </CardTitle>
                    <TabsList className="grid w-full max-w-xs grid-cols-2">
                         <TabsTrigger value="facebook"><Facebook className="mr-2 h-4 w-4" /> Facebook</TabsTrigger>
                         <TabsTrigger value="tiktok"><TikTokIcon className="mr-2 h-4 w-4" /> TikTok</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                        <TabsContent value="facebook" className="w-full h-full m-0">
                           <div className="relative h-full w-full">
                                <Badge variant={isLive ? "default" : "destructive"} className={cn("transition-all absolute top-4 left-4 z-10", isLive ? "bg-green-600 hover:bg-green-700" : "")}>
                                    {isLive ? <Wifi className="h-4 w-4 mr-2" /> : <WifiOff className="h-4 w-4 mr-2" />}
                                    {isLive ? 'Online' : 'Offline'}
                                </Badge>
                                <VideoScreen isLive={isLive} streamData={streamData} platform="facebook" />
                           </div>
                        </TabsContent>
                        <TabsContent value="tiktok" className="w-full h-full m-0">
                           <div className="relative h-full w-full">
                                <Badge variant="destructive" className="transition-all absolute top-4 left-4 z-10">
                                    <WifiOff className="h-4 w-4 mr-2" /> Offline
                                </Badge>
                                <VideoScreen isLive={false} streamData={null} platform="tiktok" />
                           </div>
                        </TabsContent>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl flex flex-col">
                <CardHeader>
                <CardTitle className="font-headline text-xl">Live Chat</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto pr-2">
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3 group">
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src={comment.avatar} alt={comment.author} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted/60 rounded-lg px-3 py-2 text-sm flex-grow">
                                <p className="font-semibold">{comment.author}</p>
                                <p>{comment.message}</p>
                            </div>
                            {isAdmin && (
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600"
                                    onClick={() => handleDeleteComment(comment.id)}
                                    aria-label="Delete comment"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                    <form onSubmit={handleCommentSubmit} className="flex w-full items-center gap-2">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.photoURL || "https://placehold.co/100x100.png"} alt="Your avatar" />
                            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'G'}</AvatarFallback>
                        </Avatar>
                        <Input 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={user ? "Add a comment..." : "Log in to chat"}
                            disabled={!user}
                            className="flex-grow"
                        />
                        <Button type="submit" size="icon" disabled={!newComment.trim() || !user}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
     </Tabs>
  );
}
