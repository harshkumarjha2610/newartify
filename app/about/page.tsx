import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="py-32 bg-gradient-to-b from-primary/10 to-background text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
            Bringing Ideas to Life Through Design, Code, and Strategy
          </p>
        </div>
      </section>

      <AboutSection />
      <ProcessSection />
      <ServicesSection />
    </div>
  );
}
