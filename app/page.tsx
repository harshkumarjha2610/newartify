"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import LogoCarousel from "@/components/LogoCarousel";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ImpactSection from "@/components/ImpactSection";
import ProcessSection from "@/components/ProcessSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import GlobalReachSection from "@/components/GlobalReachSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse Parallax for Final CTA
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const hubX = useTransform(springX, (v) => v * -0.5);
  const hubY = useTransform(springY, (v) => v * -0.5);
  
  // 3D Tilt for the card
  const rotateX = useTransform(springY, (v) => v * -0.5);
  const rotateY = useTransform(springX, (v) => v * 0.5);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 40);
    mouseY.set(y * 40);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent theme mismatch
  return (
    <div className="relative">
      <Hero />
      <LogoCarousel />
      
      <AboutSection />
      <ServicesSection />
      <ImpactSection />
      <ProcessSection />
      <CaseStudiesSection />
      <GlobalReachSection />
      
      <WhyChooseUsSection />
      <TestimonialsSection />
      {/* Final CTA Section */}
      <section className={`py-4 md:py-8 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f0f4ff]'
      }`}>
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full animate-pulse transition-all duration-500 ${
            theme === 'dark' ? 'bg-[#009fe3]/10 blur-[140px]' : 'bg-transparent'
          }`} style={{ animationDuration: '6s' }} />
          <div className={`absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full transition-all duration-500 ${
            theme === 'dark' ? 'bg-violet-500/10 blur-[140px]' : 'bg-transparent'
          }`} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full transition-all duration-500 ${
            theme === 'dark' ? 'bg-blue-500/5 blur-[100px]' : 'bg-transparent'
          }`} />
        </div>

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: theme === 'dark'
              ? 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)'
              : 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: "preserve-3d",
              perspective: "1000px" 
            }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`group/card relative rounded-[3rem] md:rounded-[4rem] overflow-hidden p-12 md:p-24 text-center border transition-all duration-700 ${
              theme === 'dark'
                ? 'bg-white/[0.03] border-white/[0.08] shadow-[0_40px_120px_rgba(0,159,227,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]'
                : 'bg-white/60 border-black/[0.1] shadow-[0_40px_100px_rgba(0,159,227,0.2),0_2px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-3xl'
            } hover:border-primary/50`}
          >
            {/* Refined Architectural Design Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-700">
              {/* Base Background Layer */}
              <div className={`absolute inset-0 transition-colors duration-500 ${
                theme === 'dark' ? 'bg-[#050505]' : 'bg-slate-50'
              }`} />

              {/* Animated SVG Dot Grid — developer blueprint feel */}
              <motion.div 
                animate={{
                  y: [0, -30],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  theme === 'dark' ? 'opacity-[0.25]' : 'opacity-[0.45]'
                }`}
                style={{
                  backgroundImage: `radial-gradient(#009fe3 1.2px, transparent 1.2px)`,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* Central Subtle Hub Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: theme === 'dark' ? [0.1, 0.2, 0.1] : [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-[#009fe3] blur-[160px]"
              />

              {/* Dense Geometric Shapes: Many Pulsing Outlined Circles */}
              <div className="absolute inset-0">
                {/* Large Circle - Top Left */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute -top-24 -left-24 w-96 h-96 rounded-full border-2 border-dashed ${
                    theme === 'dark' ? 'border-[#009fe3]/25' : 'border-[#009fe3]/15'
                  }`}
                />
                {/* Extra Large Circle - Top Right */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [0, -8, 0] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className={`absolute -top-32 -right-20 w-[28rem] h-[28rem] rounded-full border border-dashed ${
                    theme === 'dark' ? 'border-[#009fe3]/20' : 'border-[#009fe3]/12'
                  }`}
                />
                {/* Mid Circle - Bottom Right */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className={`absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full border-2 ${
                    theme === 'dark' ? 'border-[#009fe3]/20' : 'border-[#009fe3]/10'
                  }`}
                />
                {/* Small Circle - Center Left */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/3 left-[10%] w-40 h-40 rounded-full border border-primary/20"
                />
                {/* Concentric Rings - Center */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/4 bottom-1/4 w-32 h-32 rounded-full border-2 border-[#009fe3]/30"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute left-1/4 bottom-1/4 w-32 h-32 rounded-full border border-[#009fe3]/15"
                />
                {/* Bottom Left Circle */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                  className={`absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-dashed ${
                    theme === 'dark' ? 'border-[#009fe3]/18' : 'border-[#009fe3]/10'
                  }`}
                />
                {/* Small Solid Circle - Top Center */}
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-[15%] left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-primary/10 blur-sm"
                />
                {/* Right Mid Circle */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                  className="absolute top-[60%] right-[15%] w-48 h-48 rounded-full border border-primary/15"
                />

                {/* Supreme Background Layers (New Mega Enhancements) */}
                <DataMap theme={theme} />
                <HexStreams theme={theme} />
                <VolumetricLights theme={theme} />
                <TargetingReticle theme={theme} springX={springX} springY={springY} />
                
                {/* Ultimate Holographic Logic Engine */}
                <HolographicEngine theme={theme} springX={springX} springY={springY} />

                {/* Scanning Vertical Pulse */}
                <motion.div
                  animate={{ opacity: [0, 0.2, 0], x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-[150px] bg-gradient-to-r from-transparent via-primary/5 to-transparent z-10 skew-x-12"
                />

                {/* Corner Bracket Decorations */}
                {/* Top-Left */}
                <div className={`absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 rounded-tl-sm ${ theme === 'dark' ? 'border-primary/25' : 'border-primary/15' }`} />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-5 left-5 w-2 h-2 rounded-full bg-primary/50" />
                {/* Top-Right */}
                <div className={`absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 rounded-tr-sm ${ theme === 'dark' ? 'border-primary/25' : 'border-primary/15' }`} />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary/50" />
                {/* Bottom-Left */}
                <div className={`absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 rounded-bl-sm ${ theme === 'dark' ? 'border-primary/25' : 'border-primary/15' }`} />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-5 left-5 w-2 h-2 rounded-full bg-primary/50" />
                {/* Bottom-Right */}
                <div className={`absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 rounded-br-sm ${ theme === 'dark' ? 'border-primary/25' : 'border-primary/15' }`} />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute bottom-5 right-5 w-2 h-2 rounded-full bg-primary/50" />

                {/* Edge Technical Labels */}
                <div className={`absolute top-3 left-1/2 -translate-x-1/2 text-[7px] font-mono uppercase tracking-[0.3em] ${ theme === 'dark' ? 'text-primary/25' : 'text-primary/15' }`}>
                  sys_link — connected
                </div>
                <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-[7px] font-mono uppercase tracking-[0.3em] ${ theme === 'dark' ? 'text-primary/20' : 'text-primary/12' }`}>
                  logic.engine.v2.0
                </div>

                {/* Floating Code Snippet Cards — same as Hero */}
                {[
                  { code: 'exec --force-logic', x: 12, y: 25 },
                  { code: 'node.status: active', x: 82, y: 18 },
                  { code: '0xAF >> buffer_v2', x: 15, y: 72 },
                  { code: 'compile --optimized', x: 75, y: 65 },
                ].map((card, i) => (
                  <motion.div
                    key={`code-cta-${i}`}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
                    className={`absolute rounded-xl border backdrop-blur-md px-3 py-2 transition-all duration-500 ${
                      theme === 'dark' 
                        ? 'bg-white/[0.04] border-white/[0.08]' 
                        : 'bg-white/70 border-black/[0.06] shadow-md shadow-black/5'
                    }`}
                    style={{ left: `${card.x}%`, top: `${card.y}%` }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-1 h-1 rounded-full bg-red-400/60" />
                      <div className="w-1 h-1 rounded-full bg-yellow-400/60" />
                      <div className="w-1 h-1 rounded-full bg-green-400/60" />
                    </div>
                    <code className={`text-[8px] font-mono tracking-wide ${
                      theme === 'dark' ? 'text-primary/60' : 'text-primary/80'
                    }`}>{card.code}</code>
                  </motion.div>
                ))}
              </div>

              {/* Dense Floating Vertical Lines — 14 lines, varied widths */}
              <div className="absolute inset-0">
                {[...Array(14)].map((_, i) => (
                    <motion.div
                      key={`line-${i}`}
                      animate={{
                        y: ['-100%', '200%'],
                        opacity: theme === 'dark' ? [0, 0.4, 0] : [0, 0.7, 0],
                      }}
                      transition={{
                        duration: 4 + i * 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 1.5,
                      }}
                      className={`absolute bg-gradient-to-b from-transparent via-[#009fe3]/50 to-transparent ${
                        i % 3 === 0 ? 'w-[2px] h-48' : 'w-[1px] h-32'
                      }`}
                      style={{
                        left: `${5 + i * 7}%`,
                      }}
                    />
                ))}
              </div>

              {/* Horizontal Lines */}
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`hline-${i}`}
                      animate={{
                        x: ['-100%', '200%'],
                        opacity: theme === 'dark' ? [0, 0.25, 0] : [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 8 + i * 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 2,
                      }}
                      className="absolute h-[1px] w-40 bg-gradient-to-r from-transparent via-[#009fe3]/30 to-transparent"
                      style={{
                        top: `${10 + i * 16}%`,
                      }}
                    />
                ))}
              </div>

              {/* Dense Floating Glass Shards — 14 shards */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(14)].map((_, i) => (
                  <GlassShard key={`shard-${i}`} index={i} theme={theme} />
                ))}
              </div>

              {/* Many Matrix-like floating dots — 30 dots */}
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <MatrixDot key={`dot-${i}`} index={i} theme={theme} springX={springX} springY={springY} />
                ))}
              </div>

              {/* Final Subtle Overlay for texture */}
              <div 
                className={`absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay ${
                  theme === 'dark' ? 'invert' : ''
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative z-10">

            {/* Top label */}
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.35em] border transition-colors duration-500 ${
                theme === 'dark'
                  ? 'bg-[#009fe3]/10 border-[#009fe3]/20 text-[#009fe3]'
                  : 'bg-primary/10 border-primary/20 text-primary'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  theme === 'dark' ? 'bg-[#009fe3]' : 'bg-white'
                }`} />
                Ready to Dominate
              </span>
            </motion.div> */}

            {/* Headline with Chromatic Aberration Hover Effect */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`text-fluid-h2 font-black mb-8 leading-[1.05] tracking-tighter transition-all duration-500 group-hover/card:scale-[1.02] ${
                theme === 'dark' ? 'text-white' : 'text-[#050505]'
              }`}
            >
              Experience the future
              <br />
              of{' '}
              <span className="relative inline-block group/prof cursor-default">
                <span className="relative z-10 bg-clip-text text-primary transition-all duration-500 group-hover/prof:tracking-widest">
                  Professional
                </span>
                <span
                  className={`absolute -inset-x-4 -inset-y-2 rounded-xl transition-all duration-700 blur-2xl ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-[#009fe3] to-violet-500 opacity-20 group-hover/prof:opacity-50 group-hover/prof:blur-3xl' 
                      : 'bg-primary/20 opacity-0 group-hover/prof:opacity-40 group-hover/prof:blur-3xl'
                  }`}
                />
              </span>{' '}
              Logic.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className={`text-fluid-p mb-14 max-w-lg mx-auto font-medium leading-relaxed transition-colors duration-500 ${
                theme === 'dark' ? 'text-white/70' : 'text-[#050505]/60'
              }`}
            >
              Partner with Artify Tech Space to turn your vision into a high-performance digital reality. Our logic, your growth.
            </motion.p>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`w-24 h-px mx-auto mb-14 transition-colors duration-500 bg-gradient-to-r from-transparent ${
                theme === 'dark' ? 'via-white/20' : 'via-black/10'
              } to-transparent`}
            />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {/* Primary */}
              <Link href="/contact" className="contents">
                <button
                  className="group/btn relative px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] text-white overflow-hidden transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #009fe3, #0077b3)',
                    boxShadow: '0 8px 32px rgba(0,159,227,0.4), 0 2px 8px rgba(0,159,227,0.2)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Launch Your Project
                    <svg className="w-3.5 h-3.5 translate-x-0 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>

              {/* Secondary */}
              <Link href="/portfolio" className="contents">
                <button className={`group/btn2 px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] border transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 ${
                  theme === 'dark' 
                    ? 'border-white/10 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5' 
                    : 'border-black/10 text-[#050505]/60 hover:border-black/20 hover:text-[#050505] hover:bg-black/5'
                }`}>
                  Explore Our Work
                  <svg className="w-3.5 h-3.5 opacity-50 group-hover/btn2:opacity-100 translate-x-0 group-hover/btn2:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </Link>
            </motion.div>

            {/* Bottom stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className={`mt-16 pt-10 border-t flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 transition-colors duration-500 ${
                theme === 'dark' ? 'border-white/[0.06]' : 'border-black/[0.06]'
              }`}
            >
              {[
                { value: '150+', label: 'Projects Launched' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '5×', label: 'Average ROI' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className={`text-2xl font-black tracking-tight bg-gradient-to-br bg-clip-text text-transparent ${
                    theme === 'dark' ? 'from-white to-white/60' : 'from-[#050505] to-[#050505]/40'
                  }`}>{value}</div>
                  <div className={`text-[10px] uppercase tracking-[0.25em] font-semibold mt-0.5 transition-colors duration-500 ${
                    theme === 'dark' ? 'text-white/30' : 'text-[#050505]/30'
                  }`}>{label}</div>
                </div>
              ))}
            </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function DataMap({ theme }: { theme: string | undefined }) {
  return (
    <div className={`absolute inset-0 z-[-5] transition-opacity duration-1000 ${
      theme === 'dark' ? 'opacity-[0.05]' : 'opacity-[0.1]'
    }`}>
      <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className="text-primary">
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={100 + i * 120}
            cy={100 + (i % 2) * 150}
            r="2"
            fill="currentColor"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
        <motion.path
          d="M100 100 L220 250 L340 100 L460 250 L580 100 L700 250"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

function HexStreams({ theme }: { theme: string | undefined }) {
  const codes = ["0xAF", "0x21", "0x5C", "0x09", "0x8D", "0x3F", "0x74", "0xE1"];
  return (
    <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-[-4] flex justify-around opacity-[0.03]">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-4 text-[10px] font-mono font-bold text-primary"
        >
          {[...Array(20)].map((_, j) => (
            <span key={j}>{codes[(i + j) % codes.length]}</span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function VolumetricLights({ theme }: { theme: string | undefined }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[-3]">
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], rotate: [25, 35, 25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/2 -left-1/4 w-[200%] h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12"
      />
    </div>
  );
}

function TargetingReticle({ theme, springX, springY }: { theme: string | undefined, springX: any, springY: any }) {
  const x = useTransform(springX, (v: number) => v * 1.5);
  const y = useTransform(springY, (v: number) => v * 1.5);
  
  return (
    <motion.div
      style={{ x, y }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none z-[-2]"
    >
      <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping opacity-20" />
      <div className="absolute inset-4 border border-primary/10 rounded-full" />
      <div className="absolute inset-8 border-2 border-primary/5 rounded-full border-t-primary/30 rotate-45" />
      
      {/* Tiny Status Labels */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[6px] font-black uppercase tracking-[0.2em] text-primary/40 whitespace-nowrap">
        SYS_STATUS: OPTIMAL
      </div>
    </motion.div>
  );
}

function HolographicEngine({ theme, springX, springY }: { theme: string | undefined, springX: any, springY: any }) {
  const x = useTransform(springX, (v: number) => v * -0.3);
  const y = useTransform(springY, (v: number) => v * -0.3);
  
  return (
    <motion.div 
      style={{ x, y }}
      className={`absolute right-[5%] top-[10%] w-[35rem] h-[35rem] -z-10 ${
        theme === 'dark' ? 'opacity-[0.15]' : 'opacity-[0.3]'
      }`}
    >
      {/* Outer Rotating Hexagon Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-primary/10 rounded-[4rem]"
      >
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary/20 rounded-full blur-[2px]" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-10 border border-dashed border-primary/15 rounded-full"
      />

      {/* Complex Core Component */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: 45 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-24 border-2 border-primary/20 bg-primary/5 rounded-[2.5rem] backdrop-blur-sm shadow-[0_0_30px_rgba(0,159,227,0.1)]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
           <svg width="120" height="120" viewBox="0 0 100 100" className="text-primary/60">
              <motion.path
                d="M50 5 L95 50 L50 95 L5 L50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.25"
                strokeDasharray="2 2"
                animate={{ strokeDashoffset: [0, 50] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle 
                cx="50" cy="50" r="15" 
                fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <circle cx="50" cy="50" r="4" className="fill-primary shadow-[0_0_15px_rgba(0,159,227,1)]" />
           </svg>
        </div>
        
        {/* Pulsing Energy Beams */}
        {[0, 90, 180, 270].map((deg) => (
          <div 
            key={deg} 
            className="absolute left-1/2 top-1/2 w-32 h-[1px] bg-gradient-to-r from-primary/40 to-transparent origin-left"
            style={{ transform: `rotate(${deg}deg) translateX(20px)` }}
          />
        ))}
      </motion.div>

      {/* Orbiting Satellite Data Nodes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/40 rounded-full shadow-[0_0_10px_rgba(0,159,227,0.5)]" />
        </motion.div>
      ))}
    </motion.div>
  );
}

function GlassShard({ index, theme }: { index: number, theme: string | undefined }) {
  return (
    <motion.div
      animate={{
        y: [0, -60, 0],
        x: [0, (index % 2 === 0 ? 25 : -25), 0],
        rotateX: [0, 45, 0],
        rotateY: [0, 45, 0],
      }}
      transition={{
        duration: 10 + (index % 7),
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        left: `${(index * 7) % 95}%`,
        top: `${(index * 11) % 85}%`,
        transformStyle: "preserve-3d",
      }}
      className={`absolute bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 backdrop-blur-md rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] ${
        theme === 'dark' ? 'opacity-[0.15]' : 'opacity-[0.3]'
      } overflow-hidden ${
        index % 3 === 0 ? 'w-20 h-20' : index % 3 === 1 ? 'w-12 h-12' : 'w-16 h-16'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
    </motion.div>
  );
}

function MatrixDot({ index, theme, springX, springY }: { index: number, theme: string | undefined, springX: any, springY: any }) {
  const xMultiplier = ((index * 3) % 7) - 3;
  const yMultiplier = ((index * 5) % 5) - 2;
  const x = useTransform(springX, (v: number) => v * xMultiplier * 1.5);
  const y = useTransform(springY, (v: number) => v * yMultiplier * 1.5);
  
  return (
    <motion.div
      style={{ 
        x, 
        y,
        left: `${(index * 13) % 95}%`,
        top: `${(index * 17) % 90}%`,
      }}
      animate={{
        scale: [0, index % 3 === 0 ? 2 : 1.5, 0],
        opacity: theme === 'dark' ? [0, 0.5, 0] : [0, 0.8, 0],
      }}
      transition={{
        duration: 2 + (index % 4),
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
      className={`absolute rounded-full bg-primary/60 ${
        index % 4 === 0 ? 'w-2 h-2' : 'w-1 h-1'
      }`}
    />
  );
}