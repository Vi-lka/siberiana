import type { MaterialsForTable } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import ErrorToast from '~/components/errors/ErrorToast'
import { getMaterialsQuery } from '~/lib/queries/client/artifacts'
import { FormSelectMulti } from '../../inputs/FormSelectMulti'

export default function Materials({ 
    defaultMaterials,
    rowIndex
  }: { 
    defaultMaterials: {
      id: string, 
      displayName: string
    }[],
    rowIndex: number
}) {

    const defaultItems = (defaultMaterials.length > 0) ? defaultMaterials : [{ id: "", displayName: "__" }]

    const searchParams = useSearchParams()

    const category = searchParams.get("category") ?? undefined
    const collection = searchParams.get("collection") ?? undefined
  
    const { data, isFetching, isPending, isError, error, refetch } = useQuery<MaterialsForTable, Error>({
      queryKey: ['materials', category, collection],
      queryFn: async () => 
        request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          getMaterialsQuery({category, collection}),
        ),
      refetchOnWindowFocus: false,
      enabled: false // disable this query from automatically running
    })
      
    if (isError && !!error){
      return (
        <>
          {defaultItems.map((item, index) => (
            <p key={index} className=''>{item.displayName}</p>
          ))}
          <ErrorToast
            error={error.message}
            place="Памятники"
          />
        </>
      );
    }

    const itemsData = data 
    ? data.media.edges.map(({ node }) => {
      const id = node.id
      const displayName = node.displayName
      return { id, displayName }
    })
    : null

  const handleClick = () => {
    void refetch();
  };

  return (
    <div className='h-full w-full'>
        <FormSelectMulti 
          itemsData={itemsData} 
          formValueName={`artifacts[${rowIndex}].mediums`}
          isLoading={isFetching && isPending}
          onClick={handleClick} 
        />
    </div>
  )
}
