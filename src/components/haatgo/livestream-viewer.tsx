
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Video, Wifi, WifiOff, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

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

export function LivestreamViewer() {
  const [isLive, setIsLive] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: "You",
        avatar: "https://placehold.co/100x100",
        message: newComment,
      };
      setComments(prev => [...prev, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <Card className="shadow-lg rounded-xl lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-xl">
            Live Broadcast
          </CardTitle>
          <Badge variant={isLive ? "default" : "destructive"} className={cn("transition-all", isLive ? "bg-green-600 hover:bg-green-700" : "")}>
            {isLive ? <Wifi className="h-4 w-4 mr-2" /> : <WifiOff className="h-4 w-4 mr-2" />}
            {isLive ? 'Online' : 'Offline'}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            {isLive ? (
              <div className="text-center text-muted-foreground">
                <Video className="h-16 w-16 mx-auto text-primary" />
                <p>Livestream is active.</p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Video className="h-16 w-16 mx-auto" />
                <p>Livestream is currently offline.</p>
              </div>
            )}
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
                <div key={comment.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted/60 rounded-lg px-3 py-2 text-sm">
                        <p className="font-semibold">{comment.author}</p>
                        <p>{comment.message}</p>
                    </div>
                </div>
              ))}
           </div>
        </CardContent>
        <CardFooter className="pt-4 border-t">
            <form onSubmit={handleCommentSubmit} className="flex w-full items-center gap-2">
                 <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100" alt="Your avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..." 
                    className="flex-grow"
                />
                <Button type="submit" size="icon" disabled={!newComment.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </CardFooter>
      </Card>
    </div>
  );
}
