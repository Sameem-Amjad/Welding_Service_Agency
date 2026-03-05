import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const oswald = Oswald({ subsets: ["latin"], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: "Forge & Spark | Precision Welding & Fabrication",
  description: "High-performance fabrication and structural welding services. Certified professionals delivering unyielding strength.",
  keywords: ["Welding", "Structural Welding", "Metal Fabrication", "Industrial Welding", "Mobile Welding"],
  openGraph: {
    title: "Forge & Spark | Precision Welding",
    description: "Built to last. Industrial & commercial welding services.",
    images: ['/og-image.jpg']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-zinc-950 text-zinc-300`}>
        {children}
      </body>
    </html>
  );
}