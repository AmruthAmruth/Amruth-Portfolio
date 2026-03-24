import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import CustomCursor from "@/components/shared/CustomCursor";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Amruth Shyju | Full Stack Developer",
    template: "%s | Amruth Shyju"
  },
  description: "Amruth Shyju is a Full Stack Developer dedicated to building systems that outgrow their first version. Specializing in high-performance web applications and scalable architectures.",
  keywords: ["Amruth", "Amruth Shyju", "Full Stack Developer", "Software Engineer", "Portfolio", "Web Development", "React Developer", "Next.js"],
  authors: [{ name: "Amruth Shyju" }],
  creator: "Amruth Shyju",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amruth-portfolio-alpha.vercel.app/",
    title: "Amruth Shyju | Full Stack Developer",
    description: "Building systems that outgrow their first version. Full Stack Developer based in India.",
    siteName: "Amruth Shyju Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amruth Shyju | Full Stack Developer",
    description: "Building systems that outgrow their first version.",
    creator: "@amruthshyju", // Replace with actual if known
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Amruth Shyju",
    "url": "https://amruth-portfolio-alpha.vercel.app/",
    "jobTitle": "Full Stack Developer",
    "sameAs": [
      "https://www.linkedin.com/in/amruth-shyju",
      "https://www.instagram.com/amruth.shyju",
    ],
    "description": "Amruth Shyju is a Full Stack Developer who builds scalable, high-performance systems."
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="3DT0WQ-JeivTLVigVcLc3c9O3UKBaEp8PRGMJOUx82c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
