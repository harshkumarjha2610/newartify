"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { portfolioContent } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CaseStudiesSection() {
  // Show first 3 projects for the featured section
  const [featuredProjects, setFeaturedProjects] = useState<any[]>(portfolioContent.projects.slice(0, 3));

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedProjects(
            data.slice(0, 3).map((p: any) => ({
              ...p,
              id: p._id,
            }))
          );
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-32 overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale"
        >
          <source src="/3130182-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            {/* <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block"
            >
              Excellence in Action
            </motion.span> */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]"
            >
              Featured <span className="text-stroke-white">Success</span> <br /> Stories.
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <MagneticButton>
              <Link href="/portfolio" className="px-10 py-4 rounded-full border border-white/20 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all inline-block">
                View All Projects
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              href="/portfolio"
              className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/5"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 1 }}
                className="h-full w-full"
              >
                {project.images && project.images.length > 0 && (
                  <Image 
                    src={project.images[0]} 
                    alt={project.title} 
                    fill 
                    className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1.5s] ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <span className="text-primary font-black text-[8px] uppercase tracking-[0.4em] mb-2">{project.categoryId?.name || "Uncategorized"}</span>
                  <h3 className="text-2xl font-black text-white tracking-tighter mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-8 h-[1px] bg-white/40" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">View Case Study</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
