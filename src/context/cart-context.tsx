
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useOrders } from './order-context';
import { useProducts } from './product-context';

export type CartItem = Product & {
    quantityInCart: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    checkout: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { toast } = useToast();
    const { addOrder } = useOrders();
    const { products, updateProductQuantity } = useProducts();

    const addToCart = (product: Product) => {
        const liveProduct = products.find(p => p.id === product.id);
        if (!liveProduct || liveProduct.quantity === 0) {
             toast({
                title: "Out of Stock",
                description: "This product is currently unavailable.",
                variant: "destructive",
            });
            return;
        }

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                if (existingItem.quantityInCart >= liveProduct.quantity) {
                     toast({
                        title: "Stock Limit Reached",
                        description: `You cannot add more of ${product.name}.`,
                        variant: "destructive"
                    });
                    return prevCart;
                }
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantityInCart: item.quantityInCart + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantityInCart: 1 }];
        });
        toast({
            title: "Added to Cart!",
            description: `${product.name} has been added to your cart.`,
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        toast({
            title: "Item Removed",
            description: "The item has been removed from your cart.",
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        const liveProduct = products.find(p => p.id === productId);
        if (liveProduct && quantity > liveProduct.quantity) {
             toast({
                title: "Stock Limit Reached",
                description: `Only ${liveProduct.quantity} of ${liveProduct.name} available.`,
                variant: "destructive"
            });
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantityInCart: quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
         toast({
            title: "Cart Cleared",
            description: "All items have been removed from your cart.",
        });
    }

    const checkout = () => {
        if (cart.length === 0) {
            toast({ title: "Your cart is empty.", variant: "destructive"});
            return;
        };

        cart.forEach(item => {
            // Create a new order for each item
            const newOrder = {
                id: `#${Math.floor(Math.random() * 9000) + 1000}`,
                product: `${item.name} (x${item.quantityInCart})`,
                status: 'Pending' as const,
                date: new Date().toISOString().split('T')[0],
                amount: item.price * item.quantityInCart
            };
            addOrder(newOrder);

            // Deduct from inventory
            updateProductQuantity(item.id, item.quantityInCart);
        });
        
        setCart([]); // Clear the cart after checkout
        toast({
            title: "Order Placed!",
            description: "Your order has been successfully placed and is now pending.",
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
