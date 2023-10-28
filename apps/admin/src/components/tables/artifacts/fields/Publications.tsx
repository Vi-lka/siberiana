import type { PublicationsForTable } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import ErrorToast from '~/components/errors/ErrorToast'
import { getPublicationsQuery } from '~/lib/queries/client/artifacts'
import { FormSelectMulti } from '../../inputs/FormSelectMulti'

export default function Publications({ 
  defaultPublications,
  rowIndex
}: { 
  defaultPublications: {
    id: string, 
    displayName: string
  }[],
  rowIndex: number
}) {

  const defaultItems = (defaultPublications.length > 0) ? defaultPublications : [{ id: "", displayName: "__" }]

  const searchParams = useSearchParams()

  const category = searchParams.get("category") ?? undefined
  const collection = searchParams.get("collection") ?? undefined
  
  const { data, isFetching, isPending, isError, error, refetch } = useQuery<PublicationsForTable, Error>({
    queryKey: ['publications', category, collection],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getPublicationsQuery({category, collection}),
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
          place="Публикации"
        />
      </>
    );
  }

  const itemsData = data 
    ? data.publications.edges.map(({ node }) => {
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
        formValueName={`artifacts[${rowIndex}].publications`}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
      />
    </div>
  )
}