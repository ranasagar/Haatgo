
"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product } from '@/lib/data';
import { products as initialProducts } from '@/lib/data';

type ProductContextType = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    addProduct: (product: Omit<Product, 'id' | 'image' | 'dataAiHint'>) => void;
    updateProduct: (product: Product) => void;
    updateProductQuantity: (productId: string, quantityToSubtract: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const addProduct = (product: Omit<Product, 'id' | 'image' | 'dataAiHint'>) => {
        const newProduct: Product = {
            ...product,
            id: `prod-${Date.now()}`,
            image: 'https://storage.googleapis.com/haatgo-store-images/placeholder.png',
            dataAiHint: product.name.toLowerCase().split(' ').slice(0, 2).join(' '),
        };
        setProducts(prev => [newProduct, ...prev]);
    }

    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }

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
        <ProductContext.Provider value={{ products, setProducts, addProduct, updateProduct, updateProductQuantity }}>
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
