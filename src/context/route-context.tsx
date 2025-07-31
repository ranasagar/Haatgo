
"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type RouteStop = {
    name: string;
    date: string;
    time: string;
    passed: boolean;
    lat: number;
    lon: number;
};

export type Route = {
    id: string;
    name: string;
    startLocation: string;
    endLocation: string;
    isRoundTrip: boolean;
    stops: RouteStop[];
    date: string; // The creation date of the route
};

type RouteContextType = {
    routes: Route[];
    setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
    updateRoute: (updatedRoute: Route) => void;
};

const initialRoutes: Route[] = [
    {
        id: "1",
        name: "Chisapani - Sankhejung",
        startLocation: "Chisapani Market",
        endLocation: "Chisapani Market",
        isRoundTrip: true,
        stops: [
            { name: "Chisapani Market", date: "2024-07-25", time: "09:00 AM", passed: true, lat: 26.9833, lon: 87.1333 },
            { name: "Bhedetar Junction", date: "2024-07-25", time: "11:30 AM", passed: false, lat: 26.9167, lon: 87.3167 },
            { name: "Sankhejung Village", date: "2024-07-25", time: "02:00 PM", passed: false, lat: 27.0194, lon: 87.8044 },
            { name: "Bhedetar Junction", date: "2024-07-26", time: "10:00 AM", passed: false, lat: 26.9167, lon: 87.3167 },
            { name: "Chisapani Market", date: "2024-07-26", time: "12:30 PM", passed: false, lat: 26.9833, lon: 87.1333 },
        ],
        date: "2024-07-25",
    },
];

const RouteContext = createContext<RouteContextType | undefined>(undefined);

const getInitialRoutes = (): Route[] => {
    if (typeof window === "undefined") {
        return initialRoutes;
    }
    try {
        const savedRoutes = localStorage.getItem('haatgo-routes');
        return savedRoutes ? JSON.parse(savedRoutes) : initialRoutes;
    } catch (error) {
        console.error("Failed to parse routes from localStorage", error);
        return initialRoutes;
    }
};

export const RouteProvider = ({ children }: { children: ReactNode }) => {
    const [routes, setRoutes] = useState<Route[]>(getInitialRoutes);
    
    useEffect(() => {
        try {
            localStorage.setItem('haatgo-routes', JSON.stringify(routes));
        } catch (error) {
            console.error("Failed to save routes to localStorage", error);
        }
    }, [routes]);

    const updateRoute = (updatedRoute: Route) => {
        setRoutes(prevRoutes => prevRoutes.map(r => r.id === updatedRoute.id ? updatedRoute : r));
    }

    return (
        <RouteContext.Provider value={{ routes, setRoutes, updateRoute }}>
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
