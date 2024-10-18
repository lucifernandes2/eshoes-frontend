'use client'

import FormBase from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingIndicator from '@/components/ui/loading-indicator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z
  .object({
    confirmarSenha: z.string().min(8, {
      message: 'A confirmação da senha precisa ter no mínimo 8 caracteres.'
    }),
    novaSenha: z.string().min(8, {
      message: 'A nova senha precisa ter no mínimo 8 caracteres.'
    })
  })
  .refine(data => data.novaSenha === data.confirmarSenha, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmarSenha']
  })

export default function NewPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      confirmarSenha: '',
      novaSenha: ''
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async values => {
    setIsLoading(true)

    console.log(values)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <FormBase className="w-full space-y-3">
      <div className="flex w-full flex-col items-start text-left">
        <h1 className="font-semibold">Defina sua nova senha</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-3">
          <FormField
            name="novaSenha"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="novaSenha" className="text-[15px]">
                  Nova Senha
                </FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input sizeType="lg" id="novaSenha" type="password" placeholder="****" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmarSenha"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[15px]" htmlFor="confirmarSenha">
                  Confirmar Senha
                </FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input sizeType="lg" type="password" placeholder="****" id="confirmarSenha" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3 flex justify-center">
            <Button size="lg" type="submit" className="w-full text-base">
              {isLoading ? <LoadingIndicator /> : 'Salvar'}
            </Button>
          </div>
        </form>
      </Form>
    </FormBase>
  )
}
