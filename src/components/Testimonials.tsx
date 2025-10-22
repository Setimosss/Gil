const Testimonials = () => {
  const testimonials = [
    {
      text: "O trabalho da Leaveyourmark ficou impecável, superou as expectativas! Muito profissional e perfeccionista, filmou tudo num dia e no dia seguinte ja estava o vídeo editado, muita rapidez na entrega🙏 Gostei muito e irei recomendar",
      name: "Ariana Nalha"
    },
    {
      text: "Acho que correu tudo super bem! Desde o contacto inicial ate ao combinado. O video está otimo, rápido e apanhou tudo o que era preciso, que é o que se quer para as redes sociais nos dias de hoje. Agradeço a disponibilidade e a simpatia",
      name: "Cris Neves"
    },
    {
      text: "Achei um excelente trabalho, como profissional deixou me super confortável, e a qualidade do trabalho superou as minhas expectativas, 10 em 10 👌",
      name: "Nails Butike"
    },
    {
      text: "Gostei muito do teu trabalho o vídeo e as fotos estão fantásticos parabéns. Senti que és dedicado e apaixonado pelo que fazes e isso vai se refletir no teu sucesso. Continuação de bom trabalho. Muito obrigado um abraço 🤗",
      name: "João Carreira"
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="section-header text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold font-heading">
            O Que Dizem <span className="text-gradient">Nossos Clientes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-glass p-8 rounded-2xl hover-lift space-y-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary text-4xl">"</div>
              <p className="text-muted-foreground leading-relaxed italic">
                {testimonial.text}
              </p>
              <div className="border-t border-primary/20 pt-4">
                <p className="font-bold text-primary">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
