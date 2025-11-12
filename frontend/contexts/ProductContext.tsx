"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  certificateHash: string;
  seller: string;
  timestamp: number;
  isOnChain?: boolean;
  onChainId?: number;
  isVerified?: boolean;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "timestamp">) => void;
  verifyProduct: (productId: number, txHash?: string) => void;
  removeProduct: (productId: number) => void;
  updateProduct: (productId: number, updates: Partial<Product>) => void;
  clearProducts: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addProduct = useCallback((product: Omit<Product, "id" | "timestamp">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      timestamp: Math.floor(Date.now() / 1000),
    };
    setProducts(prev => [...prev, newProduct]);
    toast.success("Product added successfully!");
  }, []);

  const verifyProduct = useCallback((productId: number, txHash?: string) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isVerified: true }
          : product
      )
    );
    if (txHash) {
      toast.success(`Product verified! Transaction: ${txHash.slice(0, 10)}...`);
    }
  }, []);

  const removeProduct = useCallback((productId: number) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    toast.success("Product removed");
  }, []);

  const updateProduct = useCallback((productId: number, updates: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, ...updates }
          : product
      )
    );
  }, []);

  const clearProducts = useCallback(() => {
    setProducts([]);
    toast.success("All products cleared");
  }, []);

  const value: ProductContextType = {
    products,
    addProduct,
    verifyProduct,
    removeProduct,
    updateProduct,
    clearProducts,
    isLoading,
    setIsLoading,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
