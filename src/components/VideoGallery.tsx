import { Play } from "lucide-react";
import { useState } from "react";
import nailsVideo from "@/assets/nails-video.mp4";

const VideoGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const videos = [
    {
      title: "Dançar",
      client: "Nails",
      videoUrl: nailsVideo,
      isLocal: true
    },
    {
      title: "Festas das Tunas",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      videoUrl: "#",
      isLocal: false
    },
    {
      title: "Torneio de Atletismo",
      thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
      videoUrl: "#",
      isLocal: false
    },
    {
      title: "Evento Cultural",
      thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
      videoUrl: "#",
      isLocal: false
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 gradient-overlay" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-header text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold">
            Nossos <span className="text-gradient">Vídeos</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden cursor-pointer hover-lift"
              style={{ aspectRatio: '9/16' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {video.isLocal ? (
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-90' : 'opacity-60'
              }`} />

              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <div className={`w-20 h-20 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 glow ${
                  hoveredIndex === index ? 'scale-110' : 'scale-100'
                }`}>
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </div>
                
                <div className={`text-center transition-all duration-300 ${
                  hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <h3 className="text-2xl font-bold">{video.title}</h3>
                  {video.client && (
                    <p className="text-lg text-muted-foreground mt-2">{video.client}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
