import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { ScrollReveal, ScaleReveal } from "./ScrollAnimations";

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="section-header max-w-4xl mx-auto text-center space-y-8">
          <ScrollReveal direction="up">
            <h2 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
              Pronto para começar?{" "}
              <span className="block mt-2 text-gradient">
                Agende uma reunião
              </span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              As tuas ideias merecem mais do que execução, merecem significado. 
              Junta-te a nós e vamos criar algo que deixe realmente uma marca.
            </p>
          </ScrollReveal>

          <ScaleReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-lg px-8 py-6 glow"
                asChild
              >
                <a href="https://wa.me/351935442979" target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2" />
                  Contacte-nos
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </ScaleReveal>
        </div>
      </div>
    </section>
  );
};

export default CTA;
