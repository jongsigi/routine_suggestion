import { type ReactNode } from "react";
import { Header } from "@/ui/components/Header";

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <>
      <body>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1977720073946887"
          crossOrigin="anonymous" // Note the corrected camelCase: crossOrigin
        />
        {/* End Google AdSense */}
      </body>
      <Header />
      <div className="flex min-h-[calc(100dvh-64px)] flex-col">
        <main className="flex-1">{props.children}</main>
      </div>
    </>
  );
}
