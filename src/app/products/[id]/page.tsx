
"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import { useProducts } from "@/context/product-context"
import { useCart } from "@/context/cart-context"
import { useReviews } from "@/context/review-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Upload, X } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Breadcrumbs, type BreadcrumbItem } from "@/components/haatgo/breadcrumbs"

function StarRating({ rating, setRating, interactive = false }: { rating: number; setRating?: (rating: number) => void; interactive?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-5 w-5",
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground",
            interactive && "cursor-pointer"
          )}
          onClick={() => interactive && setRating?.(star)}
        />
      ))}
    </div>
  )
}

function ReviewForm({ productId }: { productId: string }) {
    const { user } = useAuth();
    const { addReview } = useReviews();
    const { toast } = useToast();
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newImages: string[] = [];
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result as string);
                    if(newImages.length === files.length) {
                        setImages(prev => [...prev, ...newImages].slice(0, 3)); // Limit to 3 images
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    }

    const handleSubmit = () => {
        if (!user) {
            toast({ title: "Please login to write a review.", variant: "destructive" });
            return;
        }
        if (rating === 0 || text.trim() === "") {
            toast({ title: "Please provide a rating and a review text.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);
        addReview({
            id: `review-${Date.now()}`,
            productId,
            userId: user.uid,
            userName: user.displayName || user.email || "Anonymous",
            userAvatar: user.photoURL || "",
            rating,
            text,
            images,
            date: new Date().toISOString().split('T')[0]
        });

        setTimeout(() => {
            toast({ title: "Review submitted!", description: "Thank you for your feedback." });
            setRating(0);
            setText("");
            setImages([]);
            setIsSubmitting(false);
        }, 500);
    }

    if (!user) {
        return <p className="text-muted-foreground">You must be logged in to write a review.</p>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Write a review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Your Rating</Label>
                    <StarRating rating={rating} setRating={setRating} interactive />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="review-text">Your Review</Label>
                    <Textarea id="review-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="What did you like or dislike?" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="review-images">Add Photos (optional, up to 3)</Label>
                    <Input id="review-images" type="file" multiple accept="image/*" onChange={handleImageUpload} className="file:text-primary file:font-semibold" />
                    {images.length > 0 && (
                        <div className="flex gap-2 mt-2">
                            {images.map((img, index) => (
                                <div key={index} className="relative">
                                    <Image src={img} alt={`Review image ${index + 1}`} width={80} height={80} className="rounded-md object-cover h-20 w-20" />
                                    <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => removeImage(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const { reviews } = useReviews()

  const product = products.find(p => p.id === id)
  const productReviews = reviews.filter(r => r.productId === id);

  const averageRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 0;

  if (!product) {
    return notFound()
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/" }, // Assuming the main product browser is on the home page
    { label: product.name, href: `/products/${product.id}` },
  ];

  const getStockBadge = () => {
    if (product.quantity === 0) {
      return <Badge variant="destructive">Sold Out</Badge>;
    }
    if (product.quantity <= 10) {
      return <Badge variant="secondary" className="bg-yellow-400 text-yellow-900">Low Stock</Badge>;
    }
    return <Badge variant="secondary" className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
                <div className="p-4">
                     <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={600}
                        className={cn("object-cover w-full h-auto aspect-square rounded-lg shadow-lg", {"grayscale": product.quantity === 0})}
                        data-ai-hint={product.dataAiHint}
                    />
                </div>
                <div className="p-4 flex flex-col h-full">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-bold font-headline">{product.name}</h1>
                            {getStockBadge()}
                        </div>
                        <div className="flex items-center gap-2">
                           <StarRating rating={averageRating} />
                           <span className="text-muted-foreground text-sm">({productReviews.length} reviews)</span>
                        </div>
                         <p className="text-sm text-muted-foreground">{product.category}</p>
                         <p className="text-foreground/80 text-base leading-relaxed">{product.description}</p>
                    </div>
                    
                    <div className="flex-grow" />

                    <div className="mt-6">
                       <p className="font-bold text-primary text-4xl mb-4">
                        रू {product.price.toLocaleString()}
                        <span className="text-lg font-medium text-muted-foreground"> / {product.measurement}</span>
                       </p>
                       <Button 
                         size="lg" 
                         className="w-full font-bold"
                         onClick={() => addToCart(product)} 
                         disabled={product.quantity === 0}
                       >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {product.quantity === 0 ? "Sold Out" : "Add to cart"}
                       </Button>
                       {product.quantity > 0 && <p className="text-sm text-center text-muted-foreground mt-2">{product.quantity} pieces remaining</p>}
                    </div>
                </div>
            </div>
        </Card>

        <section id="reviews" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
               <CardDescription>
                See what others are saying about {product.name}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {productReviews.length > 0 ? (
                    productReviews.map((review, index) => (
                        <div key={review.id} className="grid gap-4">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={review.userAvatar || `https://placehold.co/100x100.png`} />
                                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-2 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">{review.userName}</p>
                                        <span className="text-sm text-muted-foreground">{review.date}</span>
                                    </div>
                                    <StarRating rating={review.rating} />
                                    <p className="text-sm text-foreground/90">{review.text}</p>
                                    {review.images && review.images.length > 0 && (
                                        <div className="flex gap-2 mt-2">
                                            {review.images.map((img, i) => (
                                                <Image key={i} src={img} alt={`Review photo ${i+1}`} width={100} height={100} className="rounded-md object-cover h-24 w-24" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {index < productReviews.length - 1 && <Separator />}
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-4">No reviews yet. Be the first to write one!</p>
                )}
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
            <ReviewForm productId={product.id} />
        </section>
      </main>
    </div>
  )
}
