"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  categoryName: string;
  images: string[];
  description: string;
  techStack: string[];
  features: string[];
  link: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  allProjects: Project[];
  onProjectChange: (project: Project) => void;
}

export default function ProjectModal({ project, isOpen, onClose, allProjects, onProjectChange }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  if (!project) return null;

  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  const images = project.images || [];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl bg-card border border-primary/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-background/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-primary hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-xl"
            >
              <X size={24} />
            </button>

            {/* Left: Image Carousel Section */}
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-muted flex flex-col group">
              {images.length > 0 ? (
                <>
                  <div className="relative flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={images[currentImageIndex]}
                          alt={`${project.title} - Image ${currentImageIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Carousel Controls */}
                  {images.length > 1 && (
                    <>
                      <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary z-10">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary z-10">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      {/* Thumbnail Indicators */}
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10 px-4">
                        {images.map((_, idx) => (
                           <button 
                             key={idx}
                             onClick={() => setCurrentImageIndex(idx)}
                             className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white/80"}`}
                           />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-xs uppercase tracking-widest font-bold opacity-40">No Images Available</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>

            {/* Right: Info Section */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-8 mt-4 md:mt-0">
                    <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">
                      {project.categoryName}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-4">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4 text-primary">
                        <Cpu size={18} />
                        <span className="font-bold uppercase tracking-widest text-[10px]">Technology Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-bold text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-10">
                      <div className="flex items-center gap-2 mb-4 text-primary">
                        <CheckCircle2 size={18} />
                        <span className="font-bold uppercase tracking-widest text-[10px]">Key Features</span>
                      </div>
                      <ul className="grid grid-cols-1 gap-3">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Related Projects */}
                  {relatedProjects.length > 0 && (
                    <div className="mb-10 pt-10 border-t border-primary/10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-bold uppercase tracking-widest text-[10px] text-primary">More in this Category</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {relatedProjects.map((rel) => {
                          const relCover = rel.images && rel.images.length > 0 ? rel.images[0] : "";
                          return (
                            <button
                              key={rel.id}
                              onClick={() => {
                                onProjectChange(rel);
                              }}
                              className="group flex items-center gap-4 p-3 rounded-2xl bg-background/40 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all text-left"
                            >
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                                {relCover && <Image src={relCover} alt={rel.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">{rel.title}</h4>
                                <span className="text-[9px] uppercase tracking-widest text-muted-foreground">View Project</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {project.link && (
                    <div className="flex items-center gap-6 pt-6">
                      <MagneticButton>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-16 px-10 rounded-full bg-primary text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,159,227,0.3)] hover:shadow-[0_30px_60px_rgba(0,159,227,0.5)] transition-all hover:-translate-y-1 active:translate-y-0"
                        >
                          Launch Project
                          <ExternalLink size={18} />
                        </a>
                      </MagneticButton>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
