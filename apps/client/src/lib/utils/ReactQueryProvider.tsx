"use client"

import React from 'react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function ReactQueryProvider({ children }: React.PropsWithChildren) {

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}
