import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import ObjectsGrid from '~/components/objects/tabs/ObjectsGrid';
import { ClientHydration } from '~/components/providers/ClientHydration';
import ObjectsCounter from '~/components/providers/ObjectsCounter';
import MasonrySkeleton from '~/components/skeletons/MasonrySkeleton';
import PaginationControls from '~/components/ui/PaginationControls';
import { getDendrochronologies } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function Dendrochronologies({
  searchParams, 
  defaultPageSize,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  defaultPageSize: number;
}) {
    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);
  
    const search = searchParams["search"] as string | undefined;
  
    const categories = searchParams["category"] as string | undefined;
    const collections = searchParams["collection"] as string | undefined;
  
    const sort = searchParams["sort"] as string | undefined;
    const page = searchParams["page_dendro"] ?? "1";
    const per = searchParams["per_dendro"] ?? defaultPageSize;
  
    const first = Number(per);
    const offset = (Number(page) - 1) * Number(per);

    const [dataResult] = await Promise.allSettled([
        getDendrochronologies({
          first,
          offset,
          search,
          sort,
          categories,
          collections,
        }),
    ]);
    if (dataResult.status === "rejected")
        return (
          <>
            <ErrorHandler
              error={dataResult.reason as unknown}
              place="Dendrochronologies"
              notFound
              goBack={false}
            />
            <ObjectsCounter dendroCount={0} />
          </>
        );

    return (
        <div className="w-full">
            <ClientHydration fallback={<MasonrySkeleton />}>
                <ObjectsGrid
                    data={dataResult.value}
                    hrefTo={"dendrochronologies"}
                    type="dendrochronologies"
                />
                <div className="mb-24 mt-6">
                    <PaginationControls
                        dict={dictResult.pagination}
                        length={dataResult.value.totalCount}
                        defaultPageSize={defaultPageSize}
                        classNameMore="xl:left-[38%]"
                        pageParam={"page_dendro"}
                        perParam={"per_dendro"}
                    />
                </div>
            </ClientHydration>
  
            <ObjectsCounter dendroCount={dataResult.value.totalCount} />
        </div>
    )
}
