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
    { value: 'listed', label: getStatusName('listed') },
    { value: 'unlisted', label: getStatusName('unlisted') },
    { value: 'draft', label: getStatusName('draft') },
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
