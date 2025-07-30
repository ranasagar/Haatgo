
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Video, Wifi, WifiOff, Send, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

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

export function LivestreamViewer({ isDialog = false }: { isDialog?: boolean }) {
  const [isLive, setIsLive] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isAdmin, setIsAdmin] = useState(true); // For demo: toggle to show/hide moderation

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
        avatar: "https://placehold.co/100x100.png",
        message: newComment,
      };
      setComments(prev => [...prev, newCommentObj]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (id: number) => {
    setComments(prev => prev.filter(c => c.id !== id));
  }

  if (isDialog) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[80vh]">
            <div className="lg:col-span-2 bg-muted flex items-center justify-center relative rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg">
                <Badge variant={isLive ? "default" : "destructive"} className={cn("transition-all absolute top-4 left-4 z-10", isLive ? "bg-green-600 hover:bg-green-700" : "")}>
                    {isLive ? <Wifi className="h-4 w-4 mr-2" /> : <WifiOff className="h-4 w-4 mr-2" />}
                    {isLive ? 'Online' : 'Offline'}
                </Badge>
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
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Your avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." className="flex-grow" />
                        <Button type="submit" size="icon" disabled={!newComment.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </div>
        </div>
    );
  }

  // Original component rendering for non-dialog use (e.g. if you wanted it on another page)
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
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Your avatar" />
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
