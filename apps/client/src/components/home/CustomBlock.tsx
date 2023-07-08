import React from 'react'
import { getCustomBlock } from '~/lib/queries/strapi-server'
import ImgTextOn from '../thumbnails/ImgTextOn'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function CustomBlock({ locale }: { locale: string }) {

  const data = await getCustomBlock(locale)
    
  return (
    <div className="font-OpenSans max-w-[1600px] w-[85%] mx-auto mt-16 mb-24">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-foreground uppercase">
          {data.title}
        </h1>

        <Link 
          href={`${locale}${data.url}`}
          className='flex gap-3 font-Inter uppercase text-beaver dark:text-beaverLight hover:underline'
        >
          <p className='md:block hidden'>{data.textUrl}</p>
          <ArrowRight className="lg:h-6 lg:w-6 h-10 w-10 stroke-1" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-4 grid-cols-1">
        {
          data.list.map((elem, index) => (
              <ImgTextOn 
                  key={index}
                  className={"aspect-square"}
                  title={elem.title}
                  src={elem.img.data?.attributes.url}
                  url={elem.url}
                  origin={"strapi"}
              />
          ))
        }
      </div>
    </div>
  )
}
