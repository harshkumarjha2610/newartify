// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

// const steps = [
//   {
//     number: "1",
//     title: "Discovery & Planning",
//     description: "Defining clear objectives and scope with actionable roadmaps tailored precisely to your business needs.",
//     color: "#3b82f6",
//     glow: "rgba(59, 130, 246, 0.4)",
//   },
//   {
//     number: "2",
//     title: "Design & Prototyping",
//     description: "Creating visual concepts and user-centric designs with interactive prototypes for immediate feedback.",
//     color: "#a855f7",
//     glow: "rgba(168, 85, 247, 0.4)",
//   },
//   {
//     number: "3",
//     title: "Development & Testing",
//     description: "Advanced architecture, API integration, and comprehensive automated testing for a flawless experience.",
//     color: "#ec4899",
//     glow: "rgba(236, 72, 153, 0.4)",
//   },
//   {
//     number: "4",
//     title: "Deployment & Optimization",
//     description: "Launching to live environments accompanied by continuous optimization based on real-world metadata.",
//     color: "#22c55e",
//     glow: "rgba(34, 197, 94, 0.4)",
//   },
//   {
//     number: "5",
//     title: "Marketing & Growth",
//     description: "Strategic multi-channel campaigns engineered to increase reach, scale engagement, and maximize ROI.",
//     color: "#ef4444",
//     glow: "rgba(239, 68, 68, 0.4)",
//   },
// ];

// const TOTAL = steps.length;
// const DEG_PER_CARD = 360 / TOTAL; // 72°
// const CYLINDER_RADIUS = 520; // px — controls how "wide" the carousel is

// function Card({
//   step,
//   index,
//   progress,
// }: {
//   step: (typeof steps)[0];
//   index: number;
//   progress: ReturnType<typeof useScroll>["scrollYProgress"];
// }) {
//   const target = index / (TOTAL - 1);

//   const opacity = useTransform(
//     progress,
//     [target - 0.22, target, target + 0.22],
//     [0.08, 1, 0.08]
//   );

//   const translateZ = useTransform(
//     progress,
//     [target - 0.22, target, target + 0.22],
//     [CYLINDER_RADIUS, CYLINDER_RADIUS + 140, CYLINDER_RADIUS]
//   );

//   const transform = useMotionTemplate`translate(-50%, -50%) rotateY(${
//     index * DEG_PER_CARD
//   }deg) translateZ(${translateZ}px)`;

//   const borderOpacity = useTransform(
//     progress,
//     [target - 0.22, target, target + 0.22],
//     [0, 1, 0]
//   );
//   const borderBoxShadow = useMotionTemplate`inset 0 0 40px ${step.glow}, 0 0 24px ${step.glow}`;

//   return (
//     <motion.div
//       className="absolute top-1/2 left-1/2"
//       style={{
//         width: "min(88vw, 480px)",
//         transformStyle: "preserve-3d",
//         transform,
//         opacity,
//       }}
//     >
//       <div className="relative w-full p-7 md:p-10 bg-[#0a0a0a]/70 backdrop-blur-2xl rounded-2xl border border-white/[0.07] shadow-2xl overflow-hidden">
//         {/* Active glow border */}
//         <motion.div
//           className="absolute inset-0 rounded-2xl pointer-events-none"
//           style={{ opacity: borderOpacity, boxShadow: borderBoxShadow }}
//         />

//         {/* Ghost number */}
//         <div
//           className="absolute -top-6 -right-4 text-[180px] font-black leading-none opacity-[0.035] select-none pointer-events-none"
//           style={{ color: step.color, fontVariantNumeric: "tabular-nums" }}
//         >
//           {step.number}
//         </div>

//         {/* Content */}
//         <div
//           className="relative z-10 flex flex-col gap-4"
//           style={{ transform: "translateZ(20px)" }}
//         >
//           {/* Phase badge row */}
//           <div className="flex items-center gap-3">
//             <div
//               className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base font-black shrink-0"
//               style={{
//                 backgroundColor: step.color,
//                 boxShadow: `0 0 20px ${step.glow}`,
//               }}
//             >
//               {step.number}
//             </div>
//             <span className="text-white/60 uppercase tracking-[0.18em] text-[10px] font-semibold border border-white/10 px-3 py-1 rounded-full bg-white/[0.04]">
//               Phase 0{step.number}
//             </span>
//           </div>

//           <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mt-1">
//             {step.title}
//           </h3>

//           <p className="text-sm md:text-base leading-relaxed text-gray-400">
//             {step.description}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default function ProcessSection() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Rotate cylinder: 0 → -(4 * 72)° = -288° over full scroll
//   const carouselRotationY = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [0, -(TOTAL - 1) * DEG_PER_CARD]
//   );
//   const carouselTransform = useMotionTemplate`translate(-50%, -50%) rotateY(${carouselRotationY}deg)`;

//   // Dynamic core beam color
//   const coreColor = useTransform(
//     scrollYProgress,
//     steps.map((_, i) => i / (TOTAL - 1)),
//     steps.map((s) => s.glow)
//   );
//   const coreBackground = useMotionTemplate`linear-gradient(to top, transparent, ${coreColor}, transparent)`;

//   return (
//     // 500vh gives a comfortable scroll pace — tweak if needed
//     <section ref={containerRef} className="bg-black relative h-[500vh]">
//       <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] border-y border-white/[0.04]">
//         {/* Subtle radial atmosphere */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.04)_0%,transparent_100%)] pointer-events-none" />

//         {/* Header */}
//         <div className="absolute top-8 md:top-14 w-full z-50 text-center px-6 pointer-events-none">
//           <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter text-white uppercase">
//             Our{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//               Proven
//             </span>{" "}
//             Process
//           </h2>
//           <p className="text-[10px] md:text-xs text-white/30 italic font-mono tracking-[0.25em] border border-white/[0.08] py-1.5 inline-block px-6 rounded-full bg-black/40 backdrop-blur-xl">
//             SCROLL TO ENGAGE SYSTEM SEQUENCE
//           </p>
//         </div>

//         {/* 3D Scene */}
//         <div
//           className="absolute inset-0 w-full h-full"
//           style={{ perspective: "1200px" }}
//         >
//           <div
//             className="w-full h-full relative"
//             style={{
//               transformStyle: "preserve-3d",
//               transform: "rotateX(-4deg) translateY(4vh)",
//             }}
//           >
//             {/* Floor rings */}
//             <div
//               className="absolute top-1/2 left-1/2 border border-white/[0.07] rounded-full"
//               style={{
//                 width: 1100,
//                 height: 1100,
//                 transform: "translate(-50%, -50%) rotateX(90deg) translateZ(-300px)",
//               }}
//             />
//             <div
//               className="absolute top-1/2 left-1/2 border border-white/[0.04] rounded-full"
//               style={{
//                 width: 1600,
//                 height: 1600,
//                 transform: "translate(-50%, -50%) rotateX(90deg) translateZ(-300px)",
//               }}
//             />

//             {/* Central glow beam */}
//             <motion.div
//               className="absolute top-1/2 left-1/2"
//               style={{
//                 width: 120,
//                 height: "110vh",
//                 transform: "translate(-50%, -50%)",
//                 background: coreBackground,
//                 filter: "blur(50px)",
//                 opacity: 0.55,
//               }}
//             />

//             {/* Rotating cylinder */}
//             <motion.div
//               className="absolute top-1/2 left-1/2 w-0 h-0"
//               style={{
//                 transformStyle: "preserve-3d",
//                 transform: carouselTransform,
//               }}
//             >
//               {steps.map((step, index) => (
//                 <Card
//                   key={step.title}
//                   step={step}
//                   index={index}
//                   progress={scrollYProgress}
//                 />
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* Scroll hint */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center opacity-30">
//           <div className="w-px h-10 bg-gradient-to-t from-white to-transparent mb-2" />
//           <span className="text-[9px] uppercase tracking-[0.3em] text-white font-semibold">
//             Scroll
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery & Planning",
    description: "Defining objectives and scope with actionable roadmaps tailored to your specific business needs.",
    color: "#93c5fd",
    gradient: "from-blue-300 to-cyan-200",
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description: "Visual concepts and user-centric designs with interactive prototypes for early feedback.",
    color: "#c4b5fd",
    gradient: "from-purple-300 to-pink-200",
  },
  {
    number: "03",
    title: "Development & Testing",
    description: "Advanced coding, integration, and comprehensive testing to ensure a bug-free experience.",
    color: "#99f6e4",
    gradient: "from-teal-200 to-emerald-200",
  },
  {
    number: "04",
    title: "Deployment & Optimization",
    description: "Launching to live environments and continuous optimization based on real-world data and feedback.",
    color: "#fde68a",
    gradient: "from-amber-200 to-orange-200",
  },
  {
    number: "05",
    title: "Marketing & Engagement",
    description: "Strategic multi-channel campaigns to increase reach, engagement, and maximize your ROI.",
    color: "#fecdd3",
    gradient: "from-rose-200 to-pink-100",
  },
];

// 3D Card Component with Three.js background and Framer Motion transforms
function Card3D({ step, index }: { step: typeof steps[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* FRONT: Colorful Background with Title */}
        <div 
          className={`absolute inset-0 p-5 rounded-[1.25rem] bg-gradient-to-br ${step.gradient} shadow-2xl z-20 flex flex-col items-center justify-center text-center overflow-hidden border border-white/20`}
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: `0 15px 30px -8px var(--card-shadow), 0 0 12px -4px ${step.color}66`
          }}
        >
          {/* Technical Corner Accents on Card Front */}
          <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-black/20 dark:border-white/20 rounded-tl-md" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-black/20 dark:border-white/20 rounded-br-md" />
          
          <div className="absolute top-3 right-4 text-[7px] font-mono text-black/40 dark:text-white/40 tracking-widest uppercase">
            PROC_ID: P-{step.number}
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)] pointer-events-none" />
          
          <h3 className="text-xl md:text-2xl font-black dark:text-black tracking-tight leading-tight uppercase relative z-10">
            {step.title}
          </h3>
          
          <div className="mt-4 h-1 w-14 bg-white/40 dark:bg-black/40 rounded-full group-hover:w-20 transition-all duration-500 relative z-10" />
          
          <div className="mt-6 text-[9px] font-black uppercase tracking-[0.3em] text-black/60 dark:text-black/60 group-hover:text-white dark:group-hover:text-black transition-colors relative z-10">
            Tap to Reveal
          </div>
        </div>

        {/* BACK: Colorful Background with Description */}
        <div 
          className={`relative p-5 rounded-[1.25rem] bg-gradient-to-br ${step.gradient} shadow-2xl border border-white/20`}
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)",
            boxShadow: `0 15px 30px -8px var(--card-shadow), 0 0 12px -4px ${step.color}66`
          }}
        >
          {/* Decorative Gloss */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-[1.25rem]" />

          <div className="relative z-10">
            {/* Title */}
            <h3 className="text-lg md:text-xl font-black text-black dark:text-black mb-3 tracking-tight uppercase border-b border-white/20 dark:border-black/20 pb-2">
              {step.title}
            </h3>
            
            {/* Description */}
            <p className="text-black/90 dark:text-black/90 text-xs md:text-sm leading-relaxed font-medium mb-4">
              {step.description}
            </p>
            
            {/* Progress/Status Indicator */}
            <div className="space-y-2">
              <div className="h-0.5 w-full bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
                <motion.div 
                   className="h-full bg-white/80 dark:bg-black/80"
                   initial={{ width: 0 }}
                   whileInView={{ width: "100%" }}
                   transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-black/70 dark:text-black/70">
                <span>NODE_STATUS: INITIALIZED</span>
                <span>VERIFIED: TRUE</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
               <div className="px-3 py-1 rounded-full border border-white/30 dark:border-black/30 bg-white/10 dark:bg-black/10 text-black dark:text-black text-[8px] font-black uppercase tracking-widest transition-all hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white">
                 Artify Studio
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Section Component
export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden min-h-screen">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] opacity-20 dark:opacity-30" />
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 flex items-center justify-center gap-3"
          >
            {/* <span className="w-8 h-[1px] bg-primary/30" />
            [04] STRATEGIC_WORKFLOW
            <span className="w-8 h-[1px] bg-primary/30" /> */}
          </motion.div>
          
          <div className="relative inline-block">
            {/* Header Corner Accents */}
            <div className="absolute -top-4 -left-8 w-6 h-6 border-l border-t border-primary/40 rounded-tl-lg" />
            <div className="absolute -bottom-4 -right-8 w-6 h-6 border-r border-b border-primary/40 rounded-br-lg" />
            
            <h2 className="text-fluid-h2 font-black mb-8 tracking-tighter text-foreground relative z-10">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Proven</span> Process
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A methodology built on precision, creativity, and technical excellence.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Animated Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2">
            <motion.div 
              style={{ height: lineHeight, opacity: lineOpacity }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            />
          </div>

          {/* Steps */}
          <div className="space-y-32">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Timeline Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-12 z-20"
                >
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${step.gradient} animate-pulse`} />
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.gradient} blur-md`} />
                </motion.div>

                {/* Content Layout */}
                <div className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}>
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                  
                  {/* Card Container */}
                  <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-12 max-w-sm">
                    <Card3D step={step} index={index} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}