
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Order } from '@/lib/data';
import { initialOrders } from '@/lib/data';

type OrderContextType = {
    orders: Order[];
    addOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
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
