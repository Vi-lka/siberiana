import React from 'react'
import Dropzone from './Dropzone'
import { useFormContext } from 'react-hook-form'
import type { ImageFile } from '@siberiana/schemas'
import { ErrorMessage } from '@hookform/error-message'

export default function InputDropzone({
  formValueName,
  className,
}: {
  formValueName: string,
  className?: string
}) {

  const form = useFormContext();

  const image = form.getValues(formValueName) as { file: ImageFile | null | undefined, url: string }

  return (
    <>
        <Dropzone formValueName={formValueName} defaultValue={image} className={className} />
        <ErrorMessage
          errors={form.formState.errors}
          name={formValueName}
          render={({ message }) => <p className="text-destructive text-sm font-medium">{message}</p>}
        />
    </>
  )
}
