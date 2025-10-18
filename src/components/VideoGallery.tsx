import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import nailsVideo from "@/assets/nails-video.mp4";
import video2 from "@/assets/video-2.mp4";
import video3 from "@/assets/video-3.mp4";
import video4 from "@/assets/video-4.mp4";

const VideoGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
      setPlayingIndex(null);
    }
  };

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingIndex(index);
        if (pauseTimerRef.current) {
          clearTimeout(pauseTimerRef.current);
          pauseTimerRef.current = null;
        }
      } else {
        video.pause();
        setPlayingIndex(null);
        // Start 5 second timer to reset
        pauseTimerRef.current = setTimeout(() => {
          resetVideo(index);
        }, 5000);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  const videos = [
    {
      title: "Nails",
      videoUrl: nailsVideo,
      isLocal: true
    },
    {
      title: "Vídeo 2",
      videoUrl: video2,
      isLocal: true
    },
    {
      title: "Vídeo 3",
      videoUrl: video3,
      isLocal: true
    },
    {
      title: "Vídeo 4",
      videoUrl: video4,
      isLocal: true
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
              onClick={() => handleVideoClick(index)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.videoUrl}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                muted
                loop
                playsInline
                preload="metadata"
              />
              
              <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 ${
                hoveredIndex === index || playingIndex === index ? 'opacity-90' : 'opacity-60'
              }`} style={{ pointerEvents: 'none' }} />

              {playingIndex !== index && (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
