"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  const currentTheme = resolvedTheme || theme;
  const logoSrc = currentTheme != "dark" 
    ? "https://www.artifytechspace.com/images/logos/company-logo.png" 
    : "https://www.artifytechspace.com/images/logos/artify_techspace_logo_150px.png";
  
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            {mounted && (
              <Image
                src={logoSrc}
                alt="Artify TechSpace"
                width={150}
                height={50}
                className="object-contain"
              />
            )}
            {!mounted && <div className="h-[50px] w-[150px]" />}
            <p className="text-muted-foreground text-sm leading-relaxed">
              Artify Tech Space is your trusted digital partner, delivering creative, scalable solutions in web design, development, mobile apps, SEO, and digital marketing.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/artify.techspace" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://x.com/ArtifyTechspace" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.instagram.com/artifytechspace/" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/artify-techspace-563023375/" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary text-sm transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary text-sm transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/faqs" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-bold mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground text-sm">Web Development</li>
              <li className="text-muted-foreground text-sm">Mobile App Development</li>
              <li className="text-muted-foreground text-sm">UI/UX Design</li>
              <li className="text-muted-foreground text-sm">SEO Optimization</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-foreground font-bold mb-6">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary w-full text-foreground"
                required
              />
              <button 
                type="submit"
                disabled={subscribed}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-colors disabled:bg-emerald-500 disabled:cursor-default"
              >
                {subscribed ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-emerald-500 text-[10px] mt-2 font-bold uppercase tracking-wider">
                Successfully Subscribed!
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-muted-foreground">
          <p>© 2025 ARTIFY TECHSPACE. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/faqs" className="hover:text-foreground transition-colors">FAQs</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
