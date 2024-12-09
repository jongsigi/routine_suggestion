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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-dvh">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NGXP6VXK');
            `,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google AdSense */}
        <Script
          id="adsense-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1977720073946887"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        {/* End Google AdSense */}
      </head>
      <body className={`${inter.className} min-h-dvh`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGXP6VXK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
