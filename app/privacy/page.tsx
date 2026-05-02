export default function PrivacyPage() {
  return (
    <div className="pt-40 pb-20 container mx-auto px-6">
      <h1 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase whitespace-pre-line">
        Privacy <span className="text-primary">Policy</span>
      </h1>
      
      <div className="prose prose-invert max-w-4xl space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us through our contact forms, newsletter sign-ups, and other communication channels. This may include your name, email address, phone number, and any other information you choose to provide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you technical notices, updates, and administrative messages</li>
            <li>Communicate with you about products, services, offers, and events</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at info@artifytechspace.com.
          </p>
        </section>
      </div>
    </div>
  );
}
