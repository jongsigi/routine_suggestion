import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SiGi SkinCare",
  description: "피부타입 검사부터 스킨케어 제품 추천까지",
  openGraph: {
    type: "website",
    url: "https://sigiskincare.store",
    title: "SiGi SkinCare",
    description: "피부타입 검사부터 스킨케어 제품 추천까지",
    images: [
      {
        url: "/img/share.webp", // Place this image in the public folder
        width: 1200,
        height: 630,
        alt: "SiGi Skincare Brand image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiGi SkinCare",
    description: "피부타입 검사부터 스킨케어 제품 추천까지",
    images: ["/img/share.webp"], // This should match your Open Graph image
  },
  other: {
    "google-adsense-account": "ca-pub-1977720073946887", // Replace 'aaa' with your actual account ID
  },
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
