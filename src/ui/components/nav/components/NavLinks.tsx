import Link from "next/link";
import { NavLink } from "./NavLink";
import navData from "@/../public/navData.json";

export function NavLinks({ channel }: { channel: string }) {
  // navLinks는 GraphQL의 변수
  const navLinks = navData;

  return (
    <>
      <NavLink href="/">All</NavLink>
      {navLinks.menu?.items?.map((item) => {
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
