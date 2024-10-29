import { type ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "SiGi SkinCare",
  description: "SiGi SkinCare",
};

export default function ChannelLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1977720073946887"
        crossOrigin="anonymous"
      />
    </>
  );
}
