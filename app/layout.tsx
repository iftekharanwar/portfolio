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
  metadataBase: new URL('https://iftekharanwar.com'),
  title: "Iftekhar Anwar | Designer & Developer",
  description: "Student, builder, and creative technologist. I design and develop digital experiences with bold animations, thoughtful UX, and clean code. Apple Developers Academy alumnus.",
  keywords: ["Iftekhar Anwar", "designer", "developer", "portfolio", "web design", "UI/UX", "React", "Next.js", "creative developer", "Apple Developers Academy"],
  authors: [{ name: "Iftekhar Anwar" }],
  creator: "Iftekhar Anwar",
  applicationName: "Iftekhar Anwar",
  appleWebApp: {
    capable: true,
    title: "Iftekhar Anwar",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iftekharanwar.com",
    siteName: "Iftekhar Anwar Portfolio",
    title: "Iftekhar Anwar | Designer & Developer",
    description: "Student, builder, and creative technologist. I design and develop digital experiences.",
    images: [
      {
        url: "/og-image.png", // We'll create this
        width: 1200,
        height: 630,
        alt: "Iftekhar Anwar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iftekhar Anwar | Designer & Developer",
    description: "Student, builder, and creative technologist. I design and develop digital experiences.",
    images: ["/og-image.png"],
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#5A3C0B" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
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
