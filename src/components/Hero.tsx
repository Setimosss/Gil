import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightOn, setIsLightOn] = useState(false);
  const [cordWave, setCordWave] = useState<{x: number, y: number}[]>([]);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cordContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle cord hover for wave effect
  const handleCordHover = (e: React.MouseEvent) => {
    if (cordContainerRef.current) {
      const rect = cordContainerRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const x = e.clientX - rect.left;
      
      setCordWave(prev => {
        const newWave = [...prev, { x: x - rect.width / 2, y }];
        // Keep only last 5 wave points
        return newWave.slice(-5);
      });
    }
  };

  // Decay waves over time
  useEffect(() => {
    const interval = setInterval(() => {
      setCordWave(prev => prev.slice(1));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Toggle light on click
  const handleCordClick = () => {
    setIsLightOn(prev => !prev);
  };

  // Generate wavy path
  const generateWavyPath = () => {
    const height = 180;
    const segments = 20;
    const segmentHeight = height / segments;
    
    let path = `M 15 0`;
    
    for (let i = 0; i <= segments; i++) {
      const y = i * segmentHeight;
      
      // Check if there's a wave near this point
      const wave = cordWave.find(w => Math.abs(w.y - y) < 30);
      const waveOffset = wave ? (wave.x * 0.3) * Math.cos((y - wave.y) * 0.2) : 0;
      
      // Base gentle wave
      const baseWave = Math.sin(i * 0.8 + Date.now() * 0.002) * 2;
      
      const x = 15 + baseWave + waveOffset;
      
      if (i === 0) {
        path = `M ${x} ${y}`;
      } else {
        path += ` Q ${x + Math.sin(i) * 3} ${y - segmentHeight / 2}, ${x} ${y}`;
      }
    }
    
    return path;
  };

  const lightIntensity = isLightOn ? 1 : 0;

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

      {/* Pull cord / Light switch string - Wavy Interactive */}
      <div 
        ref={cordContainerRef}
        className="absolute right-8 md:right-16 top-0 z-20 cursor-pointer select-none"
        style={{ width: '30px', height: '220px' }}
        onMouseMove={handleCordHover}
        onClick={handleCordClick}
      >
        {/* SVG Wavy Cord */}
        <svg 
          width="30" 
          height="180" 
          className="overflow-visible"
          style={{ filter: isLightOn ? `drop-shadow(0 0 8px hsl(var(--primary)))` : 'none' }}
        >
          <defs>
            <linearGradient id="cordGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor={isLightOn ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.4)"} />
              <stop offset="100%" stopColor={isLightOn ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.6)"} />
            </linearGradient>
          </defs>
          <path 
            d={generateWavyPath()}
            fill="none"
            stroke="url(#cordGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-150"
          />
        </svg>
        
        {/* The pull handle / bulb */}
        <div 
          className="relative flex flex-col items-center"
          style={{ marginTop: '-2px', marginLeft: '4px' }}
        >
          {/* Glow behind the bulb */}
          <div 
            className="absolute rounded-full blur-md transition-all duration-500"
            style={{
              width: '20px',
              height: '20px',
              background: `hsl(var(--primary))`,
              opacity: isLightOn ? 0.8 : 0,
              transform: 'scale(2)',
            }}
          />
          {/* The bulb/handle */}
          <div 
            className="w-5 h-5 rounded-full border-2 relative transition-all duration-300 hover:scale-110"
            style={{
              borderColor: isLightOn ? `hsl(var(--primary))` : `hsl(var(--muted-foreground) / 0.5)`,
              background: isLightOn 
                ? `hsl(var(--primary))` 
                : `hsl(var(--muted-foreground) / 0.2)`,
              boxShadow: isLightOn 
                ? `0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary) / 0.6)` 
                : 'none',
            }}
          />
          {/* Small hint text */}
          <span 
            className="text-[10px] text-muted-foreground/50 mt-3 transition-opacity duration-500 whitespace-nowrap"
          >
            {isLightOn ? 'clica ↑' : 'clica ↓'}
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