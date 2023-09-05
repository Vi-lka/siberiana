import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import BreadcrumbsObject from '~/components/ui/BreadcrumbsObject';
import { getBookById } from '~/lib/queries/api-object';
import { getDictionary } from '~/lib/utils/getDictionary';
import PhotoSlider from '~/components/objects/PhotoSlider';
import MainInfoBlock from './MainInfoBlock';
import GoBackButton from '~/components/ui/GoBackButton';
import ButtonComponent from '~/components/ui/ButtonComponent';
import Link from 'next/link';


export default async function Book({
    params: { id },
}: {
    params: { id: string };
}) {

    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    const [ dataResult ] = await Promise.allSettled([ getBookById(id) ])
    if (dataResult.status === 'rejected') return (
        <ErrorHandler 
          error={dataResult.reason as unknown} 
          place={`Book ${id}`} 
          notFound 
          goBack
        />
    )

    const firstImage = { src: dataResult.value.primaryImageURL, alt: dataResult.value.displayName }
    const additionalImages = dataResult.value.additionalImagesUrls?.map(url => {
        return { src: url, alt: dataResult.value.displayName }
    }) 
    const images = !!additionalImages 
        ? [ firstImage, ...additionalImages ]
        : [ firstImage ]

    console.log(dataResult.value.files)

    return (
        <div className='relative'>
            <div className="absolute lg:-left-12 sm:-left-8 left-0 sm:top-0 -top-10">
                <GoBackButton />
            </div>

            <BreadcrumbsObject 
                dict={dictResult.breadcrumbs}
                title={dataResult.value.displayName}
                categorySlug={dataResult.value.collection.category?.slug}
                categoryTitle={dataResult.value.collection.category?.displayName}
                collectionSlug={dataResult.value.collection.slug}
                collectionTitle={dataResult.value.collection.displayName}
            />

            <div className="flex md:flex-row flex-col items-start mt-10 mb-24 gap-3">
                <div className="md:w-[50%] w-full">
                    <div className="mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
                        <h1 className="text-foreground lg:text-2xl text-xl font-bold uppercase">
                          {dataResult.value.displayName}
                        </h1>
                    </div>

                    {dataResult.value.description.length > 0 
                        ? (
                            <p className="font-Inter md:text-base text-sm mt-3">
                                {dataResult.value.description}
                            </p>
                        )
                        : null
                    }

                    {/* Desktop */}
                    <div className="mt-12 md:block hidden">
                        {dataResult.value.files.length > 0 
                            ? (
                                <Link href={dataResult.value.files[0]} target='__blank'>
                                    <ButtonComponent className='mb-12 px-10 py-6 uppercase font-Inter font-normal'>   
                                        Читать в pdf
                                    </ButtonComponent> 
                                </Link>
                            )
                            : null
                        }

                        <MainInfoBlock 
                            dict={dictResult.objects} 
                            data={dataResult.value}
                        />
                    </div>
                </div>

                <div className="md:w-[50%] w-full md:mb-3">
                    <PhotoSlider data={images} />
                </div>    

                {/* Mobile */}
                <div className="md:hidden block">
                    {dataResult.value.files.length > 0 
                        ? (
                            <Link href={dataResult.value.files[0]} target='__blank'>
                                <ButtonComponent className='mb-12 px-10 py-6 uppercase font-Inter font-normal'>   
                                    Читать в pdf
                                </ButtonComponent> 
                            </Link>
                        )
                        : null
                    }

                    <MainInfoBlock 
                        dict={dictResult.objects} 
                        data={dataResult.value}
                    />
                </div>
            </div>
        </div>
    )
}
