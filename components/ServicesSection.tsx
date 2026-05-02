"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { homeContent } from "@/lib/data";
import { useRef, useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

interface ServiceItemProps {
  service: any;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  gradient: string;
  colors: string[];
}

function ProgressDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [0.3, 1, 1, 0.3]
  );

  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [1, 1.2, 1.2, 1]
  );

  const scaleY = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ opacity, scale, transformOrigin: "left center" }}
      className="flex items-center gap-6 group cursor-pointer"
    >
      <div className="relative w-2 h-2">
        <div className="w-2 h-2 rounded-full bg-primary/20 border border-primary/40 shadow-[0_0_20px_rgba(0,159,227,0.4)]" />
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute inset-0 bg-primary rounded-full shadow-primary-glow"
        />
      </div>

      <span className="text-[15px] font-mono uppercase tracking-[0.2em] font-black group-hover:text-primary transition-colors text-glow">
        {homeContent.services.items[index].title}
      </span>
    </motion.div>
  );
}

function ServiceCardSticky({
  service,
  index,
  total,
  scrollYProgress,
  gradient,
  colors,
}: ServiceItemProps) {
  const { theme } = useTheme();
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [100, 0, 0, -100]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0.9, 1, 1, 0.9]
  );

  const mid = (start + end) / 2;

  const zIndex = useTransform(scrollYProgress, (v) => {
    const distanceFromCenter = Math.abs(v - mid);
    return Math.round(50 - distanceFromCenter * 100);
  });

  return (
    <motion.div 
      style={{ opacity, y, scale, zIndex }} 
      className="absolute inset-0"
      whileHover={{ y: y.get() - 12, scale: scale.get() * 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div 
        style={{ 
          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.4)',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        className="glass-neo p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] h-full flex flex-col justify-between shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:shadow-[0_60px_120px_rgba(0,0,0,0.1)] group transition-all duration-700 overflow-hidden relative backdrop-blur-3xl"
      >
        {/* Top Accent Line — always visible, intensifies on hover */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] z-20 transition-opacity duration-700 opacity-60 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent 5%, ${colors[0]}, ${colors[1] || colors[0]}, transparent 95%)` }}
        />

        {/* ===== RICH ANIMATED BACKGROUND ===== */}
        <div className="absolute inset-0 z-0 overflow-hidden">

          {/* Animated Gradient Sweep — slow color wash across the card */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: `linear-gradient(135deg, ${colors[0]}18 0%, transparent 40%, ${colors[1] || colors[0]}12 70%, transparent 100%)`,
              backgroundSize: '200% 200%'
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Large Breathing Orb — top left */}
          <motion.div 
            className="absolute -top-20 -left-20 w-[350px] h-[350px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${colors[0]}50 0%, ${colors[0]}15 40%, transparent 70%)`, filter: 'blur(60px)' }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Large Breathing Orb — bottom right */}
          <motion.div 
            className="absolute -bottom-28 -right-28 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${colors[1] || colors[0]}40 0%, ${colors[1] || colors[0]}10 40%, transparent 70%)`, filter: 'blur(80px)' }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -25, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Small Accent Orb — center-right, adds color variety */}
          <motion.div 
            className="absolute top-1/3 -right-10 w-[200px] h-[200px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${colors[0]}25 0%, transparent 70%)`, filter: 'blur(50px)' }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Animated Line Grid — drifts slowly for a "tech" feel */}
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]"
            style={{ 
              backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
            animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Dot Grid Overlay — adds subtle depth */}
          <div 
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
            style={{ 
              backgroundImage: `radial-gradient(${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Hover Shimmer — diagonal light streak */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] ease-in-out bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-[-20deg]" />
          </div>
        </div>

        {/* Refined Gradient Border (Intensifies on Hover) */}
        <div className="absolute inset-0 rounded-[inherit] p-[1px] pointer-events-none z-10 transition-opacity duration-700 opacity-20 group-hover:opacity-100"
             style={{
               background: `linear-gradient(135deg, ${colors[0]}40, transparent, ${colors[1] || colors[0]}30)`,
               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
               WebkitMaskComposite: 'xor',
               maskComposite: 'exclude',
             }}
        />

        {/* Technical Corner Accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-primary/20 rounded-tl-lg hidden md:block" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-primary/20 rounded-tr-lg hidden md:block" />
        
        {/* Technical ID & Metadata Labels */}
        <div className="absolute top-6 right-10 text-[8px] font-mono text-primary/30 tracking-[0.2em] hidden md:block uppercase">
          SRV_ID: 00{index + 1}
        </div>
        <div className="absolute top-10 right-10 text-[8px] font-mono text-primary/30 tracking-[0.2em] hidden md:block uppercase">
          STATUS: ACTIVE
        </div>

        <div className="flex flex-col gap-6 md:gap-10 relative z-10">
          <motion.div 
            style={{ 
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 159, 227, 0.03)',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 159, 227, 0.08)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            whileHover={{ scale: 1.05, borderColor: `${colors[0]}40` }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-700 overflow-hidden relative group/icon shadow-sm"
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at center, ${colors[0]} 0%, transparent 70%)` }}
            />
            {(() => {
              const IconComponent = (LucideIcons as any)[service.icon];
              return IconComponent ? (
                <IconComponent 
                  size={42} 
                  strokeWidth={1.2} 
                  stroke="#009FE3"
                  fill="#F8FAFC"
                  fillOpacity={0.3}
                  className="relative z-10 transition-transform duration-500 group-hover/icon:scale-110 drop-shadow-[0_0_10px_rgba(0,159,227,0.4)]"
                />
              ) : (
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-10 md:h-10 relative z-10"
                />
              );
            })()}
          </motion.div>

          <div>
            <h3 className="text-3xl md:text-5xl font-black mb-4 md:mb-8 text-foreground tracking-tighter uppercase leading-none group-hover:text-primary transition-colors duration-500">
              {service.title}
            </h3>

            <p className="text-base md:text-xl text-foreground/70 leading-relaxed font-medium max-w-xl transition-colors duration-500 group-hover:text-foreground">
              {service.description}
            </p>
          </div>
        </div>

        <Link 
          href="/contact"
          style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
          className="flex items-center font-black text-[10px] md:text-xs uppercase tracking-[0.4em] pt-8 md:pt-12 border-t group-hover:translate-x-2 transition-transform duration-500 cursor-pointer text-foreground/50 group-hover:text-foreground relative z-10"
        >
          Launch Project <i className="bi bi-arrow-right ml-4 transition-transform duration-500 group-hover:translate-x-2"></i>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { items } = homeContent.services;
  const containerRef = useRef<HTMLDivElement>(null);

  const cardThemes = [
    { colors: ["#009FE3", "#06B6D4"], gradient: "linear-gradient(135deg, rgba(0, 159, 227, 0.12) 0%, rgba(6, 182, 212, 0.04) 100%)" }, // Blue/Cyan
    { colors: ["#8B5CF6", "#D946EF"], gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(217, 70, 239, 0.04) 100%)" }, // Purple/Pink
    { colors: ["#F97316", "#FACC15"], gradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(250, 204, 21, 0.04) 100%)" }, // Orange/Yellow
    { colors: ["#10B981", "#14B8A6"], gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(20, 184, 166, 0.04) 100%)" }, // Green/Teal
    { colors: ["#3B82F6", "#2DD4BF"], gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(45, 212, 191, 0.04) 100%)" }, // Indigo/Cyan
    { colors: ["#F43F5E", "#FB7185"], gradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(251, 113, 133, 0.04) 100%)" }, // Rose/Pink
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] lg:h-[500vh] bg-background">
      <div
        style={{ position: "sticky", top: "0" }}
        className="h-screen w-full flex items-center overflow-hidden noise mesh-gradient z-20"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <h1 className="text-[15vw] font-black text-foreground leading-none tracking-tighter">
            SOLUTIONS
          </h1>
        </div>

        <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 h-full pt-20">
            <div className="w-full lg:w-5/12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-primary font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4 flex items-center gap-3"
              >
                {/* <span className="w-8 h-[1px] bg-primary/30" />
                [02] SERVICES_ARCHITECTURE */}
              </motion.div>
              <h2 className="text-fluid-h2 font-black tracking-tighter text-foreground mb-12 leading-[0.9]">
                Empowering <br /> your <span className="text-primary marker-highlight">Digital</span> future <br /> through <span className="text-primary marker-highlight">Logic</span>.
              </h2>

              <div className="hidden lg:flex flex-col gap-6 relative">
                <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-primary/20" />
                {items.map((_, index) => (
                  <ProgressDot
                    key={index}
                    index={index}
                    total={items.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>

            <div className="w-full lg:w-7/12 relative h-[400px] md:h-[500px] isolate">
              {items.map((service, index) => (
                <ServiceCardSticky
                  key={service.title}
                  service={service}
                  index={index}
                  total={items.length}
                  scrollYProgress={scrollYProgress}
                  gradient={cardThemes[index % cardThemes.length].gradient}
                  colors={cardThemes[index % cardThemes.length].colors}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}