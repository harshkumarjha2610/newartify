"use client";

import { motion, Variants } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const { phone, email, address } = siteConfig.contact;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] morphing-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] morphing-blob" />
        <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row gap-16 lg:gap-24"
        >
          {/* Left Column: Heading and Contact Info */}
          <div className="lg:w-2/5 space-y-12">
            <motion.div variants={itemVariants}>
              {/* <span className="section-header-accent mb-4 !text-[10px] !px-4 !py-1">Connect With Us</span> */}
              <h2 className="text-fluid-h2 mb-6 leading-[1.1] font-black tracking-tight text-foreground">
                Let's turn your <span className="text-gradient-primary">vision</span> into digital <span className="italic">reality.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                Have a groundbreaking idea? Or need help refining your digital presence? 
                Our team of experts is ready to collaborate.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {[
                { icon: <MapPin className="w-4 h-4" />, label: "Headquarters", value: address, color: "bg-blue-500/10 text-blue-500" },
                { icon: <Mail className="w-4 h-4" />, label: "Email Support", value: email, color: "bg-indigo-500/10 text-indigo-500" },
                { icon: <Phone className="w-4 h-4" />, label: "Direct Call", value: phone, color: "bg-emerald-500/10 text-emerald-500" }
              ].map((item, idx) => (
                <div key={idx} className="group glass p-5 rounded-[1.5rem] border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-black/5`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-0.5">{item.label}</p>
                      <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div variants={itemVariants} className="lg:w-3/5">
            <div className="glass-premium p-1 rounded-[2.5rem] shadow-2xl relative overflow-hidden shimmer-border">
              <div className="bg-card/40 backdrop-blur-3xl p-8 md:p-10 rounded-[2.4rem] relative z-10">
                <form className="space-y-6" onSubmit={async (e) => {
                  e.preventDefault();
                  
                  const form = e.currentTarget;
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
                  const originalContent = submitBtn ? submitBtn.innerHTML : '';
                  
                  if (submitBtn) {
                    submitBtn.innerHTML = '<span class="relative z-10 flex items-center justify-center space-x-3 text-white">Sending...</span>';
                    submitBtn.disabled = true;
                  }

                  try {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        ...data,
                        consent: !!data.consent
                      }),
                    });

                    const result = await response.json();

                    if (!response.ok) {
                      throw new Error(result.error || 'Failed to submit form');
                    }

                    alert("Thank you! Your message has been sent successfully.");
                    form.reset();
                  } catch (error: any) {
                     console.error("Submission error:", error);
                     alert(error.message || "An error occurred. Please try again later.");
                  } finally {
                    if (submitBtn) {
                      submitBtn.innerHTML = originalContent;
                      submitBtn.disabled = false;
                    }
                  }
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Full Name *</label>
                      <div className="relative group/input">
                        <input 
                          name="fullName"
                          type="text" 
                          required
                          className="w-full bg-background/30 border border-border/60 hover:border-primary/40 focus:border-primary rounded-xl px-5 py-3.5 text-[11px] focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-foreground"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Email Address *</label>
                      <div className="relative group/input">
                        <input 
                          name="email"
                          type="email" 
                          required
                          className="w-full bg-background/30 border border-border/60 hover:border-primary/40 focus:border-primary rounded-xl px-5 py-3.5 text-[11px] focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-foreground"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Phone Number (Optional)</label>
                      <div className="relative group/input">
                        <input 
                          name="phoneNumber"
                          type="tel" 
                          className="w-full bg-background/30 border border-border/60 hover:border-primary/40 focus:border-primary rounded-xl px-5 py-3.5 text-[11px] focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-foreground"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Inquiry Subject *</label>
                      <div className="relative group/input">
                        <input 
                          name="subject"
                          type="text" 
                          required
                          className="w-full bg-background/30 border border-border/60 hover:border-primary/40 focus:border-primary rounded-xl px-5 py-3.5 text-[11px] focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-foreground"
                          placeholder="Project Collaboration"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Your Message *</label>
                    <div className="relative group/input">
                      <textarea 
                        name="message"
                        rows={4}
                        required
                        className="w-full bg-background/30 border border-border/60 hover:border-primary/40 focus:border-primary rounded-2xl px-5 py-4 text-[11px] focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-foreground resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        className="w-3.5 h-3.5 rounded border-primary/30 bg-background text-primary focus:ring-primary transition-all cursor-pointer"
                      />
                    </div>
                    <div className="text-[10px]">
                      <label htmlFor="consent" className="text-muted-foreground leading-relaxed cursor-pointer select-none">
                        I consent to having this website store my submitted information so they can respond to my inquiry. <span className="text-primary font-bold">*</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="group relative w-fit px-12 overflow-hidden rounded-xl bg-primary py-4 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-2xl transition-all hover:shadow-primary/20"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative flex items-center justify-center space-x-3">
                      <span>Send Proposal</span>
                      <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
