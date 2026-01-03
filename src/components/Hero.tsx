import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightOn, setIsLightOn] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
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

  // Smooth wave animation when hovering
  useEffect(() => {
    if (!isHovering && !isDragging.current) return;
    
    const animate = () => {
      setWaveOffset(prev => prev + 0.15);
    };
    
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [isHovering]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    hasToggled.current = false;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startY.current = clientY - pullY;
    e.preventDefault();
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newPullY = Math.max(0, Math.min(80, clientY - startY.current));
    setPullY(newPullY);
    
    // Toggle when pulled past threshold
    if (newPullY >= 70 && !hasToggled.current) {
      hasToggled.current = true;
      setIsLightOn(prev => !prev);
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    // Animate back smoothly
    setPullY(0);
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

  // Generate smooth cubic bezier path for the cord
  const generateSmoothPath = () => {
    const baseHeight = 160 + pullY;
    const waveAmplitude = isHovering || isDragging.current ? 8 : 3;
    
    // Control points for smooth cubic bezier curve
    const wave1 = Math.sin(waveOffset) * waveAmplitude;
    const wave2 = Math.sin(waveOffset + 1.5) * waveAmplitude;
    const wave3 = Math.sin(waveOffset + 3) * waveAmplitude;
    const wave4 = Math.sin(waveOffset + 4.5) * waveAmplitude;
    
    // Smooth cubic bezier path
    return `
      M 20 0
      C ${20 + wave1} ${baseHeight * 0.2}, 
        ${20 + wave2} ${baseHeight * 0.35}, 
        ${20 + wave2 * 0.8} ${baseHeight * 0.45}
      S ${20 + wave3} ${baseHeight * 0.7}, 
        ${20 + wave3 * 0.5} ${baseHeight * 0.8}
      S ${20 + wave4 * 0.3} ${baseHeight * 0.95}, 
        20 ${baseHeight}
    `;
  };

  const lightIntensity = isLightOn ? 1 : 0;
  const cordHeight = 200 + pullY;

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

      {/* Pull cord - Smooth fluid rope */}
      <div 
        className="absolute right-8 md:right-16 top-0 z-20 select-none"
        style={{ width: '40px', height: `${cordHeight}px` }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => !isDragging.current && setIsHovering(false)}
      >
        <svg 
          width="40" 
          height={cordHeight}
          className="overflow-visible"
          style={{ 
            filter: isLightOn ? `drop-shadow(0 0 6px hsl(var(--primary)))` : 'none',
            transition: 'filter 0.5s ease'
          }}
        >
          <defs>
            <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="15%" stopColor={isLightOn ? "hsl(262, 83%, 58%)" : "hsl(0, 0%, 50%)"} stopOpacity="0.6" />
              <stop offset="100%" stopColor={isLightOn ? "hsl(262, 83%, 58%)" : "hsl(0, 0%, 60%)"} />
            </linearGradient>
          </defs>
          <path 
            d={generateSmoothPath()}
            fill="none"
            stroke="url(#ropeGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke-width 0.2s ease' }}
          />
        </svg>
        
        {/* Pull handle */}
        <div 
          className="absolute cursor-grab active:cursor-grabbing"
          style={{ 
            left: '50%', 
            transform: 'translateX(-50%)',
            top: `${160 + pullY - 10}px`,
            transition: pullY === 0 ? 'top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Glow */}
          <div 
            className="absolute inset-0 rounded-full blur-lg transition-all duration-500"
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
            className="w-5 h-5 rounded-full transition-all duration-300 hover:scale-125"
            style={{
              background: isLightOn 
                ? `radial-gradient(circle at 30% 30%, hsl(262, 83%, 70%), hsl(262, 83%, 50%))` 
                : `radial-gradient(circle at 30% 30%, hsl(0, 0%, 70%), hsl(0, 0%, 45%))`,
              boxShadow: isLightOn 
                ? `0 0 15px hsl(var(--primary)), 0 2px 4px rgba(0,0,0,0.3)` 
                : `0 2px 4px rgba(0,0,0,0.3)`,
            }}
          />
          {/* Hint */}
          <span 
            className="absolute left-1/2 -translate-x-1/2 mt-2 text-[10px] text-muted-foreground/60 whitespace-nowrap transition-opacity duration-300"
            style={{ opacity: pullY > 10 ? 0 : 1 }}
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