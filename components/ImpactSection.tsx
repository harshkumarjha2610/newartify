"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

const stats = [
  { label: "Successful Projects", value: 250, suffix: "+" },
  { label: "Global Clients", value: 45, suffix: "+" },
  { label: "Countries Reached", value: 15, suffix: "+" },
  { label: "Years of Excellence", value: 10, suffix: "+" },
];

export default function ImpactSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden text-foreground">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-fluid-h2 font-black mb-6 tracking-tighter uppercase">
            Our <span className="text-primary marker-highlight">Impact</span> in Numbers
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-4">
                 <h3 className="text-6xl md:text-7xl font-black tracking-tighter group-hover:text-primary transition-colors duration-500">
                   <Counter value={stat.value} suffix={stat.suffix} />
                 </h3>
                 <div className="absolute -bottom-2 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
              </div>
              <p className="text-xs uppercase font-black tracking-[0.5em] text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Milestone Gaps Fillers */}
        <div className="mt-24 pt-12 border-t border-primary/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
           <div className="text-center">
              {/* <span className="text-[10px] font-mono tracking-widest text-primary block mb-2">// RELIABILITY</span> */}
              <p className="text-xs font-black uppercase">99.9% Uptime Goal</p>
           </div>
           <div className="text-center">
              {/* <span className="text-[10px] font-mono tracking-widest text-primary block mb-2">// VELOCITY</span> */}
              <p className="text-xs font-black uppercase">Agile Sprints</p>
           </div>
           <div className="text-center">
              {/* <span className="text-[10px] font-mono tracking-widest text-primary block mb-2">// SUPPORT</span> */}
              <p className="text-xs font-black uppercase">24/7 Monitoring</p>
           </div>
           <div className="text-center">
              {/* <span className="text-[10px] font-mono tracking-widest text-primary block mb-2">// INNOVATION</span> */}
              <p className="text-xs font-black uppercase">Future-Proof Tech</p>
           </div>
        </div>
      </div>
      
      {/* Decorative Line */}
      <div className="absolute top-[10%] left-0 w-full h-[1px] bg-border/20" />
      <div className="absolute bottom-[10%] left-0 w-full h-[1px] bg-border/20" />
    </section>
  );
}
