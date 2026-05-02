"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-full w-10 h-10 border border-border" aria-label="Toggle theme">
        <div className="w-full h-full" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full w-10 h-10 border border-border hover:bg-muted transition-colors flex items-center justify-center text-foreground"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <i className="bi bi-sun-fill text-yellow-400"></i>
      ) : (
        <i className="bi bi-moon-stars-fill text-blue-500"></i>
      )}
    </button>
  );
}
