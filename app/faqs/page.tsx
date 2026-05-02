"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, Zap, Shield, Globe } from "lucide-react";

const faqs = [
  {
    question: "What services does Artify TechSpace offer?",
    answer: "Artify TechSpace offers a comprehensive range of digital services including web and mobile app development, AI development, branding and identity design, marketing and SEO strategy, and more. Our team of experts can help with everything from initial concept to final deployment and ongoing support.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    question: "How can I request a quote for my project?",
    answer: "You can request a quote by filling out the contact form on our contact page with details about your project. Our team will review your requirements and get back to you within 24-48 hours with an initial assessment and quote. For more complex projects, we may schedule a consultation call to better understand your needs.",
    icon: <MessageCircle className="w-5 h-5" />
  },
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary depending on the scope and complexity of the work. A simple website might take 4-6 weeks, while a complex application could take several months. During our initial consultation, we'll provide you with a detailed timeline based on your specific requirements and priorities.",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes, we offer various maintenance and support packages to ensure your digital products continue to perform optimally after launch. These can include regular updates, security patches, performance optimization, content updates, and technical support. We can customize a maintenance plan based on your specific needs.",
    icon: <Shield className="w-5 h-5" />
  },
  {
    question: "Can you work with clients internationally?",
    answer: "Absolutely! We work with clients around the world and have experience managing remote projects across different time zones. Our communication processes are designed to ensure smooth collaboration regardless of location, and we're flexible in scheduling meetings to accommodate different time zones.",
    icon: <Globe className="w-5 h-5" />
  },
  {
    question: "What information should I prepare before contacting you?",
    answer: "To help us provide the most accurate assessment of your project, it's helpful to have information about your project goals, target audience, desired features, timeline, and budget range. Any existing brand guidelines, content, or design preferences are also useful. Don't worry if you don't have all of this information yet – we can help guide you through the process.",
    icon: <HelpCircle className="w-5 h-5" />
  }
];

export default function FAQPage() {
  const [activeIndices, setActiveIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setActiveIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <main className="pt-32 pb-24 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-primary/20">
            Assistance Center
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Frequently Asked <span className="text-gradient-primary">Questions.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed italic">
            Find answers to common inquiries about our services, processes, and how we can help your business thrive.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group glass-premium border border-border/50 rounded-3xl overflow-hidden transition-all duration-500 ${
                activeIndices.includes(index) ? 'border-primary/40 bg-card/60' : 'hover:border-primary/20 bg-card/30'
              }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full px-8 py-7 flex items-center justify-between text-left gap-6 group"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    activeIndices.includes(index) ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                  }`}>
                    {faq.icon}
                  </div>
                  <span className={`text-sm md:text-base font-bold tracking-tight transition-colors duration-300 ${
                    activeIndices.includes(index) ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`transition-transform duration-500 ${activeIndices.includes(index) ? 'rotate-180 text-primary' : 'text-muted-foreground'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndices.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-8 pb-8 pt-0">
                      <div className="h-[1px] w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent mb-6" />
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-[15px] font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-background to-indigo-500/10 border border-primary/20 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-grid opacity-[0.03]" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4 tracking-tight">Still have questions?</h3>
            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              We're here to help! Reach out to us directly and we'll get back to you as soon as possible.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
            >
              Contact Our Team
              <Zap className="w-3 h-3 fill-current" />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
