
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Settings, Palette, Map, Package, Clapperboard, Wallet, KeyRound, Truck, Users } from "lucide-react";

export default function SetupGuidePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText />
          Setup Guide
        </CardTitle>
        <CardDescription>
          Follow these steps to configure and start using your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          
          <AccordionItem value="item-0">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <KeyRound className="h-5 w-5 text-primary" />
                <span>Step 1: Configure Firebase for Authentication</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
              <p className="text-muted-foreground mb-2">
                This application uses Firebase for user authentication. You must configure it first by adding your credentials to the `.env` file.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to the <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a> and create a new project (or use an existing one).</li>
                <li>In your project, go to <span className="font-bold">Project Settings</span> (click the gear icon) and scroll down to "Your apps".</li>
                <li>Add a new <span className="font-bold">Web App</span> if you don't have one. Give it a nickname and register the app.</li>
                <li>After registration, Firebase will show you a configuration object. It looks like `const firebaseConfig = { ... }`.</li>
                <li>Open the <code className="bg-muted px-1 rounded-sm">.env</code> file in this project.</li>
                <li>Copy the values from the `firebaseConfig` object into the corresponding `NEXT_PUBLIC_FIREBASE_*` variables in the `.env` file.</li>
                <li>Set the <code className="bg-muted px-1 rounded-sm">NEXT_PUBLIC_ADMIN_EMAIL</code> variable to the email address you want to use as the administrator.</li>
                <li>In the Firebase Console, navigate to <span className="font-bold">Authentication</span> under the "Build" section in the left menu.</li>
                <li>Go to the "Sign-in method" tab and enable the <span className="font-bold">Email/Password</span> provider.</li>
                <li>Your app is now ready for user registration and login!</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                <span>Step 2: Configure Basic Settings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
              <p className="text-muted-foreground mb-2">
                Start by personalizing your application.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Navigate to the <code className="bg-muted px-1 rounded-sm">Settings</code> page from the sidebar.</li>
                <li>Enter your desired <strong>Application Name</strong>. This will be shown to customers.</li>
                <li>Upload your <strong>Application Logo</strong> to replace the default icon.</li>
                <li>Fill in your contact details for <strong>WhatsApp, Viber, Instagram, and Facebook</strong>. This will activate the floating chat buttons for your customers.</li>
                <li>Click <strong>Save Changes</strong>.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span>Step 3: Manage Users</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
              <p className="text-muted-foreground mb-2">
                Control who has access to your application.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Navigate to the <code className="bg-muted px-1 rounded-sm">Users</code> page from the sidebar.</li>
                <li>You will see a list of all users, including the admin account you logged in with.</li>
                <li>Click <strong>Add User</strong> to create a new user account. You can assign them a 'Customer' or 'Admin' role.</li>
                <li>Use the actions menu on each row to edit user details, activate/deactivate their account, or delete them.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <span>Step 4: Add Your Products</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
              <p className="text-muted-foreground mb-2">
                Populate your store with products that you want to sell.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to the <code className="bg-muted px-1 rounded-sm">Products</code> page.</li>
                <li>Click the <strong>Add Product</strong> button.</li>
                <li>Fill in the product's name, price, description, and <strong>cost</strong>. The cost is used for profit tracking in the Accounting section.</li>
                <li>Click <strong>Save changes</strong>. Repeat for all your products.</li>
                <li>You can also edit or delete existing products from the list.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <Map className="h-5 w-5 text-primary" />
                <span>Step 5: Create a Seller Route</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
              <p className="text-muted-foreground mb-2">
                Define the route your seller will take. This will be displayed on the customer-facing map.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to the <code className="bg-muted px-1 rounded-sm">Routes</code> page.</li>
                <li>Click <strong>Add Route</strong>.</li>
                <li>Give the route a descriptive name (e.g., "East Nepal Circuit").</li>
                <li>Add each stop your seller will make. You can add more stops as needed.</li>
                <li>Click <strong>Save Route</strong>.</li>
                <li>Once a route is active, you can click "Manage Route" to mark stops as passed, which updates the customer view in real-time.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <span>Step 6: Manage Deliveries</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
              <p className="text-muted-foreground mb-2">
                Track and update the status of your customer deliveries.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Navigate to the <code className="bg-muted px-1 rounded-sm">Deliveries</code> page.</li>
                <li>View all your active deliveries on the map.</li>
                <li>The table lists all deliveries with their status.</li>
                <li>Use the actions menu on each row to update a delivery's status from "Pending" to "Out for Delivery" or "Completed".</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
                <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span>Step 7: Review Your Finances</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
                <p className="text-muted-foreground mb-2">
                    Keep track of your business's financial health.
                </p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Navigate to the <code className="bg-muted px-1 rounded-sm">Accounting</code> page.</li>
                    <li>View your total revenue, costs, and gross profit at a glance.</li>
                    <li>Analyze the sales overview chart to understand performance over time.</li>
                    <li>Click <strong>Add Transaction</strong> to manually record sales or expenses that happen outside of product sales (e.g., fuel costs, supplier payments).</li>
                    <li>Review the list of recent transactions for a detailed record of all financial activities.</li>
                </ol>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <Clapperboard className="h-5 w-5 text-primary" />
                <span>Step 8: Start a Livestream</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
              <p className="text-muted-foreground mb-2">
                Engage with your customers through a Facebook Live session.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to the <code className="bg-muted px-1 rounded-sm">Livestream</code> page.</li>
                <li>Enter a <strong>Stream Title</strong> and <strong>Description</strong>.</li>
                <li>Click the link to <strong>Advanced Facebook Settings</strong> to get your stream key from Facebook.</li>
                <li>Input your stream key (in a real-world scenario) and click <strong>Go Live</strong>.</li>
                <li>Your video feed will appear, and you can moderate comments directly from the "Comment Moderation" panel.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-primary" />
                <span>Customization and Further Steps</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-8">
              <p className="text-muted-foreground">
                The application is built with developers in mind. The codebase uses Next.js, Tailwind CSS, and ShadCN UI, making it highly customizable. You can modify the theme, add new components, and extend functionality by editing the source code. The AI features are powered by Google's Genkit and can be adapted to new use cases.
              </p>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
  );
}

