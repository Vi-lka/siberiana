"use client"

import type { SetsForTable } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import request from 'graphql-request'
import { getSetsQuery } from '~/lib/queries/client/artifacts'
import ErrorToast from '~/components/errors/ErrorToast'
import { FormSelect } from '../../inputs/FormSelect'

export default function Sets({ 
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

  const searchParams = useSearchParams()

  const category = searchParams.get("category") ?? undefined
  const collection = searchParams.get("collection") ?? undefined

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<SetsForTable, Error>({
    queryKey: ['sets', category, collection],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getSetsQuery({category, collection}),
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
      const value = node.id
      const label = node.displayName
      return { value, label }
    })
    : null

  const handleClick = () => {
    void refetch();
  };

  return (
    <div className='h-full w-full'>
      <FormSelect 
        itemsData={itemsData} 
        formValueName={`artifacts[${rowIndex}].set`}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
      />
    </div>
  )
}