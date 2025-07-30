
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product } from '@/lib/data';
import { products as initialProducts } from '@/lib/data';

type ProductContextType = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    updateProductQuantity: (productId: string, quantityToSubtract: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const updateProductQuantity = (productId: string, quantityToSubtract: number) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId
                    ? { ...p, quantity: p.quantity - quantityToSubtract }
                    : p
            )
        );
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, updateProductQuantity }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
