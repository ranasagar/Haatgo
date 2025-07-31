
"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Delivery } from '@/lib/data';
import { deliveries as initialDeliveries } from '@/lib/data';

type DeliveryContextType = {
    deliveries: Delivery[];
    setDeliveries: React.Dispatch<React.SetStateAction<Delivery[]>>;
};

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

const getInitialDeliveries = (): Delivery[] => {
    if (typeof window === "undefined") {
        return initialDeliveries;
    }
    try {
        const saved = localStorage.getItem('haatgo-deliveries');
        return saved ? JSON.parse(saved) : initialDeliveries;
    } catch (error) {
        console.error("Failed to parse deliveries from localStorage", error);
        return initialDeliveries;
    }
};


export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
    const [deliveries, setDeliveries] = useState<Delivery[]>(getInitialDeliveries);

     useEffect(() => {
        try {
            localStorage.setItem('haatgo-deliveries', JSON.stringify(deliveries));
        } catch (error) {
            console.error("Failed to save deliveries to localStorage", error);
        }
    }, [deliveries]);

    return (
        <DeliveryContext.Provider value={{ deliveries, setDeliveries }}>
            {children}
        </DeliveryContext.Provider>
    );
};

export const useDeliveries = () => {
    const context = useContext(DeliveryContext);
    if (context === undefined) {
        throw new Error('useDeliveries must be used within a DeliveryProvider');
    }
    return context;
};
