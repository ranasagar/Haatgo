
"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<any>;
    signup: (email: string, pass: string) => Promise<any>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const token = await user.getIdToken();
                Cookies.set('firebaseIdToken', token, { expires: 1 }); // expires in 1 day
            } else {
                Cookies.remove('firebaseIdToken');
            }
            setLoading(false);
        }, (error) => {
            console.error("Auth state change error:", error);
            setUser(null);
            Cookies.remove('firebaseIdToken');
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email: string, pass: string) => {
        if (!auth) return Promise.reject(new Error("Firebase not configured. Please check your .env file."));
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const signup = (email: string, pass: string) => {
        if (!auth) return Promise.reject(new Error("Firebase not configured. Please check your .env file."));
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const logout = async () => {
        if (!auth) {
            console.error("Firebase not configured.");
            return;
        };
        await firebaseSignOut(auth);
        router.push('/login');
    };
    
    const resetPassword = (email: string) => {
        if (!auth) return Promise.reject(new Error("Firebase not configured. Please check your .env file."));
        return sendPasswordResetEmail(auth, email);
    }

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        resetPassword,
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
