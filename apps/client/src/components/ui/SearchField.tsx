"use client"

import type { SearchDictType } from '@siberiana/schemas'
import { Button } from '@siberiana/ui'
import React from 'react'
import { Loader2, Search, X } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { InputSearch } from './InputSearch'
import { motion } from "framer-motion"

const variants = {
  open: { width: '70%' },
  closed: { width: 'auto' },
}

export default function SearchField({ dict }: { dict: SearchDictType }) {

    const [inputValue, setInputValue] = React.useState<string>("")
    const [debouncedValue, setDebouncedValue] = React.useState<string>("")
    const [mounted, setMounted] = React.useState<boolean>(false)

    const [focus, setFocus] = React.useState<boolean>()

    React.useEffect(() => {
      if (inputValue.length > 0) setFocus(true)
    }, [inputValue.length])
    

    const router = useRouter();
    const pathname = usePathname();

    const [isPending, startTransition] = React.useTransition()

    const handleSearchParams = React.useCallback(
        (inputValue: string) => {
          const params = new URLSearchParams(window.location.search);
          if (inputValue.length > 0) {
            params.set("search", inputValue);
          } else {
            params.delete("search");
          }
          startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
          });
        },
        [pathname, router],
    );

    // EFFECT: Set Initial Params
    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const searchQuery = params.get("search") ?? ""
      setInputValue(searchQuery)
    }, [])

    // EFFECT: Set Mounted
    React.useEffect(() => {
      if (debouncedValue.length > 0 && !mounted) {
        setMounted(true)
      }
    }, [debouncedValue, mounted])

    // EFFECT: Debounce Input Value
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(inputValue)
      }, 500)

      return () => {
        clearTimeout(timer)
      }
    }, [inputValue])

    // EFFECT: Search Params
    React.useEffect(() => {
      if (mounted) handleSearchParams(debouncedValue)
    }, [debouncedValue, handleSearchParams, mounted])
    
  return (
    <motion.div 
      className='relative w-[70%]'
      animate={focus ? "open" : "closed"}
      variants={variants}
    >

        {/* <Button
            className='w-fit h-fit' 
            variant='ghost'
        >
            <Search className="h-5 w-5" />
        </Button>  */}

        <InputSearch
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          placeholder={dict.button}
          onFocus={() => {
            console.log('focus')
            setFocus(true)}}
          onBlur={() => setFocus(false)}
          autoFocus
          className='w-full transition-all'
        >
          <Search className="h-4 w-4" />
        </InputSearch>
        {isPending ? (
          <div className="absolute top-2 right-2">
            <Loader2 className='animate-spin' />
          </div>
        ) : null}
        {inputValue.length > 0 ? (
            <Button 
                variant='ghost'
                className="absolute top-2 right-2 w-fit h-fit p-0"
                onClick={() => {
                    setDebouncedValue('')
                    setInputValue('')
                }}
            >
                <X />
            </Button>
        ) : null}
    </motion.div>
  )
}
