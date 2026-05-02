"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { homeContent } from "@/lib/data";
import { useTheme } from "next-themes";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = homeContent.heroSlides;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, 8000);

    // Hide custom cursor immediately on scroll to prevent "sticky" dot
    const handleScroll = () => setShowCursor(false);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slides.length, scrollYProgress]);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || scrollYProgress.get() >= 0.79) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    containerRef.current.style.setProperty('--mouse-x-raw', x.toString());
    containerRef.current.style.setProperty('--mouse-y-raw', y.toString());

    if (!showCursor) setShowCursor(true);

    // Update motion values for custom cursor
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
      className={`relative h-[110vh] w-full overflow-hidden bg-background ${showCursor ? "cursor-none" : ""}`}
    >
      {!mounted ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background" />
      ) : (
        <>
          {/* Developer-Grade Architectural Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Base Gradient */}
            <div className={`absolute inset-0 transition-colors duration-[2s] ${
              isDark 
                ? 'bg-[radial-gradient(ellipse_at_50%_0%,#009fe304_0%,#050505_70%)]' 
                : 'bg-[radial-gradient(ellipse_at_50%_0%,#009fe303_0%,#f8fafc_70%)]'
            }`} />

            {/* Animated Dot Grid — dense but refined */}
            <motion.div 
              animate={{ y: [0, -28] }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-0 ${ isDark ? 'opacity-[0.1]' : 'opacity-[0.2]' }`}
              style={{
                backgroundImage: `radial-gradient(${isDark ? '#009fe3' : '#94a3b8'} 1.2px, transparent 1.2px)`,
                backgroundSize: '30px 30px',
              }}
            />

            {/* Interactive Mouse Spotlight */}
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ${ isDark ? 'opacity-20' : 'opacity-40' }`}
              style={{
                background: `radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${isDark ? '#009fe315' : '#009fe325'}, transparent 70%)`,
              }}
            />

            {/* Clean SVG Blueprint Hub — single, precise, rotating */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{
                rotateX: 'calc((var(--mouse-y-raw, 0.5) - 0.5) * 10deg)',
                rotateY: 'calc((var(--mouse-x-raw, 0.5) - 0.5) * -10deg)',
              }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[125vh] h-[125vh] transition-all duration-500 ease-out ${
                isDark ? 'opacity-[0.08]' : 'opacity-[0.2]'
              }`}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary fill-none">
                <circle cx="50" cy="50" r="48" strokeWidth="0.08" strokeDasharray="1 3" />
                <circle cx="50" cy="50" r="40" strokeWidth="0.04" />
                <circle cx="50" cy="50" r="32" strokeWidth="0.06" strokeDasharray="0.5 2" />
                <path d="M50 2 L50 98 M2 50 L98 50" strokeWidth="0.03" opacity="0.4" />
                <path d="M50 18 L82 50 L50 82 L18 50 Z" strokeWidth="0.04" opacity="0.3" />
                <path d="M50 30 L67 40 L67 60 L50 70 L33 60 L33 40 Z" strokeWidth="0.08" opacity="0.5" />
              </svg>
            </motion.div>

            {/* 8 Architectural Circles — density meets intentionality */}
            <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full border ${ isDark ? 'border-primary/20' : 'border-primary/12' }`} />
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className={`absolute -top-16 -right-16 w-[26rem] h-[26rem] rounded-full border border-dashed ${ isDark ? 'border-primary/20' : 'border-primary/12' }`} />
            <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              className={`absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full border ${ isDark ? 'border-primary/18' : 'border-primary/10' }`} />
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 }}
              className={`absolute bottom-[15%] -left-20 w-72 h-72 rounded-full border border-dashed ${ isDark ? 'border-primary/18' : 'border-primary/10' }`} />
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={`absolute top-[20%] -right-10 w-56 h-56 rounded-full border ${ isDark ? 'border-primary/15' : 'border-primary/8' }`} />
            <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[30%] left-[12%] w-36 h-36 rounded-full border border-primary/25" />
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border-2 border-primary/20" />
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-primary/10" />

            {/* 14 Data Rain Lines — varied widths */}
            <div className="absolute inset-0">
              {[...Array(14)].map((_, i) => (
                <motion.div
                  key={`rain-${i}`}
                  animate={{ y: ['-100%', '200%'], opacity: [0, isDark ? 0.5 : 0.8, 0] }}
                  transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
                  className={`absolute bg-gradient-to-b from-transparent via-primary to-transparent ${
                    i % 4 === 0 ? 'w-[2px] h-[40vh]' : 'w-[1px] h-[30vh]'
                  }`}
                  style={{ left: `${5 + i * 7}%` }}
                />
              ))}
            </div>

            {/* Floating Code Snippet Cards — developer terminal style */}
            {[
              { code: 'const app = createApp();', x: 8, y: 15 },
              { code: 'deploy --production', x: 72, y: 22 },
              { code: 'git push origin main', x: 5, y: 68 },
              { code: 'npm run build ✓', x: 78, y: 72 },
            ].map((card, i) => (
              <motion.div
                key={`code-${i}`}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
                className={`absolute rounded-xl border backdrop-blur-md px-4 py-2.5 transition-all duration-500 ${
                  isDark 
                    ? 'bg-white/[0.03] border-white/[0.06]' 
                    : 'bg-white/60 border-black/[0.05] shadow-lg shadow-black/5'
                }`}
                style={{ left: `${card.x}%`, top: `${card.y}%` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                </div>
                <code className={`text-[9px] font-mono tracking-wide ${
                  isDark ? 'text-primary/50' : 'text-primary/70'
                }`}>{card.code}</code>
              </motion.div>
            ))}

            {/* Glass Shards — 6, with developer-style sizing */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`shard-${i}`}
                animate={{
                  y: [0, -25, 0],
                  rotateX: [10, 20, 10],
                  rotateY: [5, 15, 5],
                }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
                className={`absolute rounded-2xl border backdrop-blur-[3px] transition-colors duration-500 ${
                  isDark 
                    ? 'bg-white/[0.04] border-white/[0.12]' 
                    : 'bg-black/[0.06] border-black/[0.1]'
                } ${
                  i % 3 === 0 ? 'w-36 h-36' : i % 3 === 1 ? 'w-24 h-24' : 'w-20 h-20'
                }`}
                style={{
                  left: `${20 + (i * 15) % 65}%`,
                  top: `${10 + (i * 18) % 70}%`,
                  transform: 'perspective(1200px)',
                }}
              />
            ))}

            {/* Floating Tech Icons */}
            <div className="absolute inset-0">
              {[
                { Icon: 'Code', x: 20, y: 30, size: 24 },
                { Icon: 'Cpu', x: 75, y: 25, size: 32 },
                { Icon: 'Globe', x: 85, y: 70, size: 28 },
                { Icon: 'Zap', x: 15, y: 75, size: 20 },
                { Icon: 'Layers', x: 45, y: 15, size: 30 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -15, 0], rotate: [0, 360] }}
                  transition={{
                    y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 30 + i * 5, repeat: Infinity, ease: "linear" }
                  }}
                  className={`absolute transition-opacity duration-500 ${
                    isDark ? 'text-primary/30' : 'text-primary/60'
                  }`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    filter: isDark ? 'drop-shadow(0 0 8px var(--primary))' : 'none',
                  }}
                >
                  <div style={{ transform: `scale(${item.size / 24})` }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {item.Icon === 'Code' && <path d="m18 16 4-4-4-4M6 8l-4 4 4 4" />}
                      {item.Icon === 'Cpu' && <rect x="4" y="4" width="16" height="16" rx="2" />}
                      {item.Icon === 'Globe' && <circle cx="12" cy="12" r="10" />}
                      {item.Icon === 'Zap' && <path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 Z" />}
                      {item.Icon === 'Layers' && <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 35 Particles — good density with varied sizes and glow */}
            <div className="absolute inset-0">
              {[...Array(35)].map((_, i) => (
                <motion.div
                  key={`p-${i}`}
                  animate={{ y: [0, -100, 0], opacity: isDark ? [0.1, 0.6, 0.1] : [0.2, 0.9, 0.2] }}
                  transition={{ duration: 7 + (i % 8) * 2, repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 1.2 }}
                  className={`absolute rounded-full ${ isDark ? 'bg-primary/50' : 'bg-primary/80' } ${
                    i % 5 === 0 ? 'w-2 h-2' : i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'
                  }`}
                  style={{
                    left: `${(i * 3) % 97}%`,
                    top: `${(i * 7) % 93}%`,
                    boxShadow: isDark ? '0 0 12px var(--primary)' : '0 0 6px var(--primary)',
                  }}
                />
              ))}
            </div>

            {/* Corner Bracket Decorations */}
            {/* Top-Left */}
            <div className={`absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 rounded-tl-sm ${ isDark ? 'border-primary/25' : 'border-primary/15' }`} />
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-5 left-5 w-2 h-2 rounded-full bg-primary/50" />
            {/* Top-Right */}
            <div className={`absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 rounded-tr-sm ${ isDark ? 'border-primary/25' : 'border-primary/15' }`} />
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary/50" />
            {/* Bottom-Left */}
            <div className={`absolute bottom-20 left-6 w-16 h-16 border-l-2 border-b-2 rounded-bl-sm ${ isDark ? 'border-primary/25' : 'border-primary/15' }`} />
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-[4.75rem] left-5 w-2 h-2 rounded-full bg-primary/50" />
            {/* Bottom-Right */}
            <div className={`absolute bottom-20 right-6 w-16 h-16 border-r-2 border-b-2 rounded-br-sm ${ isDark ? 'border-primary/25' : 'border-primary/15' }`} />
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-[4.75rem] right-5 w-2 h-2 rounded-full bg-primary/50" />

            {/* Edge Line Accents */}
            <div className={`absolute top-0 left-[15%] right-[15%] h-[1px] ${ isDark ? 'bg-gradient-to-r from-transparent via-primary/15 to-transparent' : 'bg-gradient-to-r from-transparent via-primary/8 to-transparent' }`} />
            <div className={`absolute bottom-0 left-[10%] right-[10%] h-[1px] ${ isDark ? 'bg-gradient-to-r from-transparent via-primary/12 to-transparent' : 'bg-gradient-to-r from-transparent via-primary/6 to-transparent' }`} />
            <div className={`absolute left-0 top-[20%] bottom-[20%] w-[1px] ${ isDark ? 'bg-gradient-to-b from-transparent via-primary/10 to-transparent' : 'bg-gradient-to-b from-transparent via-primary/5 to-transparent' }`} />
            <div className={`absolute right-0 top-[15%] bottom-[15%] w-[1px] ${ isDark ? 'bg-gradient-to-b from-transparent via-primary/10 to-transparent' : 'bg-gradient-to-b from-transparent via-primary/5 to-transparent' }`} />

            {/* Small Rotating Diamonds near corners */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`absolute top-12 left-[20%] w-8 h-8 border ${ isDark ? 'border-primary/20' : 'border-primary/10' } rotate-45`} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className={`absolute top-16 right-[18%] w-6 h-6 border border-dashed ${ isDark ? 'border-primary/15' : 'border-primary/8' } rotate-45`} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className={`absolute bottom-28 left-[22%] w-6 h-6 border ${ isDark ? 'border-primary/15' : 'border-primary/8' } rotate-45`} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className={`absolute bottom-24 right-[20%] w-8 h-8 border border-dashed ${ isDark ? 'border-primary/20' : 'border-primary/10' } rotate-45`} />

            {/* Edge Coordinate Labels — developer aesthetic */}
            <div className={`absolute top-3 left-1/2 -translate-x-1/2 text-[7px] font-mono uppercase tracking-[0.3em] ${ isDark ? 'text-primary/20' : 'text-primary/15' }`}>
              artify.tech.space
            </div>
            <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 text-[7px] font-mono uppercase tracking-[0.3em] ${ isDark ? 'text-primary/15' : 'text-primary/10' }`}>
              v2.0 — production
            </div>

            {/* Horizontal Scan Line */}
            <motion.div
              animate={{ y: ['-10%', '110%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className={`absolute left-0 right-0 h-[1px] ${
                isDark 
                  ? 'bg-gradient-to-r from-transparent via-primary/12 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-primary/6 to-transparent'
              }`}
            />

            {/* Noise Texture Overlay */}
            <div 
              className={`absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay ${ isDark ? 'invert' : '' }`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)] pointer-events-none" />
          </div>

          {/* CONTENT */}
          <div className="relative h-full container mx-auto px-6 flex items-center justify-center text-center">
            <motion.div style={{ y: textY, opacity }} className="max-w-5xl z-10">
              
              {/* Animate only TEXT when slide changes */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.h1 className={`text-fluid-h1 font-black mb-10 leading-[0.9] tracking-tighter transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-[#050505]'
                  }`}>
                    {currentSlide === 0 ? (
                      <>
                        Design. Develop.{" "}
                        <span className="text-primary">Dominate.</span>
                      </>
                    ) : (
                      slides[currentSlide].headline.split(" ").map((word, i) => (
                        <span
                          key={i}
                          className={i % 2 === 1 ? "text-primary" : ""}
                        >
                          {word}{" "}
                        </span>
                      ))
                    )}
                  </motion.h1>

                  <motion.p className={`text-fluid-p mb-16 max-w-2xl mx-auto leading-relaxed font-medium transition-colors duration-500 ${
                    isDark ? 'text-white/70' : 'text-[#050505]/60'
                  }`}>
                    {slides[currentSlide].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-10 justify-center items-center"
              >
                <MagneticButton>
                  <Link href="/contact" className="relative group px-12 py-5 rounded-full bg-primary text-white font-black text-xs uppercase tracking-[0.2em] overflow-hidden shadow-2xl shadow-primary/30 inline-block">
                    <span className="relative z-10">Start a Project</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="absolute inset-0 z-0 bg-primary" />
                    <span className="relative z-10 group-hover:text-primary transition-colors duration-500 ml-2">
                      →
                    </span>
                  </Link>
                </MagneticButton>

                <Link
                  href="/portfolio"
                  className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-[0.4em] uppercase border-b border-muted-foreground/20 pb-2"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-10">
            <div className="flex gap-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="group relative"
                >
                  <div
                    className={`h-[2px] transition-all duration-1000 rounded-full ${
                      currentSlide === index
                        ? "bg-primary w-12"
                        : "bg-foreground/10 w-6 group-hover:bg-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_var(--primary)]" 
              />
              <div className="w-[1px] h-20 bg-gradient-to-b from-primary/50 via-primary to-transparent" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showCursor ? 1 : 0 }}
            className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden md:block ${
              isDark ? "bg-white" : "bg-black"
            } -translate-x-1/2 -translate-y-1/2`}
            style={{
              x: mouseX,
              y: mouseY,
            }}
          />
        </>
      )}
    </section>
  );
}