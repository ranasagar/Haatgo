
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Delivery } from '@/lib/data';
import { deliveries as initialDeliveries } from '@/lib/data';

type DeliveryContextType = {
    deliveries: Delivery[];
    setDeliveries: React.Dispatch<React.SetStateAction<Delivery[]>>;
};

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
    const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);

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
