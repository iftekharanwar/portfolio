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
  description: "Student, builder, and creative technologist. I design and develop premium digital experiences with bold animations, thoughtful UX, and clean code. Apple Developers Academy alumnus.",
  keywords: ["Iftekhar Anwar", "designer", "developer", "portfolio", "web design", "UI/UX", "React", "Next.js", "creative developer", "Apple Developers Academy"],
  authors: [{ name: "Iftekhar Anwar" }],
  creator: "Iftekhar Anwar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iftekharanwar.com",
    siteName: "Iftekhar Anwar Portfolio",
    title: "Iftekhar Anwar | Creative Designer & Developer",
    description: "Student, builder, and creative technologist crafting premium digital experiences.",
    images: [
      {
        url: "/og-image.jpg", // We'll create this
        width: 1200,
        height: 630,
        alt: "Iftekhar Anwar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iftekhar Anwar | Creative Designer & Developer",
    description: "Student, builder, and creative technologist crafting premium digital experiences.",
    images: ["/og-image.jpg"],
    creator: "@wespaxe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
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
