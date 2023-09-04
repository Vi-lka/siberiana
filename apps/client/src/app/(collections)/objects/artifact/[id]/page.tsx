import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import BreadcrumbsObject from '~/components/ui/BreadcrumbsObject';
import { getArtifactById } from '~/lib/queries/api-object';
import { getDictionary } from '~/lib/utils/getDictionary';
import PhotoSlider from '~/components/objects/PhotoSlider';
import MainInfoBlock from '~/components/objects/MainInfoBlock';


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
        <div>
            <BreadcrumbsObject 
                dict={dictResult.breadcrumbs}
                title={dataResult.value.displayName}
                categorySlug={dataResult.value.collection.category?.slug}
                categoryTitle={dataResult.value.collection.category?.displayName}
                collectionSlug={dataResult.value.collection.slug}
                collectionTitle={dataResult.value.collection.displayName}
            />

            <div className="flex md:flex-row flex-col items-start mt-10 gap-3">
                <div className="md:w-[50%] w-full">
                    <div className="mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
                        <h1 className="text-foreground lg:text-2xl text-xl font-bold uppercase">
                          {dataResult.value.displayName}
                        </h1>
                    </div>

                    {dataResult.value.description.length > 0 
                        ? (
                            <p className="font-Inter md:text-base text-sm mt-3 md:mb-14 mb-3">
                                {dataResult.value.description}
                            </p>
                        )
                        : null
                    }

                    {/* Desktop Main Info */}
                    <div className="md:block hidden">
                        <MainInfoBlock 
                            dict={dictResult.objects} 
                            data={dataResult.value}
                        />
                    </div>
                </div>

                <div className="md:w-[50%] w-full mb-3">
                    <PhotoSlider data={images} />
                </div>    

                {/* Mobile Main Info */}
                <div className="md:hidden block">
                    <MainInfoBlock 
                        dict={dictResult.objects} 
                        data={dataResult.value}
                    />
                </div>
            </div>
        </div>
    )
}
