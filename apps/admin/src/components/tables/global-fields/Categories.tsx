import type { CategoriesList } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import React from 'react'
import ErrorToast from '~/components/errors/ErrorToast'
import { getCategoriesQuery } from '~/lib/queries/client/global'
import { FormSelect } from '../inputs/FormSelect'

export default function Categories({ 
  defaultCategory,
  formValueName,
  className
}: { 
  defaultCategory: {
    id: string, 
    displayName: string
  } | null,
  formValueName: string,
  className?: string,
}) {

  const defaultItem = defaultCategory ? defaultCategory : {id: "", displayName: "__"}
  
  const { data, isFetching, isPending, isError, error, refetch } = useQuery<CategoriesList, Error>({
    queryKey: ['сollections'],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getCategoriesQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running
  })
      
  if (isError && !!error){
    return (
      <>
        <p className=''>{defaultItem.displayName}</p>
        <ErrorToast
          error={error.message}
          place="Коллекции"
        />
      </>
    );
  }

  const itemsData = data 
    ? data.categories.edges.map(({ node }) => {
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
      <FormSelect 
        defaultValue={defaultCategory}
        itemsData={itemsData} 
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
        className={className}
      />
    </div>
  )
}
