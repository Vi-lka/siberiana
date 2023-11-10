import React from 'react'
import { FormSelect } from '../inputs/FormSelect'
import { useQuery } from '@tanstack/react-query'
import type { PersonsList } from '@siberiana/schemas'
import request from 'graphql-request'
import { getPersonsQuery } from '~/lib/queries/client/global'
import ErrorToast from '~/components/errors/ErrorToast'

export default function PersonSingle({ 
  defaultPerson,
  formValueName,
  className
}: { 
  defaultPerson: {
    id: string, 
    displayName: string
  } | null,
  formValueName: string,
  className?: string,
}) {

  const defaultItem = defaultPerson ? defaultPerson : {id: "", displayName: "__"}
  
  const { data, isFetching, isPending, isError, error, refetch } = useQuery<PersonsList, Error>({
    queryKey: ['persons'],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getPersonsQuery(),
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
          place="PersonSingle"
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
  }
  
  return (
    <div className='h-full w-full'>
      <FormSelect 
        defaultValue={defaultPerson}
        itemsData={itemsData} 
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
        className={className}
      />
    </div>
  )
}
