import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import TablesMonuments from './TablesMonuments'

export const dynamic = 'force-dynamic'

export default function MonumentsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  return (
    <div key={Math.random()} className="font-OpenSans px-2 py-10 md:ml-[14rem]">
      <Suspense fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto' />}>
        <TablesMonuments searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
