import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import React, { Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { RefineContext } from "./_refine_context";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
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
      <body className={montserrat.className}>
        <Suspense>
          <RefineContext>{children}</RefineContext>
        </Suspense>
      </body>
    </html>
  );
}
