"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { homeContent } from "@/lib/data";

export default function TestimonialsSection() {
  const { title, subtitle, items } = homeContent.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="py-32 bg-background relative overflow-hidden noise">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          {/* <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-header-accent mx-auto"
          >
            Social Proof
          </motion.span> */}
          <h2 className="text-fluid-h2 font-black mb-8 tracking-tighter text-foreground">What our <span className="text-primary marker-highlight">Partners</span> say</h2>
          <p className="text-muted-foreground text-sm italic border-b border-primary/10 pb-8 inline-block mx-auto">{subtitle}</p>
        </div>

        {/* Decorative Floating Elements for Gaps */}
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/10 rounded-tr-[4rem] -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/10 rounded-bl-[4rem] -z-10" />

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-12 md:p-20 rounded-[4rem] relative group perspective-hover shimmer-border shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,159,227,0.3)] border-2 border-primary/20 flex-shrink-0">
                  <Image 
                    src={items[activeIndex].image} 
                    alt={items[activeIndex].name} 
                    fill 
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left relative">
                  <i className="bi bi-quote absolute -top-10 -left-6 text-7xl text-primary/10 -z-10"></i>
                  <p className="text-base md:text-lg text-foreground font-medium leading-relaxed italic mb-8 relative z-10">
                    "{items[activeIndex].quote}"
                  </p>
                  <div>
                    <h4 className="text-2xl font-black text-primary tracking-tighter uppercase">
                      {items[activeIndex].name}
                    </h4>
                    <div className="flex justify-center md:justify-start text-primary text-xs mt-3 gap-1 animate-pulse">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill shadow-primary-glow"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-12 gap-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 transition-all duration-500 rounded-full ${
                  activeIndex === index ? "w-10 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
