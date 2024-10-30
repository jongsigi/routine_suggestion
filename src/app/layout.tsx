import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SiGi SkinCare",
  description: "SiGi SkinCare",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-dvh">
      <body className={`${inter.className} min-h-dvh`}>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1977720073946887"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
