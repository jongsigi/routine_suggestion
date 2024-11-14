import { type ReactNode } from "react";
import { Header } from "@/ui/components/Header";

export const metadata = {
	title: "SiGi SkinCare",
	description: "K-Beauty Skincare Solution. Define your skintype and use right skincare routine.",
	openGraph: {
	  type: "website",
	  url: "https://sigiskincare.store",
	  title: "SiGi SkinCare",
	  description: "K-Beauty Skincare Solution. Define your skintype and use right skincare routine.",
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
	  description: "K-Beauty Skincare Solution. Define your skintype and use right skincare routine.",
	  images: ["/img/share.webp"], // This should match your Open Graph image
	},
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
