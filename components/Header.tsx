"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

const menuItems = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Services", url: "/services" },
  { label: "Portfolio", url: "/portfolio" },
  { label: "FAQs", url: "/faqs" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isWhiteText = (resolvedTheme === "dark");
  const previousLogoSrc = !isWhiteText
    ? "https://www.artifytechspace.com/images/logos/company-logo.png"
    : "https://www.artifytechspace.com/images/logos/artify_techspace_logo_150px.png";
  const newLogoSrc = isWhiteText 
    ? "/logo/Dark.png" 
    : "/logo/Light.png";

  const logoSrc = (isScrolled && !mobileMenuOpen) ? newLogoSrc : previousLogoSrc;

  return (
    <nav
      className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-500 ease-in-out ${
        mobileMenuOpen
          ? `top-0 w-full rounded-none py-4 bg-transparent border border-transparent ${resolvedTheme === "dark" ? "text-white" : "text-black"}`
          : isScrolled
            ? `top-4 w-[95%] md:w-[85%] max-w-6xl py-1 shadow-lg border border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 rounded-full ${resolvedTheme === "dark" ? "text-white" : "text-black"}`
            : `top-0 w-full rounded-none py-3 bg-transparent border border-transparent`
      }`}
    >
      <div className={`w-full flex items-center justify-between transition-all duration-500 ${isScrolled && !mobileMenuOpen ? "px-6 md:px-8" : "px-6 md:px-12"}`}>
        {/* LOGO */}
        <Link href="/" className="relative h-15 w-55 group">
          {mounted && (
            <Image
              src={logoSrc}
              alt="Artify TechSpace"
              fill
              priority
              className="object-contain object-left transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!mounted && <div className="h-10 w-40" />}
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-10">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className="text-sm font-semibold hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center space-x-4 pl-4 border-l border-border">
            <ThemeToggle />
            <Link href="/contact" className="btn-theme text-sm">
              Contact
            </Link>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${isScrolled || mobileMenuOpen ? "text-foreground" : resolvedTheme === "dark" ? "text-white" : "text-black"}`}
          >
            <i
              className={`bi ${
                mobileMenuOpen ? "bi-x-lg" : "bi-list"
              } text-2xl`}
            ></i>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* BACKGROUND BLUR OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/60 backdrop-blur-xl z-10 md:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 w-full z-[70] md:hidden overflow-hidden"
            >
              <div className="p-6 flex flex-col space-y-4">
                {/* Logo in Mobile Menu */}
                <div className="flex justify-center mb-4">
                  <Image
                    src={logoSrc}
                    alt="Artify TechSpace"
                    width={180}
                    height={60}
                    className="object-contain"
                  />
                </div>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  <Link
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-[1.5rem] bg-background/30 backdrop-blur-lg border border-foreground/10 hover:bg-background/60 transition-all group shadow-xl"
                  >
                    <span className="text-lg font-black text-foreground group-hover:text-primary transition-colors tracking-tighter">
                      {item.label}
                    </span>
                    <i className="bi bi-chevron-right text-primary/40 group-hover:text-primary transition-colors"></i>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.1 + 0.1 }}
                className="pt-3"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center p-5 rounded-[1.5rem] bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/30 backdrop-blur-md"
                >
                  Work With Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
