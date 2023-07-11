"use client"

import type { BreadcrumbsDictType } from '@siberiana/schemas';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useLocale } from '~/lib/utils/useLocale';

export default function Breadcrumbs({ dict }: { dict: BreadcrumbsDictType }) {

    const pathname = usePathname();

    const locale = useLocale()
    
    const breadcrumbs = React.useMemo(function generateBreadcrumbs() {
        // Remove query parameters TODO: excluding categories and collections
        const pathWithoutQuery = pathname.split("?")[0];
    
        // Ex:"/my/nested/path" --> ["my", "nested", "path"]
        const pathNestedRoutes = pathWithoutQuery.split("/")
                                                     .filter(v => v.length > 0)

        // Remove locale
        pathNestedRoutes.shift()
    
        const crumblist = pathNestedRoutes.map((subpath, index) => {
          const href = `/${locale}/` + pathNestedRoutes.slice(0, index + 1).join("/");
          const title = subpath;
          return { href, title }; 
        })
    
        return [{ href: `/${locale}`, title: `${dict.home}` }, ...crumblist];
    }, [dict.home, locale, pathname])

    console.log(breadcrumbs)

  return (
    <div className='font-Inter flex items-center'>
        {breadcrumbs.map((crumb, index) => (
            <Crumb 
                key={index}  
                text={crumb.title}
                href={crumb.href}
                last={index === breadcrumbs.length - 1} 
            />
        ))}
    </div>
  )
}

function Crumb({ text, href, last=false }: { text: string, href: string, last: boolean}) {
    // The last crumb is rendered as normal text
    if (last) {
      return <span className='font-semibold'>{text}</span>
    }
  
    return (
        <>
            <Link href={href} className='hover:underline'>
              {text}
            </Link>
            <ChevronRight className='mr-2 ml-2 w-5 h-5' />
        </>
    );
  }
