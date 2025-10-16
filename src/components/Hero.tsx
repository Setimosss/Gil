import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-fluid">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold italic leading-tight">
              <span className="block text-gradient">LEAVE YOUR MARK</span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-primary/50 rounded-full" />
          </div>
          
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transformamos ideias em experiências que marcam
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12">
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
