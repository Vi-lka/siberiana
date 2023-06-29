import React from "react";
import Link from "next/link";

import LogoSvg from "./LogoSvg";
import NavButtonStack from "./ui/nav-button-stack";
import NavMenu from "./ui/nav-menu";

export default function Header({ lang }: { lang: string }) {
  return (
    <div className="font-Inter text-graphite dark:text-beaverLight mx-auto flex w-[95%] max-w-[1600px] items-center justify-between p-5 xl:w-[85%]">
      <div className="flex w-1/5">
        <Link
          href={`/${lang}`}
          className="relative h-[2.5rem] w-[7rem] md:h-[3.8125rem] md:w-[10rem]"
        >
          <LogoSvg isAdaptive />
        </Link>
      </div>
      <div className="hidden w-fit lg:block">
        <NavMenu />
      </div>
      <div className="flex w-1/5 items-center justify-end gap-2 xl:gap-3">
        <NavButtonStack />
      </div>
    </div>
  );
}
