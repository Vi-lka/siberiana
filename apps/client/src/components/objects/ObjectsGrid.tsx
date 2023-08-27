"use client"

import type { ObjectsArrayType } from '@siberiana/schemas'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ImgObject from '~/components/thumbnails/ImgObject'

export default function ObjectsGrid({
    data,
}: {
    data: ObjectsArrayType,
}) {

  return (
    <ResponsiveMasonry
        columnsCountBreakPoints={{270: 1, 400: 2, 900: 3, 1200: 4, 2000: 5, 2800: 6}}
        className='mt-6'
    >
        <Masonry gutter={"1.5rem"} className='max-[400px]:items-center'>
            {data.edges.map((object, index) => (
                <ImgObject
                    key={index}
                    className={"w-full h-fit"}
                    title={object.node.displayName}
                    src={object.node.primaryImageURL}
                    origin={"storage"}
                    href={'/'}
                    width={500}
                    height={500}
                />
            ))}
        </Masonry>
    </ResponsiveMasonry>
  )
}
