
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useOrders } from './order-context';

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

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
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
        if (cart.length === 0) return;

        // For demo purposes, we'll just create a new order for the first item
        // In a real app, you would create orders for all items or a single order with multiple items
        const firstItem = cart[0];
        const newOrder = {
            id: `#${Math.floor(Math.random() * 9000) + 1000}`,
            product: `${firstItem.name} (x${firstItem.quantityInCart})`,
            status: 'Pending' as const,
            date: new Date().toISOString().split('T')[0],
            amount: firstItem.price * firstItem.quantityInCart
        };
        addOrder(newOrder);
        
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
