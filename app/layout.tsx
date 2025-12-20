import type { Metadata } from "next";
import { Playfair_Display, Cormorant, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iftekhar Anwar | Creative Designer & Developer",
  description: "Iftekhar Anwar - Creative designer and developer crafting premium digital experiences with stunning animations and elegant design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased`}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
