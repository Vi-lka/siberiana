"use client"

import React from 'react'
import { FormSelect } from '../inputs/FormSelect'
import getStatusName from '~/lib/utils/getStatusName'

export default function Status({ 
  formValueName,
  defaultStatus,
}: {
  formValueName: string,
  defaultStatus: {
    id: string, 
    displayName: string
  } | null,
}) {

  const itemsData = [
    { id: "listed", displayName: getStatusName('listed') },
    { id: "unlisted", displayName: getStatusName('unlisted') },
    { id: "draft", displayName: getStatusName('draft') },
  ] as { id: string, displayName: string }[]

  return (
    <div className='h-full w-full'>
      <FormSelect 
        defaultValue={defaultStatus}
        itemsData={itemsData} 
        formValueName={formValueName}
        haveDelete={false}
      />
    </div>
  )
}
