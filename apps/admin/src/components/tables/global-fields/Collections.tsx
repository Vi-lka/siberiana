import type { CollectionsList } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import React from 'react'
import ErrorToast from '~/components/errors/ErrorToast'
import { getCollectionsQuery } from '~/lib/queries/client/global'
import { FormSelectMulti } from '../inputs/FormSelectMulti'

export default function Collections({ 
  defaultCollections,
  formValueName,
  withoutCategory,
  className
}: { 
  defaultCollections: {
    id: string, 
    displayName: string
  }[],
  formValueName: string,
  withoutCategory?: boolean,
  className?: string,
}) {

  const defaultItems = (defaultCollections && defaultCollections.length > 0) ? defaultCollections : []
  
  const { data, isFetching, isPending, isError, error, refetch } = useQuery<CollectionsList, Error>({
    queryKey: ['сollections', withoutCategory],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getCollectionsQuery({withoutCategory: withoutCategory === undefined ? null : withoutCategory}),
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
          place="Коллекции"
        />
      </>
    );
  }

  const itemsData = data 
    ? data.collections.edges.map(({ node }) => {
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
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
        className={className}
      />
    </div>
  )
}
