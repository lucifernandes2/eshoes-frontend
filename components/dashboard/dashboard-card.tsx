import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card as ShadCard } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { EllipsisVertical } from 'lucide-react'
import React from 'react'
interface CardProps {
  title: string
  description?: string
  content?: React.ReactNode
  footer?: React.ReactNode
  size?: 'lg' | 'md' | 'sm'
}

const sizeStyles = {
  lg: 'h-[607px] w-[555px]',
  md: 'h-[296px] w-full',
  sm: 'h-40 w-full'
}

export function Card({ content, description, footer, size = 'md', title }: CardProps) {
  const sizeStyle = sizeStyles[size]

  return (
    <ShadCard className={cn(sizeStyle, 'w-full flex-grow border-2 border-input bg-card text-tertiary dark:text-card-foreground')}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <EllipsisVertical size={22} className="text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{title}</DropdownMenuLabel>
              <DropdownMenuItem>Opção 1</DropdownMenuItem>
              <DropdownMenuItem>Opção 2</DropdownMenuItem>
              <DropdownMenuItem>Opção 3</DropdownMenuItem>
              <DropdownMenuItem>Opção 4</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </ShadCard>
  )
}
