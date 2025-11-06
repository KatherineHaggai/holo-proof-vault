"use client";

import { ProductCard } from "./ProductCard";
import { UploadProductDialog } from "./UploadProductDialog";
import { useProducts } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";

// Default products to show when no user products exist (demo only - not on blockchain)
const defaultProducts = [
  {
    id: "demo-1",
    name: "Premium Smart Watch",
    price: "0.45 ETH",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    verified: false,
    certificate: "cert_encrypted_a1b2c3d4e5f6",
    isOnChain: false,
  },
  {
    id: "demo-2",
    name: "Luxury Designer Handbag",
    price: "0.82 ETH",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    verified: false,
    certificate: "cert_verified_1a2b3c4d5e6f7g8h",
    isOnChain: false,
  },
  {
    id: "demo-3",
    name: "Wireless Headphones Pro",
    price: "0.28 ETH",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    verified: false,
    certificate: "cert_encrypted_9x8y7z6w5v",
    isOnChain: false,
  },
  {
    id: "demo-4",
    name: "Limited Edition Sneakers",
    price: "0.65 ETH",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    verified: false,
    certificate: "cert_encrypted_p9o8i7u6y5",
    isOnChain: false,
  },
];

export const ProductGrid = () => {
  const { products, clearProducts } = useProducts();
  const allProducts = products.length > 0 ? products : defaultProducts;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Authenticated Products</h2>
          <p className="text-muted-foreground">Each product is secured with blockchain verification and holographic seals</p>
        </div>
        <div className="flex items-center gap-3">
          <UploadProductDialog />
          {products.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearProducts}>
              Clear Local Products
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
