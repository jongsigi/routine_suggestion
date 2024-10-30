"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const companyName = "SIGI";

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<h1 className="flex items-center font-bold text-2xl" aria-label="homepage">
				{companyName}
			</h1>
		);
	}
	return (
		<div className="flex items-center font-bold text-2xl">
			<Link aria-label="homepage" href="/">
				{companyName}
			</Link>
		</div>
	);
};
