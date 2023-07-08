"use client"

//  to avoid props drilling (lang/locale) for client components
import { usePathname } from "next/navigation";

export function useLocale() {
  const pathName = usePathname();
  const segments = pathName.split("/");
  const locale = segments[1];

  return locale;
}
