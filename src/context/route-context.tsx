
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
    addRoute: (newRoute: Omit<Route, 'id'>) => void;
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
    {
        id: "2",
        name: "Pokhara Lakeside Loop",
        startLocation: "Pokhara Airport",
        endLocation: "Sarangkot",
        isRoundTrip: false,
        stops: [
            { name: "Pokhara Airport", date: "2024-08-01", time: "10:00 AM", passed: false, lat: 28.2009, lon: 83.9824 },
            { name: "Lakeside, Pokhara", date: "2024-08-01", time: "12:00 PM", passed: false, lat: 28.2163, lon: 83.9625 },
            { name: "Pame Bazar", date: "2024-08-01", time: "03:00 PM", passed: false, lat: 28.2381, lon: 83.9185 },
            { name: "Sarangkot", date: "2024-08-02", time: "09:00 AM", passed: false, lat: 28.2575, lon: 83.9547 },
        ],
        date: "2024-07-28",
    },
     {
        id: "3",
        name: "Terai Goods Run",
        startLocation: "Birgunj",
        endLocation: "Biratnagar",
        isRoundTrip: false,
        stops: [
            { name: "Birgunj", date: "2024-08-10", time: "08:00 AM", passed: false, lat: 27.0167, lon: 84.8667 },
            { name: "Hetauda", date: "2024-08-10", time: "11:00 AM", passed: false, lat: 27.4269, lon: 85.0334 },
            { name: "Bardibas", date: "2024-08-10", time: "02:00 PM", passed: false, lat: 26.9, lon: 85.8833 },
            { name: "Lahan", date: "2024-08-11", time: "09:30 AM", passed: false, lat: 26.7126, lon: 86.4839 },
            { name: "Biratnagar", date: "2024-08-11", time: "01:00 PM", passed: false, lat: 26.4525, lon: 87.2718 },
        ],
        date: "2024-07-29",
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
    
    const addRoute = (newRoute: Omit<Route, 'id'>) => {
        const routeWithId: Route = {
            ...newRoute,
            id: `route-${Date.now()}`
        };
        setRoutes(prevRoutes => [routeWithId, ...prevRoutes]);
    }

    return (
        <RouteContext.Provider value={{ routes, setRoutes, updateRoute, addRoute }}>
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
