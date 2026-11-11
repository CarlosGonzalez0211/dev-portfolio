import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carlos Gonzalez | Developer Portfolio",
  description:
    "Developer portfolio — explore my work, experience, and projects in an interactive desktop environment.",
  keywords: [
    "developer",
    "portfolio",
    "full-stack",
    "software engineer",
    "Carlos Gonzalez",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Carlos Gonzalez" }],
  openGraph: {
    title: "Carlos Gonzalez | Developer Portfolio",
    description:
      "Interactive OS-themed developer portfolio. Explore projects, experience, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Gonzalez | Developer Portfolio",
    description:
      "Interactive OS-themed developer portfolio. Explore projects, experience, and more.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
