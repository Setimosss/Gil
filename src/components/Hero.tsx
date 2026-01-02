import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const textRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        const sectionHeight = sectionRef.current.offsetHeight;
        // Calculate progress from 0 to 1 as user scrolls through the hero section
        const progress = Math.min(scrollY / (sectionHeight * 0.5), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
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
                {/* Scroll-activated glow layer */}
                <span 
                  className="block text-gradient absolute inset-0 pointer-events-none transition-all duration-300"
                  style={{
                    opacity: scrollProgress,
                    textShadow: `0 0 ${20 + scrollProgress * 40}px hsl(var(--primary)), 0 0 ${40 + scrollProgress * 80}px hsl(var(--primary) / 0.6), 0 0 ${60 + scrollProgress * 100}px hsl(var(--primary) / 0.4)`,
                    filter: `brightness(${1 + scrollProgress * 0.5})`,
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

      {/* Pull cord / Light switch string */}
      <div className="absolute right-8 md:right-16 top-0 h-full flex flex-col items-center pointer-events-none z-20">
        {/* The cord line that extends as you scroll */}
        <div 
          className="w-[2px] transition-all duration-100 ease-out"
          style={{
            height: `${20 + scrollProgress * 35}%`,
            background: `linear-gradient(to bottom, transparent 0%, hsl(var(--primary) / ${0.3 + scrollProgress * 0.7}) 30%, hsl(var(--primary)) 100%)`,
            boxShadow: scrollProgress > 0.5 ? `0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)` : 'none',
          }}
        />
        {/* The pull handle / bulb */}
        <div 
          className="relative transition-all duration-300"
          style={{
            transform: `translateY(${scrollProgress * 20}px)`,
          }}
        >
          {/* Glow behind the bulb */}
          <div 
            className="absolute inset-0 rounded-full blur-md transition-opacity duration-300"
            style={{
              background: `hsl(var(--primary))`,
              opacity: scrollProgress * 0.8,
              transform: 'scale(2)',
            }}
          />
          {/* The bulb/handle */}
          <div 
            className="w-4 h-4 rounded-full border-2 relative transition-all duration-300"
            style={{
              borderColor: `hsl(var(--primary) / ${0.5 + scrollProgress * 0.5})`,
              background: scrollProgress > 0.8 
                ? `hsl(var(--primary))` 
                : `hsl(var(--primary) / ${scrollProgress * 0.5})`,
              boxShadow: scrollProgress > 0.5 
                ? `0 0 ${10 + scrollProgress * 20}px hsl(var(--primary)), 0 0 ${20 + scrollProgress * 30}px hsl(var(--primary) / 0.6)` 
                : 'none',
            }}
          />
        </div>
        {/* Small hint text */}
        <span 
          className="text-[10px] text-muted-foreground/50 mt-2 writing-mode-vertical transition-opacity duration-500"
          style={{
            writingMode: 'vertical-rl',
            opacity: 1 - scrollProgress,
          }}
        >
          scroll
        </span>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300"
        style={{ opacity: 1 - scrollProgress }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 animate-bounce">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
