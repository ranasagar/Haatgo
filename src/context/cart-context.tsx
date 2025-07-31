
"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Product } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useOrders } from './order-context';
import { useProducts } from './product-context';
import { useAuth } from './auth-context';

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

const getInitialCart = (): CartItem[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const savedCart = localStorage.getItem('haatgo-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        return [];
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(getInitialCart);
    const { toast } = useToast();
    const { addOrder } = useOrders();
    const { products, updateProductQuantity } = useProducts();
    const { user } = useAuth();
    const [lastAction, setLastAction] = useState<{ name: string; payload?: any } | null>(null);

     useEffect(() => {
        try {
            localStorage.setItem('haatgo-cart', JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cart]);


    useEffect(() => {
        if (!lastAction) return;

        switch (lastAction.name) {
            case 'ADD_SUCCESS':
                toast({
                    title: "Added to Cart!",
                    description: `${lastAction.payload.name} has been added to your cart.`,
                });
                break;
            case 'ADD_FAIL_STOCK':
                 toast({
                    title: "Out of Stock",
                    description: "This product is currently unavailable.",
                    variant: "destructive",
                });
                break;
            case 'ADD_FAIL_LIMIT':
                toast({
                    title: "Stock Limit Reached",
                    description: `You cannot add more of ${lastAction.payload.name}.`,
                    variant: "destructive"
                });
                break;
            case 'REMOVE_SUCCESS':
                toast({
                    title: "Item Removed",
                    description: "The item has been removed from your cart.",
                });
                break;
            case 'UPDATE_FAIL_LIMIT':
                toast({
                    title: "Stock Limit Reached",
                    description: `Only ${lastAction.payload.quantity} of ${lastAction.payload.name} available.`,
                    variant: "destructive"
                });
                break;
            case 'CLEAR_SUCCESS':
                toast({
                    title: "Cart Cleared",
                    description: "All items have been removed from your cart.",
                });
                break;
            case 'CHECKOUT_SUCCESS':
                 toast({
                    title: "Order Placed!",
                    description: "Your order has been successfully placed and is now pending.",
                });
                break;
            case 'CHECKOUT_FAIL_LOGIN':
                toast({ title: "Please login to place an order.", variant: "destructive"});
                break;
            case 'CHECKOUT_FAIL_EMPTY':
                 toast({ title: "Your cart is empty.", variant: "destructive"});
                break;
        }
        setLastAction(null); // Reset action after showing toast
    }, [lastAction, toast]);

    const addToCart = (product: Product) => {
        const liveProduct = products.find(p => p.id === product.id);
        if (!liveProduct || liveProduct.quantity === 0) {
            setLastAction({ name: 'ADD_FAIL_STOCK' });
            return;
        }

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                if (existingItem.quantityInCart >= liveProduct.quantity) {
                    setLastAction({ name: 'ADD_FAIL_LIMIT', payload: product });
                    return prevCart;
                }
                const newCart = prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantityInCart: item.quantityInCart + 1 }
                        : item
                );
                setLastAction({ name: 'ADD_SUCCESS', payload: product });
                return newCart;
            }
            setLastAction({ name: 'ADD_SUCCESS', payload: product });
            return [...prevCart, { ...product, quantityInCart: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        setLastAction({ name: 'REMOVE_SUCCESS' });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        const liveProduct = products.find(p => p.id === productId);
        if (liveProduct && quantity > liveProduct.quantity) {
             setLastAction({ name: 'UPDATE_FAIL_LIMIT', payload: { name: liveProduct.name, quantity: liveProduct.quantity }});
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
        setLastAction({ name: 'CLEAR_SUCCESS' });
    }

    const getPrice = (item: CartItem) => {
        const isBulk = item.tags?.includes('Cheap in Bulk') && 
                       item.bulkQuantity && 
                       item.bulkPrice && 
                       item.quantityInCart >= item.bulkQuantity;
        
        if (isBulk && item.bulkPrice) {
            return item.bulkPrice;
        }
        
        const isOnSale = item.tags?.includes('On Sale');
        if (isOnSale) {
            return item.price * 0.85; // 15% discount
        }

        return item.price;
    }

    const checkout = () => {
        if (!user) {
            setLastAction({ name: 'CHECKOUT_FAIL_LOGIN' });
            return;
        }

        if (cart.length === 0) {
            setLastAction({ name: 'CHECKOUT_FAIL_EMPTY' });
            return;
        };

        cart.forEach(item => {
            const priceToUse = getPrice(item);
                
            const newOrder = {
                id: `#${Math.floor(Math.random() * 9000) + 1000}`,
                userId: user.uid,
                productId: item.id,
                productName: item.name,
                quantity: item.quantityInCart,
                district: item.district,
                status: 'Pending' as const,
                date: new Date().toISOString().split('T')[0],
                amount: priceToUse * item.quantityInCart
            };
            addOrder(newOrder);

            // Deduct from inventory
            updateProductQuantity(item.id, item.quantityInCart);
        });
        
        setCart([]); // Clear the cart after checkout
        setLastAction({ name: 'CHECKOUT_SUCCESS' });
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
