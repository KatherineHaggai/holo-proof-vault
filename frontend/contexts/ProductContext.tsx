"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string; // Local UI ID
  onChainId?: number; // Blockchain product ID (0, 1, 2, etc.)
  name: string;
  price: string;
  image: string;
  verified: boolean;
  seller?: string;
  certificate?: string;
  isOnChain?: boolean; // True if product exists on blockchain
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  verifyProduct: (id: string) => void;
  clearProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with empty array to avoid hydration mismatch
  const [products, setProducts] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage only after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('proofchain-products');
        if (saved) {
          const parsed = JSON.parse(saved) as Product[];
          const migrated = parsed.map((p) => ({
            ...p,
            id: String(p.id),
            isOnChain: p.isOnChain ?? (p.onChainId !== undefined),
          }));
          const validProducts = migrated.filter((p: Product) => 
            p.name && p.price && p.image && p.image.startsWith('http')
          );
          setProducts(validProducts);
        }
      } catch (error) {
        console.error('Failed to load products from localStorage:', error);
        localStorage.removeItem('proofchain-products');
      }
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage when products change (only after hydration)
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('proofchain-products', JSON.stringify(products));
    }
  }, [products, isHydrated]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const verifyProduct = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, verified: true } : p))
    );
  };

  const clearProducts = () => {
    setProducts([]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, verifyProduct, clearProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};
