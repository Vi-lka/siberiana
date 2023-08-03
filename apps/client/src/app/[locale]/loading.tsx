import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="w-[85%] max-w-[1600px] mx-auto pt-20">
      <Loader2 className='animate-spin w-12 h-12 mx-auto' />
    </div>
  );
}
