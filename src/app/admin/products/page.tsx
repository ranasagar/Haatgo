
"use client";
import * as React from "react";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/lib/data";
import { useProducts } from "@/context/product-context";
import { cn } from "@/lib/utils";

const defaultNewProduct: Product = {
  id: '',
  name: "New Product",
  price: 0,
  cost: 0,
  quantity: 10,
  measurement: 'piece',
  status: 'active',
  district: "Kathmandu",
  description: "",
  image: 'https://storage.googleapis.com/haatgo-store-images/placeholder.png',
  dataAiHint: ''
};

export default function ProductsPage() {
  const { products, setProducts } = useProducts();
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product>(defaultNewProduct);

  const openAddDialog = () => {
    setIsEditing(false);
    setSelectedProduct(defaultNewProduct);
    setOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setOpen(true);
  };
  
  const handleSave = () => {
    if (isEditing) {
      setProducts(prevProducts => prevProducts.map(p => p.id === selectedProduct.id ? selectedProduct : p));
    } else {
      const newProductWithId: Product = {
        ...selectedProduct,
        id: `prod-${Date.now()}`,
        image: "https://storage.googleapis.com/haatgo-store-images/placeholder.png",
        dataAiHint: selectedProduct.name.toLowerCase().split(' ').slice(0, 2).join(' '),
      };
      setProducts(prevProducts => [...prevProducts, newProductWithId]);
    }
    setOpen(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setSelectedProduct(prev => ({
        ...prev,
        [id]: id === 'price' || id === 'cost' || id === 'quantity' ? parseFloat(value) || 0 : value
    }));
  }

  const toggleProductStatus = (productId: string) => {
    setProducts(prevProducts => prevProducts.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'archived' : 'active' } 
        : p
    ));
  };

  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Archived
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={openAddDialog}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Cost
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Inventory
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.image}
                          width="64"
                          data-ai-hint={product.dataAiHint}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'} className={cn({
                          'bg-green-600 hover:bg-green-700': product.status === 'active',
                        })}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        रू{product.price.toFixed(2)}
                      </TableCell>
                       <TableCell className="hidden md:table-cell">
                        रू{product.cost.toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.quantity > 0 ? `${product.quantity} in stock` : 'Sold out'}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openEditDialog(product)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleProductStatus(product.id)}>
                              {product.status === 'active' ? 'Archive' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{products.length}</strong> of <strong>{products.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update the details of your product.' : "Add a new product to your store. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={selectedProduct.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input id="price" type="number" value={selectedProduct.price} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">
                  Cost
                </Label>
                <Input id="cost" type="number" value={selectedProduct.cost} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Inventory
                </Label>
                <Input id="quantity" type="number" value={selectedProduct.quantity} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="measurement" className="text-right">
                  Measurement
                </Label>
                <Input id="measurement" value={selectedProduct.measurement} onChange={handleInputChange} placeholder="e.g., kg, piece, L" className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" value={selectedProduct.description || ''} onChange={handleInputChange} placeholder="Product description" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
}
