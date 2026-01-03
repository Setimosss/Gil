import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightOn, setIsLightOn] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cordContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const hasToggled = useRef(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    hasToggled.current = false;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX - dragPos.x, y: clientY - dragPos.y };
    e.preventDefault();
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Allow free movement in X (-60 to 60) and Y (0 to 100)
    const newX = Math.max(-60, Math.min(60, clientX - startPos.current.x));
    const newY = Math.max(0, Math.min(100, clientY - startPos.current.y));
    
    setDragPos({ x: newX, y: newY });
    
    // Toggle when pulled down past threshold
    if (newY >= 80 && !hasToggled.current) {
      hasToggled.current = true;
      setIsLightOn(prev => !prev);
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    // Animate back to center smoothly
    setDragPos({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  // Generate fluid path that follows the handle position
  const generateFluidPath = () => {
    const baseHeight = 160;
    const endX = 20 + dragPos.x;
    const endY = baseHeight + dragPos.y;
    
    // Create smooth curve from top to handle position
    // The cord should curve naturally based on handle position
    const tension = 0.4;
    const midY = endY * 0.5;
    
    // Control points create a natural hanging rope effect
    const cp1x = 20 + dragPos.x * 0.2;
    const cp1y = endY * 0.25;
    const cp2x = 20 + dragPos.x * 0.5;
    const cp2y = endY * 0.5;
    const cp3x = endX - dragPos.x * 0.1;
    const cp3y = endY * 0.75;
    
    return `
      M 20 0
      C ${cp1x} ${cp1y}, 
        ${cp2x} ${cp2y}, 
        ${20 + dragPos.x * 0.6} ${midY}
      S ${cp3x} ${cp3y}, 
        ${endX} ${endY}
    `;
  };

  const lightIntensity = isLightOn ? 1 : 0;
  const cordHeight = 280 + dragPos.y;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 
                ref={textRef}
                onMouseMove={handleMouseMove}
                className="text-6xl md:text-8xl lg:text-9xl font-semibold font-serif italic leading-tight relative cursor-default select-none"
              >
                {/* Base text - muted color */}
                <span className="block text-muted-foreground/30">LEAVE YOUR MARK</span>
                {/* Revealed text - follows cursor with radial gradient mask */}
                <span 
                  className="block text-gradient absolute inset-0 pointer-events-none"
                  style={{
                    maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                  }}
                >
                  LEAVE YOUR MARK
                </span>
                {/* Light switch activated glow layer */}
                <span 
                  className="block text-gradient absolute inset-0 pointer-events-none transition-all duration-500"
                  style={{
                    opacity: lightIntensity,
                    textShadow: `0 0 ${20 + lightIntensity * 40}px hsl(var(--primary)), 0 0 ${40 + lightIntensity * 80}px hsl(var(--primary) / 0.6), 0 0 ${60 + lightIntensity * 100}px hsl(var(--primary) / 0.4)`,
                    filter: `brightness(${1 + lightIntensity * 0.5})`,
                  }}
                >
                  LEAVE YOUR MARK
                </span>
              </h1>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-primary/50 rounded-full" />
            </div>
            
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              "Transformamos ideias em experiências que marcam"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 text-lg px-8 py-6 glow">
                Começe Agora
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6"
                asChild
              >
                <a href="https://www.instagram.com/leaveyourmark.pt/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pull cord - Fluid interactive rope */}
      <div 
        ref={cordContainerRef}
        className="absolute right-8 md:right-16 top-0 z-20 select-none pointer-events-none"
        style={{ width: '140px', height: `${cordHeight}px`, marginLeft: '-50px' }}
      >
        <svg 
          width="140" 
          height={cordHeight}
          className="overflow-visible"
          style={{ 
            filter: isLightOn ? `drop-shadow(0 0 8px hsl(var(--primary)))` : 'none',
            transition: 'filter 0.5s ease'
          }}
        >
          <defs>
            <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="10%" stopColor={isLightOn ? "hsl(262, 83%, 58%)" : "hsl(0, 0%, 55%)"} stopOpacity="0.5" />
              <stop offset="100%" stopColor={isLightOn ? "hsl(262, 83%, 58%)" : "hsl(0, 0%, 65%)"} />
            </linearGradient>
          </defs>
          <path 
            d={generateFluidPath()}
            fill="none"
            stroke="url(#ropeGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ 
              transition: isDragging.current ? 'none' : 'd 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />
        </svg>
        
        {/* Pull handle - follows drag position */}
        <div 
          className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
          style={{ 
            left: `${20 + dragPos.x}px`, 
            top: `${160 + dragPos.y - 10}px`,
            transition: isDragging.current ? 'none' : 'left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => !isDragging.current && setIsHovering(false)}
        >
          {/* Glow */}
          <div 
            className="absolute rounded-full blur-lg transition-all duration-500"
            style={{
              width: '24px',
              height: '24px',
              background: `hsl(var(--primary))`,
              opacity: isLightOn ? 0.7 : 0,
              transform: 'translate(-2px, -2px) scale(1.5)',
            }}
          />
          {/* Handle ball */}
          <div 
            className="w-5 h-5 rounded-full transition-all duration-300"
            style={{
              background: isLightOn 
                ? `radial-gradient(circle at 30% 30%, hsl(262, 83%, 70%), hsl(262, 83%, 50%))` 
                : `radial-gradient(circle at 30% 30%, hsl(0, 0%, 75%), hsl(0, 0%, 50%))`,
              boxShadow: isLightOn 
                ? `0 0 15px hsl(var(--primary)), 0 2px 4px rgba(0,0,0,0.3)` 
                : `0 2px 4px rgba(0,0,0,0.3)`,
              transform: isHovering ? 'scale(1.2)' : 'scale(1)',
            }}
          />
          {/* Hint */}
          <span 
            className="absolute left-1/2 -translate-x-1/2 mt-2 text-[10px] text-muted-foreground/60 whitespace-nowrap transition-opacity duration-300"
            style={{ opacity: dragPos.y > 10 || dragPos.x !== 0 ? 0 : 1 }}
          >
            puxa ↓
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;