import { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { RefineContext } from "./_refine_context";

const montserrat = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Wokflo",
  description: "Making handling task a personalized milestone",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={montserrat.className + "h-screen"}>
        <Suspense>
          <RefineContext>{children}</RefineContext>
        </Suspense>
      </body>
    </html>
  );
}
