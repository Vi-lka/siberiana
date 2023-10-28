"use client"

import type { MonumentsForTable } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import request from 'graphql-request'
import { getMonumentsQuery } from '~/lib/queries/client/artifacts'
import ErrorToast from '~/components/errors/ErrorToast'
import { FormSelect } from '../../inputs/FormSelect'

export default function Monuments({ 
  defaultMonument,
  rowIndex
}: { 
  defaultMonument: {
    id: string, 
    displayName: string
  } | null,
  rowIndex: number
}) {

  const defaultLable = !!defaultMonument ? defaultMonument.displayName : "__"

  const searchParams = useSearchParams()

  const category = searchParams.get("category") ?? undefined
  const collection = searchParams.get("collection") ?? undefined

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<MonumentsForTable, Error>({
    queryKey: ['monuments', category, collection],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getMonumentsQuery({category, collection}),
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
          place="Памятники"
        />
      </>
    );
  }

  const itemsData = data 
    ? data.monuments.edges.map(({ node }) => {
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
        formValueName={`artifacts[${rowIndex}].monument`}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
      />
    </div>
  )
}