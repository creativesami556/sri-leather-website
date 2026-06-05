import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sri Leather | Premium Handcrafted Footwear",
  description: "Crafting legacy through leather. Your destination for premium footwear since decades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow w-full pb-24 md:pb-8">{children}</main>
        <Footer />
        <BottomNavBar />
      </body>
    </html>
  );
}

