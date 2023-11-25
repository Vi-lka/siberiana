import type { Sizes } from '@siberiana/schemas';
import { cn } from '@siberiana/ui/src/lib/utils';
import { RotateCcw } from 'lucide-react'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { getLable } from '~/lib/utils/sizes-utils';

export default function SizesCell({
    name,
    defaultValue,
    className,
}: {
    name: string,
    defaultValue: Sizes,
    className?: string,
}) {
    const form = useFormContext();
    
    const value = form.getValues(name) as Sizes

    const text = getLable(value);

    return (
        <div 
            className={cn(
                "relative rounded-md border-[1px] border-transparent px-2 py-6",
                className,
                form.getFieldState(name).invalid
                    ? "border-red-500"
                    : form.getFieldState(name).isDirty
                    ? "border-green-400"
                    : "",
            )}
        >
            <p className="text-center max-w-xs break-words">{text}</p>
            {form.getFieldState(name).isDirty ? (
                <RotateCcw
                    className="text-muted-foreground hover:text-foreground absolute top-1 right-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        form.setValue(name, defaultValue, {
                            shouldDirty: true,
                            shouldValidate: true,
                            shouldTouch: true,
                        })
                    }}
                />
            ) : null}
        </div>
    )
}
