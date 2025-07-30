
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video, ThumbsUp, MessageSquare, Share2, Facebook } from "lucide-react";

export default function LivestreamPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Facebook Livestream</CardTitle>
            <CardDescription>
              Your live video feed will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              {/* Facebook Embedded Player would go here */}
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
