"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TechBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none bg-background">
      {/* 1. Base Layer: Light Gray SVG Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 60L0 60 0 0 60 0 60 60zM1 1L1 59 59 59 59 1 1 1z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* 2. Abstract Tech Images Layer (Low Opacity) */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] grayscale mix-blend-multiply dark:mix-blend-screen">
         <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url('https://www.transparenttextures.com/patterns/circuit-board.png')`,
              backgroundRepeat: 'repeat'
            }}
         />
      </div>

      {/* 3. Floating Organic Blobs (Pastel) */}
      <div className="absolute inset-0 blur-[120px] opacity-20 dark:opacity-30">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full animate-float-slow"
        />
        <motion.div 
          className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-purple-400/20 rounded-full animate-float-slower"
        />
        <motion.div 
          className="absolute -bottom-[5%] left-[15%] w-[30%] h-[30%] bg-pink-400/20 rounded-full animate-float-slow"
          style={{ animationDelay: '5s' }}
        />
      </div>

      {/* 4. Fine Grain / Noise (from existing design) */}
      <div className="noise absolute inset-0 opacity-[0.4] pointer-events-none" />
      
      {/* 5. Radial Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_80%)]" />
    </div>
  );
}
