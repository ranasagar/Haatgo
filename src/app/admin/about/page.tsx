
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clapperboard, Map, Package, ShoppingCart, Sparkles, MessageSquare, Wallet, Users, Truck, Send } from "lucide-react";

const features = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "User Authentication",
    description: "Secure login and registration system for users, powered by Firebase Authentication for robust security and ease of use."
  },
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: "Product Management",
    description: "Easily add, edit, and manage all your products from a centralized dashboard. Keep track of inventory, pricing, and costs with a simple interface."
  },
  {
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    title: "Order Management",
    description: "View and process customer orders efficiently. Track order statuses from 'Pending' to 'Fulfilled' and manage sales performance."
  },
  {
    icon: <Wallet className="h-6 w-6 text-primary" />,
    title: "Accounting",
    description: "Get a clear overview of your financials. Track total revenue, costs, and profits, and visualize sales trends with built-in charts."
  },
  {
    icon: <Map className="h-6 w-6 text-primary" />,
    title: "Dynamic Route Tracking",
    description: "Create and manage seller routes with multiple stops. Customers can track the seller's progress in real-time on an interactive map."
  },
  {
    icon: <Clapperboard className="h-6 w-6 text-primary" />,
    title: "Facebook Livestreaming",
    description: "Engage with your audience through live video. Go live directly from the admin panel and moderate comments in real-time."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "AI-Powered Recommendations",
    description: "Leverage generative AI to provide personalized product recommendations to users based on their browsing history and past purchases."
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "Direct Customer Communication",
    description: "Connect with customers instantly via floating chat buttons for WhatsApp, Viber, Instagram, and Facebook Messenger, all configured from your settings."
  }
];

export default function AboutPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>About HaatGo</CardTitle>
          <CardDescription>
            A traveling digital marketplace for Nepal, designed to bring local commerce to the digital age.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            HaatGo is a modern, all-in-one solution for sellers on the move. It combines the power of e-commerce, live streaming, and real-time logistics to create a seamless shopping experience. Our platform is built on a robust, modern tech stack to ensure reliability and performance.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Breakdown: Delivery vs. Parcel</CardTitle>
          <CardDescription>Understanding the two main logistics features of the application.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                    <Truck className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Deliveries (B2C)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    This feature handles the delivery of **products sold from your store** to a customer's specific home address. It's a classic Business-to-Consumer model.
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Purpose:</strong> Fulfill customer orders.</li>
                    <li><strong>Origin:</strong> Your inventory.</li>
                    <li><strong>Destination:</strong> Customer's home address.</li>
                </ul>
            </div>
             <div className="flex flex-col gap-2 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                    <Send className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Parcels (C2C)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    This feature provides a **courier service** for your users. They can send their own personal packages from one of your designated route stops to another.
                </p>
                 <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Purpose:</strong> User-to-user package sending.</li>
                    <li><strong>Origin:</strong> A predefined route stop.</li>
                    <li><strong>Destination:</strong> Another predefined route stop.</li>
                </ul>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>The modern technologies powering this application.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /><strong>Next.js & React:</strong> For a fast, server-rendered user interface.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /><strong>Firebase:</strong> For reliable and secure user authentication and data storage.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /><strong>Tailwind CSS & ShadCN UI:</strong> For a beautiful, responsive, and customizable design system.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /><strong>Genkit (Google AI):</strong> For cutting-edge generative AI features like product recommendations.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /><strong>TypeScript:</strong> For robust, type-safe code that prevents errors.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
