export default function TermsPage() {
  return (
    <div className="pt-40 pb-20 container mx-auto px-6">
      <h1 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase whitespace-pre-line">
        Terms of <span className="text-primary">Service</span>
      </h1>
      
      <div className="prose prose-invert max-w-4xl space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. User Conduct</h2>
          <p>
            You agree not to use our website for any unlawful purpose or any purpose prohibited by these terms. You may not use our website in any manner that could damage, disable, overburden, or impair any Artify TechSpace server.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of Artify TechSpace and is protected by intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitation of Liability</h2>
          <p>
            Artify TechSpace will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Information</h2>
          <p>
            For any questions regarding these Terms, please contact us at info@artifytechspace.com.
          </p>
        </section>
      </div>
    </div>
  );
}
