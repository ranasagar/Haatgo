
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video, ThumbsUp, MessageSquare, Share2, Facebook, Check, Trash2, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Comment = {
  id: number;
  author: string;
  avatar: string;
  message: string;
};

const initialComments: Comment[] = [
    { id: 1, author: "Sunita Rai", avatar: "https://placehold.co/100x100.png", message: "यो ज्याकेट को कति पर्छ?" },
    { id: 2, author: "Ramesh Thapa", avatar: "https://placehold.co/100x100.png", message: "Can you show the red shawl again?" },
    { id: 3, author: "Gita Gurung", avatar: "https://placehold.co/100x100.png", message: "Price for the solar lamp please." },
    { id: 4, author: "User123", avatar: "https://placehold.co/100x100.png", message: "This is spam." },
];

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 7.5a4.5 4.5 0 0 1-4.5 4.5H12v6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 4.5-4.5V7.5a4.5 4.5 0 1 1 9 0z"></path></svg>
);


export default function LivestreamPage() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleDeleteComment = (id: number) => {
    setComments(prev => prev.filter(c => c.id !== id));
  }

  return (
    <Tabs defaultValue="facebook" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facebook">
                <Facebook className="mr-2 h-4 w-4" /> Facebook
            </TabsTrigger>
            <TabsTrigger value="tiktok">
                <TikTokIcon className="mr-2 h-4 w-4" /> TikTok
            </TabsTrigger>
        </TabsList>
        <TabsContent value="facebook">
            <div className="grid gap-4 md:grid-cols-3 md:gap-8 mt-4">
                <div className="md:col-span-2 grid gap-4">
                    <Card>
                    <CardHeader>
                        <CardTitle>Facebook Livestream</CardTitle>
                        <CardDescription>
                        Your live video feed will appear here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                            <Video className="h-16 w-16 mx-auto" />
                            <p>Facebook Livestream Placeholder</p>
                        </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-center gap-4 border-t pt-4">
                        <Button variant="outline" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Like
                        </Button>
                        <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Comment
                        </Button>
                        <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield /> Comment Moderation
                            </CardTitle>
                            <CardDescription>
                                Review and manage comments from the livestream.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-72">
                                <div className="space-y-4">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border">
                                                <AvatarImage src={comment.avatar} alt={comment.author} />
                                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <p className="font-semibold text-sm">{comment.author}</p>
                                                <p className="text-sm text-muted-foreground">{comment.message}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700">
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={() => handleDeleteComment(comment.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1">
                    <Card>
                    <CardHeader>
                        <CardTitle>Stream Controls</CardTitle>
                        <CardDescription>
                            Manage your Facebook livestream settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                        <Label htmlFor="title-fb">Stream Title</Label>
                        <Input id="title-fb" placeholder="e.g., HaatGo Weekly Deals" />
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="description-fb">Description</Label>
                        <Textarea id="description-fb" placeholder="Describe your livestream..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="facebook-page">Facebook Page</Label>
                            <Input id="facebook-page" defaultValue="https://facebook.com/haatgo" readOnly />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button className="w-full">Go Live</Button>
                        <Button variant="outline" className="w-full">Schedule Stream</Button>
                        <Button variant="link" size="sm" asChild>
                            <a href="https://www.facebook.com/live/create" target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-4 w-4 mr-2" />
                                Advanced Facebook Settings
                            </a>
                        </Button>
                    </CardFooter>
                    </Card>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="tiktok">
             <div className="grid gap-4 md:grid-cols-3 md:gap-8 mt-4">
                <div className="md:col-span-2 grid gap-4">
                    <Card>
                    <CardHeader>
                        <CardTitle>TikTok Livestream</CardTitle>
                        <CardDescription>
                        Your TikTok live video feed will appear here when configured.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-[9/16] sm:aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                            <Video className="h-16 w-16 mx-auto" />
                            <p>TikTok Livestream Placeholder</p>
                        </div>
                        </div>
                    </CardContent>
                     <CardFooter className="flex items-center gap-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground">TikTok interactions will be shown here.</p>
                     </CardFooter>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield /> Comment Moderation
                            </CardTitle>
                            <CardDescription>
                                Review and manage comments from the TikTok livestream.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-72">
                                <div className="space-y-4">
                                     <p className="text-sm text-muted-foreground text-center py-10">Comments will appear here once you are live.</p>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1">
                    <Card>
                    <CardHeader>
                        <CardTitle>Stream Controls</CardTitle>
                        <CardDescription>
                            Manage your TikTok livestream settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                        <Label htmlFor="title-tiktok">Stream Title</Label>
                        <Input id="title-tiktok" placeholder="e.g., Flash Sale on TikTok!" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stream-key-tiktok">TikTok Stream Key</Label>
                            <Input id="stream-key-tiktok" type="password" placeholder="Paste your stream key here" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button className="w-full">Go Live on TikTok</Button>
                         <Button variant="link" size="sm" asChild>
                            <a href="https://www.tiktok.com/live/creators" target="_blank" rel="noopener noreferrer">
                                <TikTokIcon className="h-4 w-4 mr-2" />
                                Get Your TikTok Stream Key
                            </a>
                        </Button>
                    </CardFooter>
                    </Card>
                </div>
            </div>
        </TabsContent>
    </Tabs>
  );
}
