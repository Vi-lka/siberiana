import type { ArtifactById, ObjectsDict } from '@siberiana/schemas'
import React from 'react'

export default function MainInfoBlock({
    dict,
    data,
}: {
    dict: ObjectsDict,
    data: ArtifactById,
}) {
  return (
    <div>
        <h2 className="text-foreground lg:text-xl text-lg font-bold uppercase mb-6">
            {dict.mainInfo.title}
        </h2>

        <div className=''>

        </div> 
    </div>
  )
}
