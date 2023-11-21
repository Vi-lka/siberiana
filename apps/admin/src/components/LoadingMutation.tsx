import { Progress } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function LoadingMutation({
  isLoading,
  progress,
  className,
}: {
  isLoading: boolean,
  progress?: number,
  className?: string,
}) {
  return (
    <>
      <Loader2 className={cn(
        "mx-auto h-12 w-12 my-3 animate-spin",
        className
      )} />
      {isLoading && progress && progress < 100
        ? (
          <div className="w-full max-w-xs mx-auto">
            <h1 className="text-center font-Inter text-xl mb-3">Загружаем файлы</h1>
            <Progress value={progress} className="w-full" />
          </div>
        ) 
        : <h1 className="text-center font-Inter text-xl mb-3">Сохраняем данные</h1>
      }
    </>
  )
}
