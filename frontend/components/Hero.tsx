export const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background"></div>
      
      {/* Animated holographic orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 holographic-seal rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 holographic-seal rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Authenticity, Unlocked by You.
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Verify product authenticity through blockchain signatures. Decrypt certificates with Rainbow Wallet and unlock the truth behind every product.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            Encrypted Certificates
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            On-Chain Verification
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            Holographic Seals
          </div>
        </div>
      </div>
    </section>
  );
};
