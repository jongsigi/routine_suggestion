import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-dvh">
      <body className="min-h-dvh">
        {children}
      </body>
    </html>
  );
}
