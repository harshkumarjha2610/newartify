"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceHealthProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/analytics/config");
        const data = await res.json();
        if (data && typeof data.active === "boolean") {
          setIsActive(data.active);
        }
      } catch (err) {
        console.error("Health check failed:", err);
      } finally {
        setIsChecking(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isActive && !isChecking && (
          <motion.div
            key="loading-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background elements to match the site's premium feel */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative flex flex-col items-center gap-8">
              {/* Premium Spinner */}
              <div className="relative w-24 h-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-primary rounded-full shadow-[0_0_20px_rgba(0,159,227,0.3)]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-b-2 border-primary/30 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-8 bg-primary/20 rounded-full blur-sm"
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <motion.h2 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white text-xs font-black uppercase tracking-[0.4em] pl-[0.4em]"
                >
                  Establishing Secure Connection
                </motion.h2>
                <div className="flex gap-1.5 mt-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 text-[8px] font-mono uppercase tracking-widest text-white/20">
              {"system.runtime.init >> buffer_stream"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isActive && children}
    </>
  );
}
