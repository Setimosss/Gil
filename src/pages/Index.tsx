import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import VideoGallery from "@/components/VideoGallery";
import PhotoGallery from "@/components/PhotoGallery";
import FAQ from "@/components/FAQ";
import Motivation from "@/components/Motivation";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <Motivation />
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
        <Testimonials />
        <div id="gallery">
          <VideoGallery />
          <PhotoGallery />
        </div>
        <FAQ />
        <div id="contact">
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
