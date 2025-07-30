
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

export default function LivestreamPage() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleDeleteComment = (id: number) => {
    setComments(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
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
                Manage your livestream settings.
             </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Stream Title</Label>
              <Input id="title" placeholder="e.g., HaatGo Weekly Deals" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your livestream..." />
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
  );
}
