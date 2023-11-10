import type { PersonsList } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import React from 'react'
import ErrorToast from '~/components/errors/ErrorToast'
import { FormSelectMulti } from '../inputs/FormSelectMulti'
import { getPersonsQuery } from '~/lib/queries/client/global'

export default function Persons({ 
  defaultPersons,
  formValueName,
  className,
}: { 
  defaultPersons: {
    id: string, 
    displayName: string
  }[],
  formValueName: string,
  className?: string,
}) {

  const defaultItems = (defaultPersons.length > 0) ? defaultPersons : [{ id: "", displayName: "__" }]
  
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
        {defaultItems.map((item, index) => (
          <p key={index} className=''>{item.displayName}</p>
        ))}
        <ErrorToast
          error={error.message}
          place="Persons"
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
        defaultValues={defaultPersons}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
        className={className}
      />
    </div>
  )
}
