import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SiGi SkinCare",
  description: "피부MBTI : 피부타입 검사부터 스킨케어 제품 추천까지",
  openGraph: {
    type: "website",
    url: "https://sigiskincare.store",
    title: "SiGi SkinCare",
    description: "피부타입 검사부터 스킨케어 제품 추천까지",
    images: [
      {
        url: "/img/share.webp",
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
    images: ["/img/share.webp"],
  },
  other: {
	  "google-adsense-account": "ca-pub-1977720073946887", // Replace 'aaa' with your actual account ID
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-dvh">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1977720073946887"
          crossOrigin="anonymous" // Note the corrected camelCase: crossOrigin
        />
        {/* End Google AdSense */}
      </head>
      <body className={`${inter.className} min-h-dvh`}>
        {children}
      </body>
    </html>
  );
}
