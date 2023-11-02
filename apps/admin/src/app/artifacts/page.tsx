import React, { Suspense } from 'react'
import CategoryFilter from '~/components/filters/CategoryFilter'
import CollectionFilter from '~/components/filters/CollectionFilter'
import TableArtifacts from './TableArtifacts'
import { ArrowBigUp, Loader2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function ArtifactsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const category = searchParams['category'] as string | undefined
  const collection = searchParams['collection'] as string | undefined

  return (
    <div key={Math.random()} className="font-OpenSans px-2 py-10 md:ml-[14rem]">
      <div className="flex md:flex-row flex-col gap-2 text-sm">
        <div className="">
          <CategoryFilter hasArtifacts />
          {!(!!category || !!collection) 
            ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Выберите категорию</p>
              </div>
            )
            : null
          }
        </div>
        
        <div className=''>
          <CollectionFilter hasArtifacts searchParams={searchParams} />
          {!(!!category || !!collection)
            ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Или коллекцию</p>
              </div>
            )
            : null
          }
          {(!!category && !!!collection) 
            ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Выберите коллекцию</p>
              </div>
            )
            : null
          }
        </div>
      </div>

      {
        (!!collection)
        ? (
          <Suspense fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto' />}>
            <TableArtifacts searchParams={searchParams} />
          </Suspense>
        )
        : null
      }
    </div>
  )
}
