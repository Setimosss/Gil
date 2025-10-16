const Services = () => {
  const services = [
    {
      emoji: "🎬",
      title: "Produção Audiovisual",
      items: ["Gravação de Vídeos", "Edição do Vídeo"]
    },
    {
      emoji: "📱",
      title: "Marketing Digital",
      items: ["Criação de Vídeos Publicitários", "Gestão de Redes Sociais"]
    },
    {
      emoji: "📸",
      title: "Fotografia",
      items: ["Sessões Fotográficas", "Fotografia de Eventos"]
    },
    {
      emoji: "🎨",
      title: "Design",
      items: ["Capas para Músicas", "Criação de Flyers"]
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="section-header text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold">
            Nossos <span className="text-gradient">Serviços</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group card-glass p-8 rounded-2xl transition-all duration-300 hover:scale-105 space-y-6 cursor-pointer text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-4 transition-transform group-hover:scale-110 flex justify-center">
                {service.emoji}
              </div>
              <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
              <ul className="space-y-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="text-muted-foreground flex items-center justify-center">
                    <span className="text-primary mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
