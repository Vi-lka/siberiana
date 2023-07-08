import React from "react";
import Link from "next/link";
import { getDictionary } from "~/lib/utils/getDictionary";
import LogoSvg from "../LogoSvg";
import { ThemeToggle } from "../ui/ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";
import NavMenu from "./NavMenu";
import NavSheet from "./NavSheet";
import ButtonComponent from "../ui/ButtonComponent";

export default async function Header({ lang }: { lang: string }) {
  const dict = await getDictionary(lang);

  return (
    <div className="font-Inter text-graphite dark:text-beaverLight dark:bg-darkBlue fixed z-50 w-full bg-white p-4">
      <div className="mx-auto flex w-[95%] max-w-[1600px] items-center justify-between xl:w-[85%]">
        <div className="flex w-1/5">
          <Link
            href={`/${lang}`}
            className="relative h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
          >
            <LogoSvg isAdaptive />
          </Link>
        </div>

        <div className="hidden w-fit lg:block">
          <NavMenu menuData={dict.menu} />
        </div>

        <div className="flex w-1/5 items-center justify-end gap-2 xl:gap-3">
          <ThemeToggle />
          <LocaleSwitcher />

          {/* Desktop */}
          <div className="hidden lg:block">
            <Link href={`${lang}/login`}>
              <ButtonComponent className="px-10 py-6 uppercase">
                {dict.auth.mainButton}
              </ButtonComponent>
            </Link>
          </div>

          {/* Mobile */}
          <div className="block pl-2 lg:hidden">
            <NavSheet menuData={dict.menu} authDict={dict.auth} />
          </div>
        </div>
      </div>
    </div>
  );
}
