
"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type UserProfile = {
    address: string;
    lat: string;
    lon: string;
    whatsapp: string;
};

type UserProfileContextType = {
    profile: UserProfile;
    setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const defaultProfile: UserProfile = {
    address: '123 Main St, Kathmandu',
    lat: '27.7172',
    lon: '85.3240',
    whatsapp: '',
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);

    useEffect(() => {
        try {
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                setProfile(JSON.parse(savedProfile));
            }
        } catch (error) {
            console.error("Failed to parse userProfile from localStorage", error);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(profile));
    }, [profile]);


    return (
        <UserProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (context === undefined) {
        throw new Error('useUserProfile must be used within a UserProfileProvider');
    }
    return context;
};
