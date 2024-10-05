import Link from "next/link";
import { NavLink } from "./NavLink";
import navLinksDocument from "@/../public/NavLinksDocument.json";

export function NavLinks({ channel }: { channel: string }) {
  // navLinks는 GraphQL의 변수
  const navLinks = navLinksDocument;

  return (
    <>
      {/* <NavLink href="/">All</NavLink> */}
      {navLinks.navLinks?.map((item) => {
        if (item.category) {
          return (
            <NavLink key={item.id} href={`/${item.category.slug}`}>
              {item.category.name}
            </NavLink>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
