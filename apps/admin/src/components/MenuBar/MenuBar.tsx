"use client"

import { Button, NavigationMenu, NavigationMenuList, ScrollArea, Separator } from '@siberiana/ui'
import React from 'react'
import { MenuBarGroup, MenuBarSingle } from './MenuBarItems' 
import { artifactsMenuItems, artsMenuItems, booksMenuItems, holdersMenuItems, locationsMenuItems, ooptMenuItems, organizationsMenuItems, personsMenuItems, projectsMenuItems } from '~/lib/static/menu'
import { cn } from '@siberiana/ui/src/lib/utils'
import { Menu, X } from 'lucide-react'

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default function MenuBar() {
    // Yes, not elegant, but simple and works)
    const [open, setOpen] = React.useState(true)
    const [windowSize, setWindowSize] = React.useState(getWindowSize());

    React.useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    React.useEffect(() => {
        if (window.innerWidth <= 768) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [windowSize.innerWidth])
    

  return (
    <>
        <Button
            className={cn(
                "fixed mt-4 left-1/2 transform -translate-x-1/2 z-50",
                windowSize.innerWidth <= 768 ? "block" : "hidden"
            )}
            onClick={() => setOpen((open) => !open)}
        >
            {open
                ? <X />
                : <Menu/> 
            }
        </Button>
        <NavigationMenu orientation='vertical' className="fixed max-w-[14rem] md:mt-24 mt-20 bg-background border border-l-0 outline-none shadow-md rounded-r-md pr-1">
            <ScrollArea
                className={cn(
                    "font-Inter w-full p-1",
                    open ? "flex" : "hidden"
                )}
                classNameViewport={cn("max-h-[84dvh]")}
            >
                <NavigationMenuList className='flex flex-col gap-3 w-full text-left items-start p-2'>
                    <MenuBarSingle href='/categories'>
                        Категории
                    </MenuBarSingle>
                    <MenuBarSingle href='/collections'>
                        Коллекции
                    </MenuBarSingle>

                    <Separator className='bg-primary' />

                    <MenuBarGroup menuItem={artifactsMenuItems} href='/artifacts'/>
                    <MenuBarGroup menuItem={booksMenuItems} href='/books'/>
                    <MenuBarGroup menuItem={ooptMenuItems} href='/oopt'/>
                    <MenuBarGroup menuItem={artsMenuItems} href='/arts'/>

                    <Separator className='bg-primary' />

                    <MenuBarGroup menuItem={locationsMenuItems} href='/locations'/>

                    <Separator className='bg-primary' />

                    <MenuBarGroup menuItem={holdersMenuItems} href='/holders'/>
                    <MenuBarGroup menuItem={organizationsMenuItems} href='/organizations'/>
                    <MenuBarGroup menuItem={personsMenuItems} href='/persons'/>

                    <Separator className='bg-primary' />

                    <MenuBarGroup menuItem={projectsMenuItems} href='/projects'/>
                    <MenuBarSingle href='/publications'>
                        Публикации
                    </MenuBarSingle>
                    <MenuBarSingle href='/licenses'>
                        Лицензии
                    </MenuBarSingle>
                </NavigationMenuList>
            </ScrollArea>
        </NavigationMenu>
    </>
  )
}
