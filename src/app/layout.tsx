import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-dvh">
      <head>
        {/* Google AdSense */}
        <script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1977720073946887"
          async
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-dvh">
        {children}
      </body>
    </html>
  );
}
