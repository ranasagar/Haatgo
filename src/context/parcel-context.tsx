
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Parcel } from '@/lib/data';
import { parcels as initialParcels } from '@/lib/data';

type NewParcel = Omit<Parcel, 'id' | 'status'>;

type ParcelContextType = {
    parcels: Parcel[];
    setParcels: React.Dispatch<React.SetStateAction<Parcel[]>>;
    addParcel: (parcel: NewParcel) => void;
};

const ParcelContext = createContext<ParcelContextType | undefined>(undefined);

export const ParcelProvider = ({ children }: { children: ReactNode }) => {
    const [parcels, setParcels] = useState<Parcel[]>(initialParcels);
    
    const addParcel = (parcel: NewParcel) => {
        const newParcelWithId: Parcel = {
            ...parcel,
            id: `P${parcels.length + 2}`,
            status: 'Pending'
        };
        setParcels(prev => [...prev, newParcelWithId]);
    }

    return (
        <ParcelContext.Provider value={{ parcels, setParcels, addParcel }}>
            {children}
        </ParcelContext.Provider>
    );
};

export const useParcels = () => {
    const context = useContext(ParcelContext);
    if (context === undefined) {
        throw new Error('useParcels must be used within a ParcelProvider');
    }
    return context;
};
