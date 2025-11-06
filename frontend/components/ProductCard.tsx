"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock } from "lucide-react";
import { Product } from "@/contexts/ProductContext";
import { ProductDetailDialog } from "./ProductDetailDialog";

export const ProductCard = ({ id, name, price, image, verified, seller, certificate, isOnChain, onChainId }: Product) => {
  const [detailOpen, setDetailOpen] = useState(false);
  // Mark first product image with priority for LCP optimization
  const isPriorityImage = id === "demo-3" || id === "demo-1";

  return (
    <>
      <Card 
        className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 backdrop-blur-sm bg-card/80 cursor-pointer"
        onClick={() => setDetailOpen(true)}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
            priority={isPriorityImage}
          />
          {!verified && (
            <div className="absolute top-4 right-4 holographic-seal w-16 h-16 rounded-full flex items-center justify-center">
              <Lock className="h-6 w-6 text-background" />
            </div>
          )}
          {verified && (
            <div className="absolute top-4 right-4 bg-primary rounded-full w-16 h-16 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground">{name}</h3>
            <p className="text-2xl font-bold text-primary">{price}</p>
          </div>
          
          <div className="flex flex-col gap-2">
            {verified ? (
              <Badge variant="default" className="gap-1 w-fit">
                <ShieldCheck className="h-3 w-3" />
                Verified On-Chain
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1 w-fit">
                <Lock className="h-3 w-3" />
                Encrypted Certificate
              </Badge>
            )}
            
            {!isOnChain && (
              <Badge variant="outline" className="gap-1 w-fit text-xs text-muted-foreground">
                Demo Product
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
      
      <ProductDetailDialog 
        product={{ id, name, price, image, verified, seller, certificate, isOnChain, onChainId }}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
};
