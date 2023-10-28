"use client"

import type { CulturesForTable } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import request from 'graphql-request'
import { getCulturesQuery } from '~/lib/queries/client/artifacts'
import ErrorToast from '~/components/errors/ErrorToast'
import { FormSelect } from '../../inputs/FormSelect'

export default function Cultures({ 
  defaultCulture,
  rowIndex
}: { 
  defaultCulture: {
    id: string, 
    displayName: string
  } | null,
  rowIndex: number
}) {
    
  const defaultLable = !!defaultCulture ? defaultCulture.displayName : "__"

  const searchParams = useSearchParams()

  const category = searchParams.get("category") ?? undefined
  const collection = searchParams.get("collection") ?? undefined

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<CulturesForTable, Error>({
    queryKey: ['cultures', category, collection],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getCulturesQuery({category, collection}),
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
          place="Культуры"
        />
      </>
    );
  }

  const itemsData = data 
    ? data.cultures.edges.map(({ node }) => {
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
        formValueName={`artifacts[${rowIndex}].culturalAffiliation`}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
      />
    </div>
  )
}
