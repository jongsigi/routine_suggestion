import { type ReactNode } from "react";
import { Header } from "@/ui/components/Header";

export const metadata = {
	title: "SiGi SkinCare",
	description: "SiGi SkinCare.",
    other: {
		"google-adsense-account": "ca-pub-1977720073946887", // Replace 'aaa' with your actual account ID
	},
};

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <>
            <Header />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
			</div>
        </>
    )
}
