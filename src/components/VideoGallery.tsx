import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import nailsVideo from "@/assets/nails-video.mp4";
import video2 from "@/assets/video-2.mp4";
import video3 from "@/assets/video-3.mp4";
import video4 from "@/assets/video-4.mp4";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollAnimations";

const VideoGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const pauseTimerRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const resetVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
      setPlayingVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingVideos(prev => new Set(prev).add(index));
        
        const existingTimer = pauseTimerRefs.current.get(index);
        if (existingTimer) {
          clearTimeout(existingTimer);
          pauseTimerRefs.current.delete(index);
        }
      } else {
        video.pause();
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
        
        const timer = setTimeout(() => {
          resetVideo(index);
          pauseTimerRefs.current.delete(index);
        }, 5000);
        pauseTimerRefs.current.set(index, timer);
      }
    }
  };

  const handleVideoEnded = (index: number) => {
    resetVideo(index);
  };

  useEffect(() => {
    return () => {
      pauseTimerRefs.current.forEach(timer => clearTimeout(timer));
      pauseTimerRefs.current.clear();
    };
  }, []);

  const videos = [
    {
      title: "Nails",
      videoUrl: nailsVideo,
      isLocal: true
    },
    {
      title: "Tattoo",
      videoUrl: video2,
      isLocal: true
    },
    {
      title: "João Carreira",
      videoUrl: video3,
      isLocal: true
    },
    {
      title: "Kempo",
      videoUrl: video4,
      isLocal: true
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 gradient-overlay" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up">
          <div className="section-header text-center space-y-4 mb-16">
            <h2 className="text-5xl md:text-6xl font-bold font-heading">
              Os Nossos <span className="text-gradient">Vídeos</span>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <StaggerItem key={index}>
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer hover-lift"
                style={{ aspectRatio: '9/16' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleVideoClick(index)}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.videoUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  playsInline
                  preload="metadata"
                  onEnded={() => handleVideoEnded(index)}
                />
                
                <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 ${
                  hoveredIndex === index || playingVideos.has(index) ? 'opacity-90' : 'opacity-60'
                }`} style={{ pointerEvents: 'none' }} />

                {!playingVideos.has(index) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4" style={{ pointerEvents: 'none' }}>
                    <div className={`w-20 h-20 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 glow ${
                      hoveredIndex === index ? 'scale-110' : 'scale-100'
                    }`}>
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  
                    <div className={`text-center transition-all duration-300 ${
                      hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      <h3 className="text-2xl font-bold">{video.title}</h3>
                    </div>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default VideoGallery;
