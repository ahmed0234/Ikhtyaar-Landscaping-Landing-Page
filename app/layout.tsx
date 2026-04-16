import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Righteous } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
});

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Ikhtyaar",
  description: "We run high converting Google Ads for insurance companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${geistSans.variable} ${geistMono.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
        <Script
          src="https://static.zcal.co/embed/v1/embed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
