import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import TechBackground from "@/components/TechBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceHealthProvider from "@/components/ServiceHealthProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARTIFY TECHSPACE | Design. Develop. Dominate.",
  description: "Empowering businesses with cutting-edge web, app, and SEO solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll />
          <TechBackground />
          <Background3D />
          <Header />
          <ServiceHealthProvider>
            <main className="min-h-screen">
              {children}
            </main>
          </ServiceHealthProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
