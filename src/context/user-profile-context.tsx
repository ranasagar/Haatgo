
"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type UserProfile = {
    address: string;
    lat: string;
    lon: string;
};

type UserProfileContextType = {
    profile: UserProfile;
    setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const defaultProfile: UserProfile = {
    address: '123 Main St, Kathmandu',
    lat: '27.7172',
    lon: '85.3240',
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile>(() => {
        if (typeof window !== 'undefined') {
            const savedProfile = localStorage.getItem('userProfile');
            return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
        }
        return defaultProfile;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userProfile', JSON.stringify(profile));
        }
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
