"use client"

import type { SetsList } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import request from 'graphql-request'
import { getSetsQuery } from '~/lib/queries/client/artifacts'
import ErrorToast from '~/components/errors/ErrorToast'
import { FormSelect } from '../inputs/FormSelect'

export default function Set({ 
  defaultSet,
  rowIndex
}: { 
  defaultSet: {
    id: string, 
    displayName: string
  } | null,
  rowIndex: number
}) {
    
  const defaultLable = !!defaultSet ? defaultSet.displayName : "__"

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<SetsList, Error>({
    queryKey: ['sets'],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getSetsQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running
  })
    
  if (isError && !!error){
    return (
      <>
        {defaultLable}
        <ErrorToast
          error={error.message}
          place="Комплексы"
        />
      </>
    );
  }

  const itemsData = data 
    ? data.sets.edges.map(({ node }) => {
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
        defaultValue={defaultSet}
        itemsData={itemsData}
        formValueName={`artifacts[${rowIndex}].set`}
        isLoading={isFetching && isPending}
        onClick={handleClick}
      />
    </div>
  )
}
