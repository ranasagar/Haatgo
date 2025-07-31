
"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Order } from '@/lib/data';
import { initialOrders } from '@/lib/data';

type OrderContextType = {
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const getInitialState = (): Order[] => {
    if (typeof window === 'undefined') {
        return initialOrders;
    }
    try {
        const savedOrders = localStorage.getItem('haatgo-orders');
        return savedOrders ? JSON.parse(savedOrders) : initialOrders;
    } catch (error) {
        console.error("Failed to parse orders from localStorage", error);
        return initialOrders;
    }
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>(getInitialState);

    useEffect(() => {
        try {
            localStorage.setItem('haatgo-orders', JSON.stringify(orders));
        } catch (error) {
            console.error("Failed to save orders to localStorage", error);
        }
    }, [orders]);


    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    }
    
    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prevOrders => 
            prevOrders.map(o => o.id === orderId ? { ...o, status } : o)
        );
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};
