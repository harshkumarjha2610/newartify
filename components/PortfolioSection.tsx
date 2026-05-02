"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import ProjectModal from "./ProjectModal";
import { ArrowLeft } from "lucide-react";

export default function PortfolioSection({ initialCategories = [], initialProjects = [] }: { initialCategories?: any[], initialProjects?: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const filteredProjects = selectedCategory
    ? initialProjects.filter(p => p.categoryId === selectedCategory.id)
    : [];

  return (
    <section className="py-32 bg-background relative overflow-hidden min-h-[80vh]">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block"
          >
            {selectedCategory ? `Projects in ${selectedCategory.name}` : "Explore Categories"}
          </motion.span>
          <h2 className="text-fluid-h2 font-black mb-8 tracking-tighter text-foreground text-glow uppercase">
            {selectedCategory ? selectedCategory.name : "Our"} <span className="text-primary font-outline">{selectedCategory ? "Projects" : "Work"}</span>
          </h2>
          {selectedCategory && (
            <button 
              onClick={handleBackToCategories}
              className="mx-auto flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border border-border px-6 py-2 rounded-full hover:border-primary/50"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Categories
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            // CATEGORIES VIEW
            <motion.div
              key="categories-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {initialCategories.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground py-12">No categories are currently available.</div>
              ) : (
                initialCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative rounded-[3rem] overflow-hidden aspect-video md:aspect-[4/3] perspective-hover shimmer-border cursor-pointer focus:outline-none border border-border/40"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <Image 
                      src={category.image} 
                      alt={category.name} 
                      fill 
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 brightness-[0.6] group-hover:brightness-[0.8]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent transition-opacity duration-700" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">{category.name}</h3>
                      {category.description && (
                         <p className="text-xs text-white/70 line-clamp-2 mb-6 group-hover:text-white transition-colors">{category.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between mt-auto">
                        <MagneticButton>
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,159,227,0.5)] group/btn">
                            <i className="bi bi-arrow-right text-xl group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-transform"></i>
                          </div>
                        </MagneticButton>
                        <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">
                          View Projects
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            // PROJECTS VIEW
            <motion.div
              key="projects-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredProjects.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground py-12">No projects found in this category.</div>
              ) : (
                filteredProjects.map((project, index) => {
                  const coverImage = project.images && project.images.length > 0 ? project.images[0] : "";
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative rounded-[3rem] overflow-hidden aspect-[4/5] perspective-hover shimmer-border cursor-pointer focus:outline-none"
                      onClick={() => openProject(project)}
                    >
                      {coverImage && (
                        <Image 
                          src={coverImage} 
                          alt={project.title} 
                          fill 
                          className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 brightness-[0.7] saturate-[0.9]"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                        <span className="text-primary font-black text-[10px] mb-2 uppercase tracking-[0.4em]">{project.categoryName}</span>
                        <h3 className="text-xl md:text-2xl font-black text-white mb-6 leading-[1.1] tracking-tighter">{project.title}</h3>
                        
                        <div className="flex items-center justify-between">
                          <MagneticButton>
                            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,159,227,0.5)] group/btn">
                              <i className="bi bi-arrow-up-right text-xl group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"></i>
                            </div>
                          </MagneticButton>
                          
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/80 transition-colors">
                            View Project
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="section-blob bottom-[-10%] left-0 opacity-20" />

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allProjects={filteredProjects}
        onProjectChange={(project) => setSelectedProject(project)}
      />
    </section>
  );
}
