
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Stop = {
    name: string;
    eta: string;
    passed?: boolean;
};

export type RouteStop = Stop & {
    lat: number;
    lon: number;
};

export type Route = {
    id: string;
    name: string;
    stops: RouteStop[];
    date: string;
};

type RouteContextType = {
    routes: Route[];
    setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
};

const initialRoutes: Route[] = [
    {
        id: "1",
        name: "Chisapani - Sankhejung",
        stops: [
            { name: "Chisapani Market", passed: true, eta: "09:00 AM", lat: 26.9833, lon: 87.1333 },
            { name: "Bhedetar Junction", passed: false, eta: "11:30 AM", lat: 26.9167, lon: 87.3167 },
            { name: "Sankhejung Village", passed: false, eta: "02:00 PM", lat: 27.0194, lon: 87.8044 },
        ],
        date: "2024-07-25",
    },
];

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
    const [routes, setRoutes] = useState<Route[]>(initialRoutes);

    return (
        <RouteContext.Provider value={{ routes, setRoutes }}>
            {children}
        </RouteContext.Provider>
    );
};

export const useRoutes = () => {
    const context = useContext(RouteContext);
    if (context === undefined) {
        throw new Error('useRoutes must be used within a RouteProvider');
    }
    return context;
};
