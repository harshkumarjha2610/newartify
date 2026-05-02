"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { homeContent } from "@/lib/data";
import { useRef } from "react";

export default function WhyChooseUsSection() {
  const { title, reasons, image } = homeContent.whyChooseUs;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const glowX = useTransform(mouseX, [0, 1000], [-200, 200]);
  const glowY = useTransform(mouseY, [0, 800], [-200, 200]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* 🎥 Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-20 pointer-events-none"
      >
        <source src="/vid.mp4" type="video/mp4" />
      </video>

      {/* Theme-aware overlay for readability */}
      <div className="absolute inset-0 bg-background/80 z-0" />

      {/* Mouse glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute w-[400px] h-[400px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] z-0"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-fluid-h2 font-black tracking-tighter text-foreground"
          >
            Why{" "}
            <span className="text-primary marker-highlight">Partners</span> choose{" "}
            Artify{" "}
            <span className="text-primary marker-highlight">Logic</span>.
          </motion.h2>
        </div>

        <div className="flex flex-col xl:flex-row items-center gap-24">
          {/* LEFT SIDE */}
          <div className="xl:w-7/12">
            {/* 🌌 Cards Background Wrapper */}
            <div className="relative p-10 rounded-[3rem] border border-border/10 bg-gradient-to-br from-foreground/[0.04] via-foreground/[0.02] to-transparent backdrop-blur-xl shadow-[0_0_80px_rgba(3,169,244,0.08)]">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.7 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="glass-neo p-8 rounded-[2rem] group relative overflow-hidden border-primary/10 hover:border-primary/40 transition-all"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-primary text-xs opacity-50">
                          0{index + 1}
                        </span>
                        <h5 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                          {reason.title}
                        </h5>
                      </div>

                      <p className="text-[12px] text-muted-foreground leading-relaxed font-medium">
                        {reason.description}
                      </p>
                    </div>

                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            style={{ scale, opacity }}
            className="xl:w-5/12 relative group"
          >
            <div className="relative rounded-[4rem] overflow-hidden border border-border/10 shadow-[0_0_100px_rgba(3,169,244,0.1)] z-10">
              <Image
                src={image}
                alt={title}
                width={800}
                height={1000}
                className="w-full h-auto object-cover transition-transform duration-[3s] group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-10 left-10 right-10 p-8 glass-neo rounded-3xl border-primary/20 backdrop-blur-3xl">
                <p className="text-foreground text-sm font-semibold italic leading-relaxed mb-4">
                  "Artify isn't just a service provider; they are the architectural pulse of our digital scalability."
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-1 bg-primary rounded-full" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
                    Scale with Innovation
                  </span>
                </div>
              </div>
            </div>

            {/* Orbit rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 border border-primary/20 rounded-full border-dashed -z-10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-20 border border-primary/5 rounded-full -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
