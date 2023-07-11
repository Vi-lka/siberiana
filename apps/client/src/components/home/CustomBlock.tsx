import React from 'react'
import { getCustomBlock } from '~/lib/queries/strapi-server'
import ImgTextOn from '../thumbnails/ImgTextOn'
import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { CustomBlockSchema } from '@siberiana/schemas'
import { Alert, AlertTitle, AlertDescription } from '@siberiana/ui'

export default async function CustomBlock({ locale }: { locale: string }) {

  const data = await getCustomBlock(locale)

  const dataResult = CustomBlockSchema.safeParse(data);  

  // TODO Maybe: if user is an admin, show him an error message
  if (!dataResult.success) {
    // TODO: change on session admin
    if (locale === "ru") {
      return (
        <Alert variant="destructive" className='max-w-[1600px] w-[85%] mx-auto mb-24'>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <pre>
              {dataResult.error.message} - on CustomBlock
            </pre>
          </AlertDescription>
        </Alert>
      )
    } else return null
  }
    
  return (
    <div className="font-OpenSans max-w-[1600px] w-[85%] mx-auto mb-24">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-foreground uppercase">
          {dataResult.data.title}
        </h1>

        <Link 
          href={`${locale}${dataResult.data.url}`}
          className='flex gap-3 font-Inter uppercase text-beaver dark:text-beaverLight hover:underline'
        >
          <p className='md:block hidden'>{dataResult.data.textUrl}</p>
          <ArrowRight className="lg:h-6 lg:w-6 h-10 w-10 stroke-1" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-4 grid-cols-1">
        {
          dataResult.data.list.map((elem, index) => (
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
