import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import BreadcrumbsObject from '~/components/ui/BreadcrumbsObject';
import { getArtifactById } from '~/lib/queries/api-object';
import { getDictionary } from '~/lib/utils/getDictionary';
import PhotoSlider from '~/components/objects/PhotoSlider';
import MainInfoBlock from '~/app/(collections)/objects/artifact/[id]/MainInfoBlock';
import GoBackButton from '~/components/ui/GoBackButton';
import Description from '~/components/objects/Description';


export default async function Artifact({
    params: { id },
}: {
    params: { id: string };
}) {

    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    const [ dataResult ] = await Promise.allSettled([ getArtifactById(id) ])
    if (dataResult.status === 'rejected') return (
        <ErrorHandler 
          error={dataResult.reason as unknown} 
          place={`Artifact ${id}`} 
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

            <div className="flex md:flex-row flex-col items-start mt-10 mb-12 gap-3">
                <div className="md:w-1/2 w-full">
                    <div className="mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
                        <h1 className="text-foreground lg:text-2xl text-xl font-bold uppercase">
                          {dataResult.value.displayName}
                        </h1>
                    </div>

                    <Description text={dataResult.value.description} />

                    {/* Desktop Main Info */}
                    <div className="md:block hidden mt-12">
                        Buttons
                    </div>
                </div>

                <div className="md:w-1/2 w-full mb-3">
                    <PhotoSlider data={images} />
                </div>    

                {/* Mobile Main Info */}
                <div className="md:hidden block mt-3">
                    Buttons
                </div>
            </div>

            <div className="mb-12">
                <MainInfoBlock 
                    dict={dictResult.objects} 
                    data={dataResult.value}
                />
            </div>
        </div>
    )
}
