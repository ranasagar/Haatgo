
"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LoadingAnimation } from '@/components/haatgo/loading-animation';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    login: (email: string, pass: string) => Promise<any>;
    signup: (email: string, pass: string) => Promise<any>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const adminEmails = ["sagarrana@gmail.com", "admin@example.com"];
            setUser(user);
            setIsAdmin(!!user && !!user.email && adminEmails.includes(user.email.trim()));
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
            setIsAdmin(false);
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
        Cookies.remove('firebaseIdToken');
        router.push('/login');
    };
    
    const resetPassword = (email: string) => {
        if (!auth) return Promise.reject(new Error("Firebase not configured. Please check your .env file."));
        return sendPasswordResetEmail(auth, email);
    }

    const value = {
        user,
        loading,
        isAdmin,
        login,
        signup,
        logout,
        resetPassword,
    };

    // To prevent hydration mismatch, we render children immediately.
    // The `loading` state can be used by child components to show their own loading UI.
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
