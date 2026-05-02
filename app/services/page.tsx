import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="py-32 bg-gradient-to-b from-blue-500/5 to-background text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground">Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
            We offer a wide range of services to help you succeed in the digital world.
          </p>
        </div>
      </section>

      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  );
}
