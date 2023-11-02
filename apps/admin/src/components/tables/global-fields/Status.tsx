"use client"

import React from 'react'
import { FormSelect } from '../inputs/FormSelect'
import getStatusName from '~/lib/utils/getStatusName'

export default function Status({ 
  formValueName
}: {
  formValueName: string
}) {

  const itemsData = [
    { id: 'listed', displayName: getStatusName('listed') },
    { id: 'unlisted', displayName: getStatusName('unlisted') },
    { id: 'draft', displayName: getStatusName('draft') },
  ]

  return (
    <div className='h-full w-full'>
      <FormSelect 
        itemsData={itemsData} 
        formValueName={formValueName}
        haveDelete={false}
      />
    </div>
  )
}
