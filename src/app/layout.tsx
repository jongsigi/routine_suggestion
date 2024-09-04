import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
// RootLayout?? >>
export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh">
			<body className={`${inter.className} min-h-dvh`}>
				{children}
			</body>
		</html>
	);
}
