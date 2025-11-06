"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const connector = connectors[0]; // Use first available connector (MetaMask)
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 holographic-seal rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-background">P</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">ProofChain Market</h1>
            <p className="text-xs text-muted-foreground">Blockchain Authentication</p>
          </div>
        </div>
        
        {isConnected ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <Button variant="outline" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </div>
        ) : (
          <Button onClick={handleConnect} className="gap-2">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};
