
"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './auth-context';

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Customer';
    status: 'Active' | 'Inactive';
    lastLogin: string;
};

type NewUser = Omit<User, 'id' | 'status' | 'lastLogin'>;

type UserContextType = {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    addUser: (user: NewUser) => void;
    updateUser: (user: User) => void;
};

const initialUsers: User[] = [
    { id: 'user-2', name: 'Ramesh Thapa', email: 'ramesh.thapa@example.com', role: 'Customer', status: 'Active', lastLogin: '2024-07-28' },
    { id: 'user-3', name: 'Gita Gurung', email: 'gita.gurung@example.com', role: 'Customer', status: 'Inactive', lastLogin: '2024-07-20' },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { user: authUser, isAdmin } = useAuth();
    const [users, setUsers] = useState<User[]>(initialUsers);

    useEffect(() => {
        // Add the logged-in admin user to the list if they are not already there
        if (authUser && isAdmin && !users.some(u => u.id === authUser.uid)) {
            const adminUser: User = {
                id: authUser.uid,
                name: authUser.displayName || 'Admin User',
                email: authUser.email || 'admin@example.com',
                role: 'Admin',
                status: 'Active',
                lastLogin: new Date().toISOString().split('T')[0]
            };
            setUsers(prev => [adminUser, ...prev]);
        }
    }, [authUser, isAdmin, users]);


    const addUser = (user: NewUser) => {
        const newUser: User = {
            ...user,
            id: `user-${Date.now()}`,
            status: 'Active',
            lastLogin: new Date().toISOString().split('T')[0]
        };
        setUsers(prev => [newUser, ...prev]);
    };

    const updateUser = (updatedUser: User) => {
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    return (
        <UserContext.Provider value={{ users, setUsers, addUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};
