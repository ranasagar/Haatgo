
"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Parcel } from '@/lib/data';
import { parcels as initialParcels } from '@/lib/data';

type NewParcel = Omit<Parcel, 'id' | 'status'>;

type ParcelContextType = {
    parcels: Parcel[];
    setParcels: React.Dispatch<React.SetStateAction<Parcel[]>>;
    addParcel: (parcel: NewParcel) => void;
};

const ParcelContext = createContext<ParcelContextType | undefined>(undefined);

const getInitialParcels = (): Parcel[] => {
    if (typeof window === "undefined") {
        return initialParcels;
    }
    try {
        const saved = localStorage.getItem('haatgo-parcels');
        return saved ? JSON.parse(saved) : initialParcels;
    } catch (error) {
        console.error("Failed to parse parcels from localStorage", error);
        return initialParcels;
    }
};

export const ParcelProvider = ({ children }: { children: ReactNode }) => {
    const [parcels, setParcels] = useState<Parcel[]>(getInitialParcels);

    useEffect(() => {
        try {
            localStorage.setItem('haatgo-parcels', JSON.stringify(parcels));
        } catch (error) {
            console.error("Failed to save parcels to localStorage", error);
        }
    }, [parcels]);
    
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
