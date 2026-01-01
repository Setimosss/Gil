import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollAnimations";

const FAQ = () => {
  const faqs = [
    {
      question: "O que nos torna únicos?",
      answer: "Nós não criamos apenas projetos, criamos legados. Cada ideia é uma história que deixamos no mundo, com alma, paixão e a força de marcar para sempre."
    },
    {
      question: "Como trabalhamos?",
      answer: "Trabalhamos de forma colaborativa e estratégica, focando nas necessidades e objetivos de cada cliente. O nosso processo passa pela pesquisa, criatividade e planeamento, garantindo soluções personalizadas e impactantes. Da conceção à execução, acompanhamos cada etapa com rigor, sempre com o objetivo de superar expectativas e criar resultados duradouros, mantendo o contacto com o cliente ao longo do projeto."
    },
    {
      question: "Porque escolher-nos?",
      answer: "Transformamos a sua visão em algo inesquecível. Com criatividade, propósito, profissionalismo e paixão, deixamos uma marca verdadeira e duradoura no mundo. Juntos, vamos além da simples criação, vamos impactar e deixar uma boa marca no mundo!"
    },
    {
      question: "O que podes esperar de nós?",
      answer: "De nós, pode esperar excelência, inovação e comprometimento. Trabalhamos com foco em resultados, oferecendo soluções criativas e estratégicas que garantem um impacto duradouro. Cada projeto é tratado com atenção personalizada, buscando sempre superar as expectativas e entregar o melhor em cada detalhe."
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up">
          <div className="section-header text-center space-y-4 mb-16">
            <h2 className="text-5xl md:text-6xl font-bold font-heading">
              Perguntas <span className="text-gradient">Frequentes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos serviços e processos
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <StaggerContainer staggerDelay={0.12}>
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq, index) => (
                <StaggerItem key={index}>
                  <AccordionItem 
                    value={`item-${index}`}
                    className="card-glass rounded-2xl px-8 py-2 border border-primary/20 hover:border-primary/40 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left text-lg md:text-xl font-semibold hover:text-primary transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base md:text-lg pt-2 pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
