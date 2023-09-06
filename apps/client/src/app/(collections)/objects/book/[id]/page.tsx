import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import BreadcrumbsObject from '~/components/ui/BreadcrumbsObject';
import { getBookById } from '~/lib/queries/api-object';
import { getDictionary } from '~/lib/utils/getDictionary';
import PhotoSlider from '~/components/objects/PhotoSlider';
import MainInfoBlock from './MainInfoBlock';
import GoBackButton from '~/components/ui/GoBackButton';
import Description from '~/components/objects/Description';
import AddFavorites from '~/components/objects/buttons/AddFavorites';
import UnloadCSV from '~/components/objects/buttons/UnloadCSV';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import ReadPDF from '~/components/objects/buttons/ReadPDF';


export default async function Book({
    params: { id },
}: {
    params: { id: string };
}) {

    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    const session = await getServerSession(authOptions);
    const haveSession = !!session

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
                <div className="md:w-1/2 w-full">
                    <div className="mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
                        <h1 className="text-foreground lg:text-2xl text-xl font-bold uppercase">
                          {dataResult.value.displayName}
                        </h1>
                    </div>

                    <Description text={dataResult.value.description} />

                    {/* Desktop Main Info */}
                    <div className="mt-12 md:block hidden">
                        <MainInfoBlock 
                            dict={dictResult.objects} 
                            data={dataResult.value}
                        />
                    </div>
                </div>

                <div className="md:w-1/2 w-full">
                    <PhotoSlider data={images} />
                    <div className="mt-3 flex flex-wrap gap-3">
                        <AddFavorites session={haveSession} />
                        <ReadPDF files={dataResult.value.files} />
                        <UnloadCSV session={haveSession} />
                    </div>
                </div>    

                {/* Mobile Main Info */}
                <div className="mt-3 md:hidden block w-full">
                    <MainInfoBlock 
                        dict={dictResult.objects} 
                        data={dataResult.value}
                    />
                </div>
            </div>
        </div>
    )
}
