import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Quais serviços vocês oferecem?",
      answer: "Oferecemos produção audiovisual, marketing digital, fotografia e design. Desde gravação e edição de vídeos até criação de conteúdo para redes sociais, sessões fotográficas e design de capas e flyers."
    },
    {
      question: "Quanto tempo demora um projeto?",
      answer: "O tempo varia conforme o projeto. Vídeos simples podem ficar prontos em 1-2 dias, enquanto projetos mais complexos podem levar uma semana ou mais. Sempre priorizamos qualidade e rapidez na entrega."
    },
    {
      question: "Como funciona o processo de orçamento?",
      answer: "Entre em contato conosco pelo WhatsApp ou e-mail com detalhes do seu projeto. Analisamos suas necessidades e enviamos um orçamento personalizado em até 24 horas."
    },
    {
      question: "Vocês trabalham com que tipo de clientes?",
      answer: "Trabalhamos com marcas, artistas, empresas e empreendedores que buscam destacar-se no mercado digital através de conteúdo de qualidade e estratégias eficazes."
    },
    {
      question: "Posso solicitar alterações no trabalho final?",
      answer: "Sim! Incluímos revisões no nosso processo para garantir que o resultado final esteja alinhado com suas expectativas e objetivos."
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="section-header space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold font-serif">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Tire suas dúvidas sobre nossos serviços e processos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
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
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
