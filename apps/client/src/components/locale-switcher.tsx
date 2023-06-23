"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocaleSwitcher({ locales }: { locales: string[] }) {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {locales.map((locale, index) => {
          return (
            <li key={index}>
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
