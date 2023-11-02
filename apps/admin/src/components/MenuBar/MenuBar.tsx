"use client"

import { Button, NavigationMenu, NavigationMenuList, ScrollArea, Separator } from '@siberiana/ui'
import React from 'react'
import { MenuBarGroup, MenuBarSingle } from './MenuBarItems' 
import { artifactsMenuItems, artsMenuItems, booksMenuItems, holdersMenuItems, locationsMenuItems, ooptMenuItems, organizationsMenuItems, personsMenuItems, projectsMenuItems } from '~/lib/static/menu'
import { cn } from '@siberiana/ui/src/lib/utils'
import { Menu, X } from 'lucide-react'

function getWindowSize() {
    if (typeof window !== "undefined") {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }
}

export default function MenuBar() {
    // Yes, not elegant, but simple and works)
    const [open, setOpen] = React.useState(false)
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
    }, [windowSize?.innerWidth])
    

  return (
    <>
        <Button
            className="fixed mt-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden block"
            onClick={() => setOpen((open) => !open)}
        >
            {open
                ? <X />
                : <Menu/> 
            }
        </Button>
        <NavigationMenu orientation='vertical' className="nav-bar fixed md:mt-20 mt-16 z-30 max-w-[14rem] bg-background border border-l-0 border-t-0 shadow-md rounded-b-md pr-1">
            <ScrollArea
                className={cn(
                    "font-Inter w-full p-1 pr-2 mb-1",
                    open ? "flex" : "hidden"
                )}
                classNameViewport={"max-h-[85dvh] min-h-[80vh]"}
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
