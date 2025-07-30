
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

type AppSettings = {
    appName: string;
    whatsapp: string;
    viber: string;
    instagram: string;
    facebook: string;
};

type AppSettingsContextType = {
    settings: AppSettings;
    setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
};

const defaultSettings: AppSettings = {
    appName: 'HaatGo',
    whatsapp: '+9779800000000',
    viber: '+9779800000000',
    instagram: 'haatgo',
    facebook: 'haatgo'
};

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);

    return (
        <AppSettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </AppSettingsContext.Provider>
    );
};

export const useAppSettings = () => {
    const context = useContext(AppSettingsContext);
    if (context === undefined) {
        throw new Error('useAppSettings must be used within an AppSettingsProvider');
    }
    return context;
};
