import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Dictionary } from "@siberiana/schemas";

import { getDictionary } from "~/lib/utils/getDictionary";
import SFUSvg from "./SFUSvg";

export const revalidate = 3600;

export default async function Footer() {
  const dict = await getDictionary();

  const dictResult = Dictionary.parse(dict);

  const year = new Date().getFullYear();

  return (
    <div className="bg-beaver dark:bg-accent text-beaverLight font-Inter w-full">
      <div className="border-beaverLight w-full border-b-[1px] py-6">
        <div className="mx-auto flex w-[95%] flex-col items-center justify-between gap-6 md:w-[85%] lg:flex-row">
          <div className="flex flex-col items-center gap-6 lg:flex-row">
            <Link
              href={"https://www.sfu-kras.ru/"}
              target="__blank"
              className="w-fit"
            >
              <SFUSvg className="max-h-12" />
            </Link>
            <Link
              href={"https://priority2030.ru/"}
              target="__blank"
              className="w-fit"
            >
              <Image
                src={"/images/priority2030.png"}
                width={210}
                height={50}
                priority={true}
                className={"h-auto max-h-12 w-auto object-contain"}
                alt={"«Приоритет 2030»"}
              />
            </Link>
          </div>

          <div className="flex flex-col items-center justify-end gap-6 lg:flex-row">
            {dictResult.footer.links.map((link, index) => (
              <Link
                key={index}
                href={`${link.url}`}
                className="text-xs uppercase underline-offset-2 hover:underline xl:text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full py-6">
        <div className="mx-auto flex w-[95%] flex-col-reverse items-center justify-between gap-6 md:w-[85%] lg:flex-row">
          <p className="text-xs">
            ©{year}, {dictResult.footer.allRightRes}
          </p>

          <div className="flex flex-col items-center justify-end gap-6 lg:flex-row">
            <Link href={`/`} className="text-xs underline underline-offset-2">
              {dictResult.footer.privacyPol}
            </Link>
            <Link href={`/`} className="text-xs underline underline-offset-2">
              {dictResult.footer.termsOfUse}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
