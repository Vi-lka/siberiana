import type { AuthorsForTable } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import React from 'react'
import ErrorToast from '~/components/errors/ErrorToast'
import { getAuthorsQuery } from '~/lib/queries/client/artifacts'
import { FormSelectMulti } from '../../inputs/FormSelectMulti'

export default function Authors({ 
  defaultAuthors,
  rowIndex
}: { 
  defaultAuthors: {
    id: string, 
    displayName: string
  }[],
  rowIndex: number
}) {

  const defaultItems = (defaultAuthors.length > 0) ? defaultAuthors : [{ id: "", displayName: "__" }]
  
  const { data, isFetching, isPending, isError, error, refetch } = useQuery<AuthorsForTable, Error>({
    queryKey: ['persons'],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getAuthorsQuery(),
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
          place="Авторы"
        />
      </>
    );
  }

  const itemsData = data 
    ? data.persons.edges.map(({ node }) => {
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
        formValueName={`artifacts[${rowIndex}].authors`}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
      />
    </div>
  )
}
