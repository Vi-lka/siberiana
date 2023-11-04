import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import BreadcrumbsObject from '~/components/ui/BreadcrumbsObject';
import { getPAPById } from '~/lib/queries/api-object';
import { getDictionary } from '~/lib/utils/getDictionary';
import MainInfoBlock from './MainInfoBlock';
import GoBackButton from '~/components/ui/GoBackButton';
import Description from '~/components/objects/Description';
import PhotoZoom from '~/components/objects/PhotoZoom';

export const dynamic = 'force-dynamic'

export default async function ProtectedAreaPictures({
    params: { id },
}: {
    params: { id: string };
}) {

    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    // const session = await getServerSession(authOptions);
    // const haveSession = !!session

    const [ dataResult ] = await Promise.allSettled([ getPAPById(id) ])
    if (dataResult.status === 'rejected') return (
        <ErrorHandler 
          error={dataResult.reason as unknown} 
          place={`Protected Area Pictures ${id}`} 
          notFound 
          goBack
        />
    )

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
                    <PhotoZoom src={dataResult.value.primaryImageURL} alt={dataResult.value.displayName} />
                    {/* <div className="mt-3 flex flex-wrap gap-3">
                        <AddFavorites session={haveSession} />
                        <UnloadCSV session={haveSession} />
                    </div> */}
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
