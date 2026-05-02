"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { homeContent } from "@/lib/data";
import { useRef } from "react";
import Counter from "./Counter";

export default function AboutSection() {
  const { title, subtitle, description, services, image, stats } = homeContent.about;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section ref={containerRef} className="py-24 md:py-48 relative overflow-hidden bg-background noise">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.02] pointer-events-none" />
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] morphing-blob -z-10" 
      />
      <motion.div 
        style={{ y: y2, animationDelay: '2s' }}
        className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] morphing-blob -z-10" 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-32">
          
          {/* Image Side with Parallax & Morphing Border */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-5/12 relative"
          >
            <div className="relative z-10 p-4">
              <motion.div 
                style={{ rotate }}
                className="relative rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl border-2 border-primary/20 bg-background"
              >
                <Image 
                  src={image} 
                  alt={title} 
                  width={800} 
                  height={1000} 
                  className="w-full h-auto object-cover transition-transform duration-[3s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </motion.div>
              
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-6 md:-right-12 glass-neo p-8 rounded-3xl shadow-2xl z-20 hidden md:block"
              >
                <div className="text-4xl font-black text-primary tracking-tighter">
                  <Counter value={stats[0].value} suffix={stats[0].suffix} />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">{stats[0].label}</div>
              </motion.div>
            </div>

            {/* Cinematic Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full -z-10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary/5 rounded-full -z-10 animate-[spin_50s_linear_infinite_reverse]" />
            
            {/* Geometric Gap Fillers */}
            <motion.div 
               animate={{ rotate: 360, y: [0, 20, 0] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="absolute -top-10 -left-10 w-12 h-12 border border-primary/20 rounded-lg -z-10" 
            />
            <motion.div 
               animate={{ rotate: -360, x: [0, 30, 0] }}
               transition={{ duration: 15, repeat: Infinity }}
               className="absolute -bottom-20 right-0 w-8 h-8 bg-primary/10 rounded-full -z-10" 
            />
          </motion.div>

          {/* Content Side */}
          <div className="lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, staggerChildren: 0.2 }}
            >
              {/* <motion.span 
                className="section-header-accent"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                // 01. {subtitle}
              </motion.span> */}
              
              <motion.h2 
                className="text-fluid-h2 font-black mb-8 leading-[1.05] tracking-tight text-foreground"
                initial={{ opacity: 0, y: 20, scale: 0.3 }}
                whileInView={{ opacity: 1, y: 0, scale: 0.9 }}
              >
                Merging <span className="text-primary marker-highlight">Imagination</span> with Professional <span className="text-primary marker-highlight">Logic</span>.
              </motion.h2>

              <motion.p 
                className="text-fluid-p text-muted-foreground mb-12 max-w-2xl leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                {description}
              </motion.p>

              {/* Counter Grid */}
              <div className="grid grid-cols-2 gap-8 mb-16">
                {stats.slice(1).map((stat, idx) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-l border-primary/20 pl-6"
                  >
                    <div className="text-3xl font-black text-foreground tracking-tighter">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Service Pills */}
              <div className="flex flex-wrap gap-3">
                {services.map((s, i) => (
                  <motion.span 
                    key={s.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5, backgroundColor: "var(--primary)", color: "white" }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 rounded-full border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-card/30 backdrop-blur-sm cursor-default transition-colors"
                  >
                    {s.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
