'use client'

import eyeClosed from '@/app/assets/icons/eyeClosed.svg'
import eyeVisible from '@/app/assets/icons/eyeVisible.svg'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { forwardRef, useState } from 'react'

const PasswordToggle = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  // Cria o componente PasswordToggle | Permite adiconar várias estilizações de className | Agrupa todas as propriedades criadas de um objeto em um props
  const [visible, setPasswordVisible] = useState(true) // Cria um estado interno no componente | Visible armazena o estado de visibilidade (inicialmente oculta- false)

  const togglePasswordVisibility = () => {
    // Arrow function muda o estado interno do componente
    setPasswordVisible(visible => !visible) // Inverte o estado da senha
  }

  return (
    <div className="relative flex w-full">
      <input
        {...props}
        ref={ref}
        type={visible ? 'text' : 'password'} // Se for visible mostra um texto, se não, mostra password (oculta)
        className={cn(
          `flex h-10 w-full rounded-lg border-2 border-input bg-background px-[18px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none`,
          className
        )}
      />
      <Button
        type="button"
        variant="ghost"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex size-12 items-center bg-transparent px-3 pb-1 pt-2 hover:bg-transparent"
      >
        <Image className="h-6 w-6" src={visible ? eyeVisible : eyeClosed} alt={visible ? 'Senha visível' : 'Senha invisível'} />
      </Button>
    </div>
  )
})
PasswordToggle.displayName = 'PasswordToggle'

export default PasswordToggle
