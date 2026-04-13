import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GlobalHUD } from "@/components/ui/GlobalHUD";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: 'swap' });

export const metadata: Metadata = {
  title: "Ronak Solanki — Cloud & DevOps Engineer",
  description:
    "A scroll-driven cinematic infrastructure story: cloud systems, CI/CD, Kubernetes, observability.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} antialiased`}>
      <body className="min-h-dvh bg-bg text-text-main selection:bg-brand-yellow selection:text-black">
        <GlobalHUD />
        {children}
      </body>
    </html>
  );
}
