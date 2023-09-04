import { Dictionary } from '@siberiana/schemas';
import Link from 'next/link';
import Image from "next/image";
import React from 'react'
import { getDictionary } from '~/lib/utils/getDictionary';
import SFUSvg from './SFUSvg';

export const revalidate = 86400

export default async function Footer() {

    const dict = await getDictionary();

    const dictResult = Dictionary.parse(dict);

    const year = new Date().getFullYear();

  return (
    <div className='w-full bg-beaver dark:bg-accent text-beaverLight font-Inter'>
        <div className="w-full border-b-[1px] border-beaverLight py-6">
            <div className="flex gap-6 lg:flex-row flex-col items-center justify-between mx-auto w-[95%] md:w-[85%]">
                <div className="flex lg:flex-row flex-col items-center gap-6">
                    <Link
                        href={"https://www.sfu-kras.ru/"}
                        target='__blank'
                        className="w-fit"
                    >
                        <SFUSvg className='max-h-12' />
                    </Link>
                    <Link
                        href={"https://priority2030.ru/"}
                        target='__blank'
                        className="w-fit"
                    >
                        <Image
                          src={"/images/priority2030.png"}
                          width={210}
                          height={50}
                          priority={true}
                          className={"max-h-12 object-contain w-auto h-auto"}
                          alt={"«Приоритет 2030»"}
                        />
                    </Link>
                </div>

                <div className="flex lg:flex-row flex-col gap-6 justify-end items-center">
                    {dictResult.footer.links.map((link, index) => (
                        <Link
                            key={index}
                            href={`${link.url}`}
                            className="uppercase xl:text-sm text-xs hover:underline underline-offset-2"
                        >
                          {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>

        <div className="w-full py-6">
            <div className="flex gap-6 lg:flex-row flex-col-reverse items-center justify-between mx-auto w-[95%] md:w-[85%]">
                <p className="text-xs">
                    ©{year}, {dictResult.footer.allRightRes}
                </p>

                <div className="flex gap-6 lg:flex-row flex-col justify-end items-center">
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
  )
}
