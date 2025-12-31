import quemImage from "@/assets/quem.jpeg";

const About = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-overlay" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-header text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold font-heading">
            Quem <span className="text-gradient">Somos</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Na <span className="font-bold text-primary">Leave Your Mark</span>, acreditamos que cada marca 
              tem uma história que merece ser contada de forma autêntica, estratégica e memorável.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Somos uma agência de marketing e produção audiovisual que transforma ideias em experiências 
              visuais e estratégias que geram impacto, crescimento e relevância no mercado digital.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Trabalhamos com artistas, marcas, empresas e negócios locais que procuram destacar-se num 
              mercado cada vez mais competitivo.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Combinamos estratégia, design e produção audiovisual para construir presenças fortes, 
              identidades marcantes e resultados consistentes.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed font-semibold">
              Mais do que comunicar, ajudamos-te a deixar a tua marca.
            </p>
          </div>

          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
            <img 
              src={quemImage} 
              alt="Leave Your Mark" 
              className="relative rounded-2xl w-full h-auto shadow-2xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
