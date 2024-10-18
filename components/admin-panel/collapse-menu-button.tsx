'use client'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Dot } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

interface CollapseMenuButtonProps {
  icon: LucideIcon
  label: string
  active: boolean
  submenus: Submenu[]
  isOpen: boolean | undefined
}

export function CollapseMenuButton({ active, icon: Icon, isOpen, label, submenus }: CollapseMenuButtonProps) {
  const pathname = usePathname()
  const isSubmenuActive = submenus.some(submenu => (submenu.active === undefined ? submenu.href === pathname : submenu.active))
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive)

  return isOpen ? (
    <Collapsible open={isCollapsed} className="w-full" onOpenChange={setIsCollapsed}>
      <CollapsibleTrigger asChild className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1">
        <Button className="w-full justify-start h-10" variant={isSubmenuActive ? 'secondary' : 'ghost'}>
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <span className="mr-4">
                <Icon size={18} />
              </span>
              <p className={cn('max-w-[150px] truncate', isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0')}>{label}</p>
            </div>
            <div className={cn('whitespace-nowrap', isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0')}>
              <ChevronDown size={18} className="transition-transform duration-200" />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ active, href, label }, index) => (
          <Button
            asChild
            key={index}
            className="w-full justify-start h-10 mb-1"
            variant={(active === undefined && pathname === href) || active ? 'secondary' : 'ghost'}
          >
            <Link href={href}>
              <span className="mr-4 ml-2">
                <Dot size={18} />
              </span>
              <p className={cn('max-w-[170px] truncate', isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0')}>{label}</p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button className="w-full justify-start h-10 mb-1" variant={isSubmenuActive ? 'secondary' : 'ghost'}>
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                      <Icon size={18} />
                    </span>
                    <p className={cn('max-w-[200px] truncate', isOpen === false ? 'opacity-0' : 'opacity-100')}>{label}</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" align="start" sideOffset={25}>
        <DropdownMenuLabel className="max-w-[190px] truncate">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ active, href, label }, index) => (
          <DropdownMenuItem asChild key={index}>
            <Link href={href} className={`cursor-pointer ${((active === undefined && pathname === href) || active) && 'bg-secondary'}`}>
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
