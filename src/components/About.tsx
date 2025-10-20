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
              Na <span className="font-bold text-primary">LEAVE YOUR MARK</span> ajudamos marcas e artistas 
              a conquistarem relevância no mercado digital. Somos uma agência de marketing especializada em 
              estratégia, design e produção audiovisual, focada em criar experiências que geram impacto e resultados.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Mais do que comunicar, fazemos a tua marca destacar-se, crescer e deixar a sua marca.
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
