'use client'

import { logoutUser } from '@/app/data/services/get-user-me-loader'
import { navigate } from '@/app/lib/actions'
import { CollapseMenuButton } from '@/components/admin-panel/collapse-menu-button'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getMenuList } from '@/lib/menu-list'
import { cn } from '@/lib/utils'
import { Ellipsis, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuProps {
  isOpen: boolean | undefined
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname()
  const menuList = getMenuList(pathname)

  const handleLogout = () => {
    logoutUser()
    navigate('/sign-in')
  }

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li key={index} className={cn('w-full', groupLabel ? 'pt-5' : '')}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">{groupLabel}</p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(({ active, href, icon: Icon, label, submenus }, index) =>
                !submenus || submenus.length === 0 ? (
                  <div key={index} className="w-full">
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            className="w-full justify-start h-10 mb-1"
                            variant={(active === undefined && pathname.startsWith(href)) || active ? 'secondary' : 'ghost'}
                          >
                            {/* <Link href={href}> */}
                            <div className="cursor-pointer mr-4">
                              <span className={cn(isOpen === false ? '' : 'mr-4')}>
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn('max-w-[200px] truncate', isOpen === false ? '-translate-x-96 opacity-0' : 'translate-x-0 opacity-100')}
                              >
                                {label}
                              </p>
                            </div>
                            {/* </Link> */}
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div key={index} className="w-full">
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      isOpen={isOpen}
                      submenus={submenus}
                      active={active === undefined ? pathname.startsWith(href) : active}
                    />
                  </div>
                )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handleLogout} className="w-full justify-center h-10 mt-5">
                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                      <LogOut size={18} />
                    </span>
                    <p className={cn('whitespace-nowrap', isOpen === false ? 'opacity-0 hidden' : 'opacity-100')}>Sair</p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && <TooltipContent side="right">Sair</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  )
}
