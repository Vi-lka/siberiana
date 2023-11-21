import { ErrorMessage } from '@hookform/error-message';
import type { CustomFile } from '@siberiana/schemas';
import { cn } from '@siberiana/ui/src/lib/utils';
import React from 'react'
import { useDropzone  } from 'react-dropzone';
import type { Accept } from 'react-dropzone';
import Image from 'next/image'
import { useFormContext } from 'react-hook-form';
import { MousePointerClick, RotateCcw, UploadCloud, X } from 'lucide-react';
import { ScrollArea } from '@siberiana/ui';

type Values = {
  file?: CustomFile | null | undefined;
  url: string;
}[] | null

type InputProps = {
  formValueName: string;
  defaultValues: Values;
  accept: Accept;
  maxSize: number;
  files: boolean,
  className?: string;
}

export default function InputMultiDropzone(props: InputProps) {
  const form = useFormContext();

  const formValues = form.getValues(props.formValueName) as Values

  const [values, setValues] = React.useState<Values>(formValues);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const newValues = acceptedFiles.map(file => {
        const url = URL.createObjectURL(file)
        return { file, url };
      })

      !!values ? setValues([...values, ...newValues]) : setValues(newValues);
      
      form.setValue(
        props.formValueName,
        !!values ? [...values, ...newValues] : newValues,
        { shouldDirty: true, shouldValidate: true, shouldTouch: true },
      );
    },
    [form, props.formValueName, values],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
    maxSize: props.maxSize,
  });

  const handleDeleteAll = () => {
    setValues(null)
    form.setValue(
      props.formValueName,
      null,
      { shouldDirty: true, shouldValidate: true, shouldTouch: true },
    );
  };

  const handleDeleteSingle = (i: number) => {
    const filteredValues = values ? values.filter((_, index) => index !== i) : null;
    const newValues = (filteredValues && filteredValues.length > 0) ? filteredValues : null;
    setValues(newValues)
    form.setValue(
      props.formValueName,
      newValues,
      { shouldDirty: true, shouldValidate: true, shouldTouch: true },
    );
  };

  const handleReset = () => {
    setValues(props.defaultValues)
    form.setValue(
      props.formValueName,
      props.defaultValues,
      { shouldDirty: true, shouldValidate: true, shouldTouch: true },
    );
  };

  const sortedDefaultValues = props.defaultValues?.sort((a,b) => (a.url > b.url) ? 1 : ((b.url > a.url) ? -1 : 0));
  const sortedValues = values?.sort((a,b) => (a.url > b.url) ? 1 : ((b.url > a.url) ? -1 : 0));
  const customDirty =
    sortedDefaultValues?.toString() !== sortedValues?.toString();

  if (!!values && values.length > 0) {
    const gridColumns = values.length < 3 ? values.length : 3
    return (
      <>
        <span
          className="text-muted-foreground hover:text-foreground mx-auto my-1 flex w-fit cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
          onClick={handleDeleteAll}
        >
          <X className="h-5 w-5" /> Удалить все
        </span>

        <div className="relative">
          <div
            {...getRootProps({
              className: cn(
                "p-1 border border-solid border-border rounded-md cursor-pointer relative",
                props.className,
                form.getFieldState(props.formValueName).invalid
                ? "border-red-500"
                : form.getFieldState(props.formValueName).isDirty || customDirty
                ? "border-green-400"
                : "",
              ),
            })}
          >
            <input {...getInputProps()} />
            <ScrollArea className={values.length > 3 ? 'pr-3' : ''} classNameViewport='max-h-40' type={values.length > 3 ? "always" : "scroll"}>
              <div className="grid gap-1 w-max max-w-[18rem] mx-auto" style={{gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`}}>
                {values.map((value, index) => {
                  if (!props.files && value.url.length > 0) return (
                    <figure key={index} className='p-1 border-[1px] border-muted rounded-md overflow-hidden bg-background'>
                      <span
                        className="text-muted-foreground hover:text-foreground mx-auto my-1 flex w-fit cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteSingle(index);
                        }}
                      >
                        <X className="h-5 w-5" />
                      </span>
                      <Image
                        src={value.url}
                        width={100}
                        height={100}
                        alt={value.file ? value.file.name : value.url}
                        className="mx-auto object-cover rounded-sm"
                        draggable={false}
                      />
                      <figcaption className="mt-3 break-words text-center text-[9px] font-light">
                        {value.file ? value.file.name : value.url}
                      </figcaption>
                    </figure>  
                  ) 
                  else return (
                    <div key={index} className='p-1 border-[1px] border-muted rounded-md overflow-hidden bg-background'>
                      <p className="mt-3 break-words text-center text-[10px] font-light">
                        {value.file ? value.file.name : value.url}
                      </p>
                    </div> 
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          {form.getFieldState(props.formValueName).isDirty || customDirty ? (
            <RotateCcw
              className="text-muted-foreground hover:text-foreground absolute -top-5 right-0 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
              onClick={handleReset}
            />
          ) : null}
        </div>
        
        <ErrorMessage
          errors={form.formState.errors}
          name={props.formValueName}
          render={({ message }) => (
            <p className="text-destructive text-sm font-medium">{message}</p>
          )}
        />
      </> 
    )
  } else return (
    <>
      <div className="relative">
        <div
          {...getRootProps({
            className: cn(
              "lg:px-12 px-0 lg:py-10 py-2 border border-solid border-border rounded-md cursor-pointer bg-muted",
              props.className,
              form.getFieldState(props.formValueName).invalid
              ? "border-red-500"
              : form.getFieldState(props.formValueName).isDirty || customDirty
              ? "border-green-400"
              : "",
            ),
          })}
        >
          <input {...getInputProps()} />
          <UploadCloud className="text-muted-foreground mx-auto" />
          {isDragActive ? (
            <p className="text-muted-foreground text-center text-xs">
              Drop the files here ...
            </p>
          ) : (
            <p className="text-muted-foreground text-center text-xs">
              <span className="underline-offset-3 underline">Drag & drop</span> or{" "}
              <span className="underline underline-offset-2">
                <MousePointerClick className="inline h-3 w-3" />
                Click
              </span>
            </p>
          )}
        </div>
        {form.getFieldState(props.formValueName).isDirty || customDirty ? (
          <RotateCcw
            className="text-muted-foreground hover:text-foreground absolute top-1 right-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
            onClick={handleReset}
          />
        ) : null}
      </div>
      <ErrorMessage
        errors={form.formState.errors}
        name={props.formValueName}
        render={({ message }) => (
          <p className="text-destructive text-sm font-medium">{message}</p>
        )}
      />
    </> 
  )
}