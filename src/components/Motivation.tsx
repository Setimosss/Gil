import { ScrollReveal } from "./ScrollAnimations";

const Motivation = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
              "Na <span className="text-primary font-semibold">Leave Your Mark</span>, 
              acreditamos que não basta existir, é necessário{" "}
              <span className="text-primary font-semibold">deixar uma marca</span>. 
              Cada projeto é uma oportunidade para criar algo único, com identidade e{" "}
              <span className="text-primary font-semibold">propósito</span>."
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Motivation;
