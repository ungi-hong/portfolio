"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/content";

const LINKS = [
  { href: "/", label: "ホーム" },
  { href: "/career", label: "経歴" },
  { href: "/works", label: "作品" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="nav" id="nav">
      <Link className="brand" href="/">
        <span className="mark" />
        {profile.brand}
      </Link>
      <nav>
        <ul className="nav-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={pathname === href ? "active" : undefined}>
                {label}
              </Link>
            </li>
          ))}
          <li className="hide-sm">
            <Link href="/#contact">連絡先</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
