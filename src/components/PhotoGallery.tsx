import { useState } from "react";
import kenpoImage from "@/assets/kenpo.jpg";
import porto1 from "@/assets/porto1.jpeg";
import amiKenha from "@/assets/ami-kenha.jpeg";
import alb3 from "@/assets/alb3.jpg";
import joao from "@/assets/joao.jpg";
import naos from "@/assets/naos.jpg";

const PhotoGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const photos = [
    {
      title: "Kempo",
      image: kenpoImage,
      category: "Desporto"
    },
    {
      title: "Nesse Mundo",
      image: porto1,
      category: "Música"
    },
    {
      title: "Ami e Kenha",
      image: amiKenha,
      category: "Música"
    },
    {
      title: "Kempo",
      image: alb3,
      category: "Desporto"
    },
    {
      title: "João Carreira",
      image: joao,
      category: "Design"
    },
    {
      title: "Nails",
      image: naos,
      category: "Beleza"
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="section-header text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold font-heading">
            Nossa <span className="text-gradient">Galeria</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover-lift"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`} />

              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
                hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm mb-2 backdrop-blur-sm">
                  {photo.category}
                </span>
                <h3 className="text-xl font-bold">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
