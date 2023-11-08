// "use client"

// import React from 'react'
// import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Input, Label } from '@siberiana/ui'
// import { ChevronsUpDown, CircleDot, Loader2, X } from 'lucide-react'
// import { cn } from '@siberiana/ui/src/lib/utils'
// import { useFormContext } from 'react-hook-form'
// import { ErrorMessage } from '@hookform/error-message'
// import type { Dating } from "@siberiana/schemas"

// export default function DatingSelect({ 
//   formValueName,
//   className,
// }: { 
//   formValueName: string,
//   className?: string,
// }) {

//   const [openCombobox, setOpenCombobox] = React.useState(false);
//   const [isPending, startTransition] = React.useTransition();

//   const form = useFormContext();
//   const selected = form.getValues(formValueName) as Dating
//   const selectedLable = getLable(selected)

//   const [values, setValues] = React.useState(selected);

//   const zeroObj = {
//     width: 0,
//     height: 0,
//     length: 0,
//     depth: 0,
//     diameter: 0
//   }

//   const clear = () => {
//     setValues(zeroObj)
//     form.setValue(formValueName, zeroObj, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
//     setOpenCombobox(false)
//   };

//   const handleNewValue = React.useCallback(
//     (newValue: Sizes) => {
//         startTransition(() => {
//             form.setValue(formValueName, newValue, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
//         })
//         setOpenCombobox(false)
//     },
//     [form, formValueName],
//   );

//   const handleOpen = (open: boolean) => {
//     setOpenCombobox(open)
//     if (!open) handleNewValue(values)
//   }

//   return (
//     <div className={cn("h-full w-full", className)}>
//       <DropdownMenu open={openCombobox} onOpenChange={handleOpen}>
//         <DropdownMenuTrigger asChild>
//           <Button 
//             variant={form.getFieldState(formValueName).isDirty ? "outline" : "ghost"}
//             role="combobox"
//             aria-expanded={openCombobox}
//             className={cn(
//               "justify-between text-foreground font-normal text-xs text-left relative px-2 py-8 w-max h-fit",
//               form.getFieldState(formValueName).invalid 
//                 ? "border-red-600" 
//                 : form.getFieldState(formValueName).isDirty ? "border-green-500" : ""
//             )}
//           >
//             {isPending 
//                 ? <Loader2 className='animate-spin w-5 h-5' /> 
//                 : (<>
//                     {selectedLable}
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />   
//                 </>)
//             }
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side='bottom' align="start" className="w-[200px] font-Inter">
//           <DropdownMenuLabel className='flex items-center justify-between'>
//             Выберите:
//             {isPending ? <Loader2 className='animate-spin w-5 h-5' /> : null}
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator/>
//           {isPending 
//             ? <Loader2 className='animate-spin w-8 h-8' />
//             : (<>
//                 {!isZero(selected)
//                   ? 
//                     <span 
//                       className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
//                       onClick={clear}
//                     >
//                       <X className="h-5 w-5"/> Удалить
//                     </span>
//                   : null
//                 }
//                 <DropdownMenuGroup>
//                   <DropdownMenuSub>
//                       <DropdownMenuSubTrigger className='p-3'>
//                         <CircleDot
//                           className={cn(
//                             "mr-2 h-4 w-4",
//                             (isWhat(selected) === "3D") ? "opacity-100" : "opacity-0"
//                           )}
//                         />
//                         <span>3D</span>
//                       </DropdownMenuSubTrigger>
//                       <DropdownMenuSubContent className="flex flex-col gap-2 p-2">
//                           <div className="flex w-full max-w-sm items-center gap-1">
//                               <Label htmlFor="x">X:</Label>
//                               <Input 
//                                   type="number" 
//                                   id="x" 
//                                   placeholder={values.width.toString()}
//                                   className="py-0 px-2 m-0 max-w-[8rem] max-h-8 text-xs border-solid w-auto overflow-visible truncate"
//                                   onChange={(e) => setValues({
//                                     ...values,
//                                     width: Number(e.target.value),
//                                     diameter: 0,
//                                     length: 0
//                                   })}
//                               />
//                           </div>
//                           <div className="flex w-full max-w-sm items-center gap-1">
//                               <Label htmlFor="y">Y:</Label>
//                               <Input 
//                                   type="number" 
//                                   id="y" 
//                                   placeholder={values.height.toString()}
//                                   className="py-0 px-2 m-0 max-w-[8rem] max-h-8 text-xs border-solid w-auto overflow-visible truncate"
//                                   onChange={(e) => setValues({
//                                     ...values,
//                                     height: Number(e.target.value),
//                                     diameter: 0,
//                                     length: 0
//                                   })}
//                               />
//                           </div>
//                           <div className="flex w-full max-w-sm items-center gap-1">
//                               <Label htmlFor="z">Z:</Label>
//                               <Input 
//                                   type="number" 
//                                   id="z" 
//                                   placeholder={values.depth.toString()}
//                                   className="py-0 px-2 m-0 max-w-[8rem] max-h-8 text-xs border-solid w-auto overflow-visible truncate"
//                                   onChange={(e) => setValues({
//                                     ...values,
//                                     depth: Number(e.target.value),
//                                     diameter: 0,
//                                     length: 0
//                                   })}
//                               />
//                           </div>
//                       </DropdownMenuSubContent>
//                   </DropdownMenuSub>

//                   <DropdownMenuSub>
//                       <DropdownMenuSubTrigger className='p-3'>
//                         <CircleDot
//                           className={cn(
//                             "mr-2 h-4 w-4",
//                             (isWhat(selected) === "2D") ? "opacity-100" : "opacity-0"
//                           )}
//                         />
//                         <span>2D</span>
//                       </DropdownMenuSubTrigger>
//                       <DropdownMenuSubContent className="flex flex-col gap-2 p-2">
//                           <div className="flex flex-col w-full max-w-sm gap-1">
//                               <Label htmlFor="x">Ширина:</Label>
//                               <Input 
//                                   type="number" 
//                                   id="x" 
//                                   placeholder={values.width.toString()}
//                                   className="py-0 px-2 m-0 max-w-[8rem] max-h-8 text-xs border-solid w-auto overflow-visible truncate"
//                                   onChange={(e) => setValues({
//                                     ...values,
//                                     width: Number(e.target.value),
//                                     depth: 0,
//                                     diameter: 0,
//                                     height: 0
//                                   })}
//                               />
//                           </div>
//                           <div className="flex flex-col w-full max-w-sm gap-1">
//                               <Label htmlFor="y">Длина:</Label>
//                               <Input 
//                                   type="number" 
//                                   id="y" 
//                                   placeholder={values.length.toString()}
//                                   className="py-0 px-2 m-0 max-w-[8rem] max-h-8 text-xs border-solid w-auto overflow-visible truncate"
//                                   onChange={(e) => setValues({
//                                     ...values,
//                                     length: Number(e.target.value),
//                                     depth: 0,
//                                     diameter: 0,
//                                     height: 0
//                                   })}
//                               />
//                           </div>
//                       </DropdownMenuSubContent>
//                   </DropdownMenuSub>

//                   <DropdownMenuSub>
//                       <DropdownMenuSubTrigger className='p-3'>
//                         <CircleDot
//                           className={cn(
//                             "mr-2 h-4 w-4",
//                             (isWhat(selected) === "diameter") ? "opacity-100" : "opacity-0"
//                           )}
//                         />
//                         <span>Диаметр</span>
//                       </DropdownMenuSubTrigger>
//                       <DropdownMenuSubContent className="flex flex-col gap-2 p-2">
//                           <div className="flex flex-col w-full max-w-sm gap-1">
//                               <Label htmlFor="y">Высота:</Label>
//                               <Input 
//                                   type="number" 
//                                   id="y" 
//                                   placeholder={values.height.toString()}
//                                   className="py-0 px-2 m-0 max-w-[8rem] max-h-8 text-xs border-solid w-auto overflow-visible truncate"
//                                   onChange={(e) => setValues({
//                                     ...values,
//                                     height: Number(e.target.value),
//                                     depth: 0,
//                                     length: 0,
//                                     width: 0
//                                   })}
//                               />
//                           </div>
//                           <div className="flex flex-col w-full max-w-sm gap-1">
//                               <Label htmlFor="x">Диаметр:</Label>
//                               <Input 
//                                   type="number" 
//                                   id="x" 
//                                   placeholder={values.diameter.toString()}
//                                   className="py-0 px-2 m-0 max-w-[8rem] max-h-8 text-xs border-solid w-auto overflow-visible truncate"
//                                   onChange={(e) => setValues({
//                                     ...values,
//                                     diameter: Number(e.target.value),
//                                     depth: 0,
//                                     length: 0,
//                                     width: 0,
//                                   })}
//                               />
//                           </div>
//                       </DropdownMenuSubContent>
//                   </DropdownMenuSub>
//                 </DropdownMenuGroup>
//             </>)
//           }
//         </DropdownMenuContent>
//       </DropdownMenu>
//       <ErrorMessage
//         errors={form.formState.errors}
//         name={formValueName}
//         render={({ message }) => <p className="text-destructive text-sm font-medium">{message}</p>}
//       />
//     </div>
//   )
// }