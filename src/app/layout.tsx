import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const BASE_URL = "https://thegpacalculator.net";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "GPA Calculator 2025-2026 — Weighted, Unweighted & UC GPA for High School",
    template: "%s | GPA Calculator 2025-2026",
  },
  description:
    "Free GPA calculator for high school students. Calculate your unweighted, weighted, and UC GPA. Supports AP, IB, Honors courses. Target any US college.",
  keywords: [
    "gpa calculator",
    "weighted gpa",
    "unweighted gpa",
    "uc gpa calculator",
    "high school gpa",
    "college gpa",
    "ap gpa calculator",
    "ib gpa calculator",
  ],
  openGraph: {
    title: "GPA Calculator for High School Students",
    description:
      "Calculate your weighted, unweighted, and UC GPA. Supports AP, IB, Honors courses for any target college.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
