import type { ProtectedArea } from "@siberiana/schemas"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, TableCell, TableRow } from "@siberiana/ui"
import React from "react"

export function SingleItem({ label, value }: { label: string, value: string | undefined }) {
    if (!!value && (value.length > 1)) {
        return (
            <TableRow>
                <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
                <TableCell className="py-3 w-3/5 font-normal">{value}</TableCell>
            </TableRow>
        )
    } else return null
}

export function SingleItemArray({
    label,
    value
}: {
    label: string,
    value: { displayName: string }[],
}) {
    if (value.length === 0) {
        return null
    } else if (value.length === 1) {
        return (
            <TableRow>
                <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
                <TableCell className="py-3 w-3/5 font-normal">{value[0].displayName}</TableCell>
            </TableRow>  
        )
    } else return (
        <TableRow>
            <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
            <TableCell className="py-3 w-3/5 flex flex-col gap-2 font-normal">
                {value.map((el, index) => (
                    <p key={index}>{el.displayName}</p>
                ))}
            </TableCell>
        </TableRow>   
    )
}

export function SingleItemProtectedArea({
    label,
    value
}: {
    label: string,
    value: ProtectedArea | null,
}) {

    if (value === null) return null

    return (
        <TableRow>
            <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
            <TableCell className="py-3 w-3/5">
                <Accordion type="single" collapsible className='w-full'>
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className='py-0 font-normal justify-start gap-1'>
                        {value.displayName}
                    </AccordionTrigger>
                    <AccordionContent className='text-xs'>
                        <p className="ml-2 mb-2">{value.description}</p>
                        <p className="ml-2 mb-2">
                            <span className='font-semibold'>Категория ООПТ:</span> {value.protectedAreaCategory?.displayName}
                        </p>
                        <p className="ml-2 mb-2">
                            <span className='font-semibold'>Область:</span> {value.area}
                        </p>
                        <p className="ml-2">
                            <span className='font-semibold'>Дата создания:</span> {value.establishmentDate?.toLocaleDateString("ru")}
                        </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </TableCell>
        </TableRow>  
    )
}