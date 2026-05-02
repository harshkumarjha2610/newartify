"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioContent } from "@/lib/data";

export default function IndustriesSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden noise">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4 flex items-center gap-3"
          >
            {/* <span className="w-8 h-[1px] bg-primary/30" />
            [03] INDUSTRIAL_DOMAINS */}
          </motion.div>
          <h2 className="text-fluid-h2 font-black mb-12 tracking-tighter text-foreground">Industries <span className="text-primary marker-highlight">we</span> work <span className="text-primary marker-highlight">in</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {portfolioContent.industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group border-b border-border pb-8 hover:border-primary/30 transition-colors"
              >
                <h4 className="text-xs font-mono font-bold text-foreground mb-3 group-hover:text-primary transition-colors tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {industry.name}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 group/img"
          >
            {/* Technical Corner Accents on Image */}
            <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/40 rounded-tl-xl z-20 group-hover/img:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/40 rounded-br-xl z-20 group-hover/img:scale-110 transition-transform duration-700" />
            
            <Image 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Industries"
              width={600}
              height={800}
              className="w-full h-auto grayscale saturate-50 contrast-125 hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none" />
            
            {/* Image Metadata Overlay */}
            <div className="absolute top-10 right-10 flex flex-col items-end gap-1 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700">
              <span className="text-[8px] font-mono text-white/50 tracking-widest uppercase bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">Img_ref: industrial_01</span>
              <span className="text-[8px] font-mono text-white/50 tracking-widest uppercase bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">Coord: [40.71, -74.00]</span>
            </div>
          </motion.div>
          
          <div className="section-blob bottom-[-10%] right-[-10%] opacity-30" />
        </div>
      </div>
    </section>
  );
}
