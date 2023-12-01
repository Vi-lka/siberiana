import React from "react";
import { Loader2 } from "lucide-react";

import { Progress } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function LoadingMutation({
  isLoading,
  progress,
  className,
}: {
  isLoading: boolean;
  progress?: number;
  className?: string;
}) {
  return (
    <>
      <Loader2
        className={cn("mx-auto my-3 h-12 w-12 animate-spin", className)}
      />
      {isLoading && progress && progress < 100 ? (
        <div className="mx-auto w-full max-w-xs">
          <h1 className="font-Inter mb-3 text-center text-xl">
            Загружаем файлы
          </h1>
          <Progress value={progress} className="w-full" />
        </div>
      ) : (
        <h1 className="font-Inter mb-3 text-center text-xl">
          Сохраняем данные
        </h1>
      )}
    </>
  );
}
