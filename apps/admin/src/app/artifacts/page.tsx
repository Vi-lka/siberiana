import React, { Suspense } from 'react'
import CategoryFilter from '~/components/filters/CategoryFilter'
import CollectionFilter from '~/components/filters/CollectionFilter'
import TableArtifacts from './table'
import { Loader2 } from 'lucide-react'

export const revalidate = 10

export default function ArtifactsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  return (
    <div className="font-OpenSans px-2 py-10">
      <div className="flex md:flex-row flex-col gap-2 text-sm">
        <CategoryFilter hasArtifacts />
        <CollectionFilter hasArtifacts searchParams={searchParams} />
      </div>

      <Suspense fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto' />}>
        <TableArtifacts searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
