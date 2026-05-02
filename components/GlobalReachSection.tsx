// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// const hubs = [
//   { id: "na", name: "North America", city: "New York / SF", cx: "18%", cy: "38%", projects: "120+", status: "Active" },
//   { id: "eu", name: "Europe", city: "London / Berlin", cx: "46%", cy: "28%", projects: "85+", status: "Scaling" },
//   { id: "as", name: "Asia Pacific", city: "Delhi / Singapore", cx: "72%", cy: "42%", projects: "150+", status: "Core" },
//   { id: "me", name: "Middle East", city: "Dubai", cx: "58%", cy: "44%", projects: "40+", status: "Growth" },
// ];

// // Hub positions in SVG viewBox coords (560x300) — tuned to match standard Mercator world.svg
// // These assume your world.svg is a standard Natural Earth / GeoJSON-style Mercator projection

// export default function GlobalReachSection() {
//   const [activeHub, setActiveHub] = useState(hubs[0]);
//   const [tick, setTick] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => setTick(p => p + 1), 80);
//     return () => clearInterval(t);
//   }, []);

//   // Hub positions in SVG viewBox coords (560x300)
//   const hubSvgCoords = {
//     na: { svgX: 108, svgY: 115 },
//     eu: { svgX: 232, svgY: 84 },
//     as: { svgX: 335, svgY: 118 },
//     me: { svgX: 292, svgY: 106 },
//   };

//   return (
//     <section className="py-32 bg-[#050505] relative overflow-hidden text-white">
//       {/* Background glow */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_50%,rgba(0,159,227,0.08),transparent_65%)] pointer-events-none" />
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_70%,rgba(0,80,160,0.06),transparent_50%)] pointer-events-none" />

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="flex flex-col lg:flex-row gap-16 items-center">

//           {/* LEFT: Control Panel */}
//           <div className="w-full lg:w-2/5 flex flex-col justify-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//             >
//               {/* Eyebrow */}
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="w-8 h-[1px] bg-[#009FE3]" />
//                 {/* <span className="text-[#009FE3] font-mono text-[10px] tracking-[0.4em] uppercase">Global Network</span> */}
//               </div>

//               {/* Heading */}
//               <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-4">
//                 <span className="block text-white">Where</span>
//                 <span className="block relative">
//                   <span
//                     className="text-transparent bg-clip-text"
//                     style={{
//                       backgroundImage: "linear-gradient(135deg, #009FE3 0%, #00cfff 40%, #ffffff 70%, #009FE3 100%)",
//                       backgroundSize: "200% 200%",
//                     }}
//                   >
//                     Ideas
//                   </span>
//                   <span className="text-white"> Live.</span>
//                 </span>
//               </h2>
//               <p className="text-white/40 text-sm font-light tracking-wide mb-12 max-w-xs">
//                 Four continents. One network. Delivering at the speed of ambition.
//               </p>

//               {/* Hub List */}
//               <div className="space-y-3 mb-12">
//                 {hubs.map((hub, i) => (
//                   <motion.div
//                     key={hub.id}
//                     onMouseEnter={() => setActiveHub(hub)}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                     className={`group cursor-pointer px-5 py-4 rounded-xl border transition-all duration-400 ${
//                       activeHub.id === hub.id
//                         ? "bg-[#009FE3]/10 border-[#009FE3]/40 shadow-[0_0_24px_rgba(0,159,227,0.12)]"
//                         : "bg-white/[0.03] border-white/[0.07] hover:border-white/20"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                           activeHub.id === hub.id ? "bg-[#009FE3] shadow-[0_0_8px_#009FE3]" : "bg-white/20"
//                         }`} />
//                         <div>
//                           <h3 className="text-sm font-bold tracking-tight">{hub.name}</h3>
//                           <p className="text-[10px] text-white/35 font-medium uppercase tracking-widest">{hub.city}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <span className="text-[10px] text-white/40 font-mono">{hub.projects}</span>
//                         <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
//                           hub.status === "Core" ? "bg-[#009FE3] text-white" :
//                           hub.status === "Active" ? "bg-emerald-500/20 text-emerald-400" :
//                           "bg-white/10 text-white/50"
//                         }`}>
//                           {hub.status}
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Stats Row */}
//               <div className="flex items-center gap-8 pt-6 border-t border-white/[0.06]">
//                 {[["24/7", "Global Support"], ["4", "Continents"], ["15+", "Jurisdictions"]].map(([val, label]) => (
//                   <div key={label}>
//                     <div className="text-xl font-black text-[#009FE3] font-mono">{val}</div>
//                     <div className="text-[8px] font-bold text-white/35 uppercase tracking-widest">{label}</div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT: Map */}
//           <div className="w-full lg:w-3/5 relative">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               {/* Map container with glass border */}
//               <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
//                 style={{ boxShadow: "0 0 80px rgba(0,159,227,0.06), inset 0 1px 0 rgba(255,255,255,0.05)" }}
//               >
//                 {/* HUD top bar */}
//                 <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 rounded-full bg-[#009FE3] animate-pulse" />
//                     <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">Live Network Status</span>
//                   </div>
//                   <span className="text-[9px] font-mono text-white/25">{tick % 2 === 0 ? "■ TRANSMITTING" : "□ TRANSMITTING"}</span>
//                 </div>

//                 {/* SVG World Map */}
//                 <div className="relative p-4">
//                   {/* 
//                     Map layer stack:
//                     1. world.svg as base image (invert+hue-rotate for dark tactical look)
//                     2. SVG overlay for grid, connection lines, hub markers — positioned absolutely on top
//                     Both share the same aspect ratio so coordinates align perfectly.
                    
//                     Hub % positions below are for a standard Mercator world.svg.
//                     If your SVG has a different projection, tweak hubSvgCoords percentages accordingly.
//                   */}
//                   <div className="relative w-full" style={{ aspectRatio: "560/300" }}>

//                     {/* Base map image — white landmass silhouette */}
//                     <img
//                       src="/world.svg"
//                       alt="World Map"
//                       className="absolute inset-0 w-full h-full object-contain"
//                       style={{
//                         filter: "invert(1) brightness(2) contrast(1.5) opacity(0.55)",
//                         pointerEvents: "none",
//                         userSelect: "none",
//                       }}
//                     />
//                     {/* Blue-cyan tint layer */}
//                     <img
//                       src="/world.svg"
//                       alt=""
//                       aria-hidden="true"
//                       className="absolute inset-0 w-full h-full object-contain"
//                       style={{
//                         filter: "invert(1) sepia(1) saturate(10) hue-rotate(175deg) brightness(1.5) opacity(0.25)",
//                         mixBlendMode: "screen",
//                         pointerEvents: "none",
//                         userSelect: "none",
//                       }}
//                     />

//                     {/* SVG overlay: grid + connections + hub markers */}
//                     <svg
//                       viewBox="0 0 560 300"
//                       className="absolute inset-0 w-full h-full"
//                       xmlns="http://www.w3.org/2000/svg"
//                       style={{ overflow: "visible" }}
//                     >
//                       <defs>
//                         <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
//                           <stop offset="0%" stopColor="rgba(0,159,227,0.12)" />
//                           <stop offset="100%" stopColor="rgba(0,0,0,0)" />
//                         </radialGradient>
//                         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//                           <feGaussianBlur stdDeviation="3" result="blur" />
//                           <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
//                         </filter>
//                       </defs>

//                       {/* Ambient glow */}
//                       <ellipse cx="280" cy="150" rx="260" ry="145" fill="url(#mapGlow)" />

//                       {/* Grid lines */}
//                       {[60,90,120,150,180,210,240].map(y => (
//                         <line key={y} x1="10" y1={y} x2="550" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
//                       ))}
//                       {[70,140,210,280,350,420,490].map(x => (
//                         <line key={x} x1={x} y1="20" x2={x} y2="280" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
//                       ))}

//                       {/* Connection lines between hubs */}
//                       {[
//                         { x1: 108, y1: 118, x2: 232, y2: 87 },
//                         { x1: 232, y1: 87,  x2: 295, y2: 108 },
//                         { x1: 295, y1: 108, x2: 340, y2: 120 },
//                         { x1: 108, y1: 118, x2: 340, y2: 120 },
//                       ].map((ln, i) => (
//                         <g key={i}>
//                           {/* Static dim dashed base */}
//                           <line
//                             x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
//                             stroke="rgba(0,159,227,0.1)"
//                             strokeWidth="1"
//                             strokeDasharray="3 7"
//                           />
//                           {/* Animated traveling dot */}
//                           <motion.line
//                             x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
//                             stroke="#009FE3"
//                             strokeWidth="1.5"
//                             strokeOpacity="0.6"
//                             strokeDasharray="6 200"
//                             initial={{ strokeDashoffset: 0 }}
//                             animate={{ strokeDashoffset: -300 }}
//                             transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, ease: "linear", delay: i * 0.6 }}
//                           />
//                         </g>
//                       ))}

//                       {/* Hub markers */}
//                       {hubs.map((hub) => {
//                         const { svgX, svgY } = hubSvgCoords[hub.id];
//                         const isActive = activeHub.id === hub.id;
//                         return (
//                           <g key={hub.id} style={{ cursor: "pointer" }} onClick={() => setActiveHub(hub)}>
//                             {/* Outer pulse rings — only on active */}
//                             {isActive && (
//                               <>
//                                 <motion.circle cx={svgX} cy={svgY} r="4"
//                                   fill="none" stroke="#009FE3" strokeWidth="1"
//                                   animate={{ r: [4, 20], opacity: [0.9, 0] }}
//                                   transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
//                                 />
//                                 <motion.circle cx={svgX} cy={svgY} r="4"
//                                   fill="none" stroke="#009FE3" strokeWidth="0.6"
//                                   animate={{ r: [4, 32], opacity: [0.5, 0] }}
//                                   transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
//                                 />
//                               </>
//                             )}
//                             {/* Inactive ring */}
//                             {!isActive && (
//                               <circle cx={svgX} cy={svgY} r="5"
//                                 fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"
//                               />
//                             )}
//                             {/* Core dot */}
//                             <circle cx={svgX} cy={svgY} r={isActive ? 3.5 : 2.5}
//                               fill={isActive ? "#009FE3" : "rgba(255,255,255,0.4)"}
//                             />
//                             {isActive && (
//                               <circle cx={svgX} cy={svgY} r="3.5" fill="#009FE3" filter="url(#glow)" />
//                             )}
//                             {/* Label */}
//                             <text
//                               x={svgX + 7} y={svgY - 6}
//                               fontSize="7.5"
//                               fill={isActive ? "#009FE3" : "rgba(255,255,255,0.28)"}
//                               fontFamily="monospace"
//                               fontWeight="700"
//                               letterSpacing="0.08em"
//                             >
//                               {hub.name.split(" ")[0].toUpperCase()}
//                             </text>
//                           </g>
//                         );
//                       })}
//                     </svg>

//                     {/* Active Hub Data Overlay */}
//                     <AnimatePresence mode="wait">
//                       <motion.div
//                         key={activeHub.id}
//                         initial={{ opacity: 0, y: 8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -8 }}
//                         transition={{ duration: 0.3 }}
//                         className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xl border border-[#009FE3]/20 rounded-xl p-4 min-w-[155px] z-10"
//                         style={{ boxShadow: "0 0 20px rgba(0,159,227,0.1)" }}
//                       >
//                         <div className="text-[8px] font-mono text-[#009FE3] uppercase tracking-widest mb-1.5">Active Hub</div>
//                         <div className="text-sm font-bold mb-3">{activeHub.name}</div>
//                         <div className="grid grid-cols-2 gap-3">
//                           <div>
//                             <div className="text-[7px] text-white/35 uppercase font-bold mb-0.5">Projects</div>
//                             <div className="text-xs font-bold font-mono text-[#009FE3]">{activeHub.projects}</div>
//                           </div>
//                           <div>
//                             <div className="text-[7px] text-white/35 uppercase font-bold mb-0.5">Latency</div>
//                             <div className="text-xs font-bold font-mono text-white">12ms</div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     </AnimatePresence>

//                   </div>
//                 </div>

//                 {/* HUD bottom bar */}
//                 <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.05]">
//                   <span className="text-[8px] font-mono text-white/20">MERCATOR · v2.4.1</span>
//                   <div className="flex items-center gap-4">
//                     {hubs.map(h => (
//                       <div key={h.id} className="flex items-center gap-1.5" onClick={() => setActiveHub(h)} style={{ cursor: "pointer" }}>
//                         <div className={`w-1 h-1 rounded-full ${activeHub.id === h.id ? "bg-[#009FE3]" : "bg-white/20"}`} />
//                         <span className={`text-[7px] font-mono uppercase ${activeHub.id === h.id ? "text-[#009FE3]" : "text-white/25"}`}>{h.id.toUpperCase()}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Corner accents */}
//               <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#009FE3]/30 rounded-tl pointer-events-none" />
//               <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#009FE3]/30 rounded-tr pointer-events-none" />
//               <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#009FE3]/30 rounded-bl pointer-events-none" />
//               <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#009FE3]/30 rounded-br pointer-events-none" />
//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ---------------- TYPES ---------------- */

type HubId = "na" | "eu" | "as" | "uae" | "in" | "bd";

type Hub = {
  id: HubId;
  name: string;
  city: string;
  cx: string;
  cy: string;
  projects: string;
  status: "Active" | "Scaling" | "Core" | "Growth";
};

/* ---------------- DATA ---------------- */

const hubs: Hub[] = [
  { id: "na", name: "North America", city: "New York / SF", cx: "22.0%", cy: "32.7%", projects: "120+", status: "Active" },
  { id: "eu", name: "Europe", city: "London / Berlin", cx: "52.0%", cy: "23.3%", projects: "85+", status: "Scaling" },
  { id: "uae", name: "UAE", city: "Dubai", cx: "64.8%", cy: "39.3%", projects: "40+", status: "Growth" },
  { id: "in", name: "India", city: "Mumbai / Delhi", cx: "70.5%", cy: "41.4%", projects: "110+", status: "Core" },
  { id: "bd", name: "Bangladesh", city: "Dhaka", cx: "75.0%", cy: "42.0%", projects: "30+", status: "Growth" },
  // { id: "as", name: "Asia Pacific", city: "Singapore / Tokyo", cx: "78.5%", cy: "56.0%", projects: "150+", status: "Core" },
];

const hubSvgCoords: Record<HubId, { svgX: number; svgY: number }> = {
  na: { svgX: 440, svgY: 280 },
  eu: { svgX: 1040, svgY: 200 },
  uae: { svgX: 1236, svgY: 337 },
  in: { svgX: 1420, svgY: 355 },
  bd: { svgX: 1481, svgY: 345 },
  as: { svgX: 1570, svgY: 480 },
};

/* ---------------- COMPONENT ---------------- */

export default function GlobalReachSection() {
  const [activeHub, setActiveHub] = useState<Hub>(hubs[0]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 1), 80);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_50%,rgba(0,159,227,0.08),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_70%,rgba(0,80,160,0.06),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* LEFT PANEL */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-fluid-h2 font-black leading-[0.9] tracking-tighter mb-4">
                <span className="block">Where</span>
                <span className="block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009FE3] via-white to-[#009FE3]">
                    Ideas
                  </span>{" "}
                  Live.
                </span>
              </h2>

              <div className="space-y-3 mb-12">
                {hubs.map((hub) => (
                  <div
                    key={hub.id}
                    onMouseEnter={() => setActiveHub(hub)}
                    className={`cursor-pointer px-5 py-4 rounded-xl border transition ${
                      activeHub.id === hub.id
                        ? "bg-[#009FE3]/10 border-[#009FE3]/40"
                        : "bg-white/[0.03] border-white/[0.07]"
                    }`}
                  >
                    {hub.name}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT MAP */}
          <div className="w-full lg:w-3/5 relative">
            <div className="relative w-full" style={{ aspectRatio: "2000/857" }}>

              <img
                src="/world.svg"
                alt="World Map"
                className="absolute inset-0 w-full h-full object-contain opacity-60"
              />

              <svg viewBox="0 0 2000 857" className="absolute inset-0 w-full h-full">

                {/* HUB MARKERS */}
                {hubs.map((hub) => {
                  const { svgX, svgY } = hubSvgCoords[hub.id];
                  const isActive = activeHub.id === hub.id;

                  return (
                    <g key={hub.id} onClick={() => setActiveHub(hub)} style={{ cursor: "pointer" }}>
                      <circle
                        cx={svgX}
                        cy={svgY}
                        r={isActive ? 15 : 10}
                        fill={isActive ? "#009FE3" : "white"}
                        className="transition-all duration-300"
                      />

                      <text
                        x={svgX + 25}
                        y={svgY - 20}
                        fontSize="24"
                        fill={isActive ? "#009FE3" : "rgba(255,255,255,0.4)"}
                        fontFamily="monospace"
                        fontWeight="700"
                      >
                        {hub.name.split(" ")[0].toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* ACTIVE HUB CARD */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHub.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute bottom-2 right-2 bg-black/75 border border-[#009FE3]/20 rounded-xl p-4"
                >
                  <div className="text-xs font-bold text-[#009FE3] mb-1">
                    {activeHub.name}
                  </div>
                  <div className="text-xs text-white/60">
                    Projects: {activeHub.projects}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}