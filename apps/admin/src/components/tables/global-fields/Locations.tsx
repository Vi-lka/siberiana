import type { LocationsList } from '@siberiana/schemas'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import React from 'react'
import ErrorToast from '~/components/errors/ErrorToast'
import { FormSelect } from '../inputs/FormSelect'
import { getLocationsQuery } from '~/lib/queries/client/global'

export default function Locations({ 
  defaultLocation,
  formValueName,
  className,
}: { 
  defaultLocation: {
    id: string, 
    displayName: string
  } | null,
  formValueName: string,
  className?: string,
}) {

  const defaultLable = !!defaultLocation ? defaultLocation.displayName : "__"
  
  const { data, isFetching, isPending, isError, error, refetch } = useQuery<LocationsList, Error>({
    queryKey: ['locations'],
    queryFn: async () => 
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getLocationsQuery(),
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
          place="Локация"
        />
      </>
    );
  }

  function getLabel(node: {
    id: string;
    displayName: string;
    country: { id: string; displayName: string; } | null;
    region: { id: string; displayName: string; } | null;
    district: { id: string; displayName: string; } | null;
    settlement: { id: string; displayName: string; } | null;
  }): string {
    if (node.displayName.length > 0) return node.displayName;
    if (node.settlement && node.settlement.displayName.length > 0) return `Нас. пункт: ${node.settlement.displayName}`;
    if (node.district && node.district.displayName.length > 0) return `Район: ${node.district.displayName}`;
    if (node.region && node.region.displayName.length > 0) return `Регион: ${node.region.displayName}`;
    if (node.country && node.country.displayName.length > 0) return `Страна: ${node.country.displayName}`;
    else return `id: ${node.id}`
  }
  
  const itemsData = data 
    ? data.locations.edges.map(({ node }) => {
      const value = node.id
      const label = getLabel(node)
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
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick} 
        className={className}
      />
    </div>
  )
}
