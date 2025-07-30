
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Review = {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    text: string;
    images?: string[];
    date: string;
};

type NewReview = Omit<Review, 'id'>;

type ReviewContextType = {
    reviews: Review[];
    addReview: (review: Review) => void;
};

const initialReviews: Review[] = [
    {
        id: 'review-1',
        productId: '1',
        userId: 'user1',
        userName: 'Sunita Rai',
        userAvatar: 'https://placehold.co/100x100.png',
        rating: 5,
        text: "This Basmati rice is of the highest quality! The grains are long and fragrant, perfect for making biryani. It cooks up fluffy and delicious every time. Highly recommended.",
        images: ['https://placehold.co/400x300.png'],
        date: "2024-07-20"
    },
    {
        id: 'review-2',
        productId: '3',
        userId: 'user2',
        userName: 'Ramesh Thapa',
        userAvatar: 'https://placehold.co/100x100.png',
        rating: 4,
        text: "Very cozy jacket. It's not the thickest, but it's perfect for a chilly evening in Nepal. The fleece is soft and comfortable. Good value for the price.",
        images: [],
        date: "2024-07-18"
    }
];

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);

    const addReview = (review: Review) => {
        setReviews(prev => [review, ...prev]);
    }

    return (
        <ReviewContext.Provider value={{ reviews, addReview }}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviews = () => {
    const context = useContext(ReviewContext);
    if (context === undefined) {
        throw new Error('useReviews must be used within a ReviewProvider');
    }
    return context;
};
