'use client'

import FormBase from '..'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingIndicator from '@/components/ui/loading-indicator'
import { useToast } from '@/components/ui/use-toast'
import { type ForgotPassowrdDataType, forgotPasswordFormSchema } from '@/lib/schemas/forgot-password-form.schema'
import { forgotPassword } from '@/services/user/userCases'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'

const initialState = {
  error: '',
  message: ''
}

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPassword, initialState)
  const { toast } = useToast()

  const form = useForm<ForgotPassowrdDataType>({
    defaultValues: {
      email: ''
    },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordFormSchema)
  })

  React.useEffect(() => {
    if (state?.error) {
      toast({
        description: state?.error,
        title: 'Aconteceu algo inesperado!',
        variant: 'destructive'
      })
    }
    if (state?.success) {
      toast({
        description: 'Cheque sua caixa de e-mail e confirme a redefinição de senha!',
        title: state?.success,
        variant: 'success'
      })
    }
  }, [state, toast])

  return (
    <FormBase className="flex flex-col gap-3">
      <div className="text-left">
        <p className="font-semibold dark:font-medium">Esqueceu sua senha?</p>
        <p className="text-[15px] text-muted-foreground">Enviaremos um e-mail com instruções de como redefinir sua senha.</p>
      </div>
      <Form {...form}>
        <form action={formAction} className="flex w-full max-w-sm flex-col gap-3">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel />
                <FormControl>
                  <Input
                    required
                    placeholder="CPF ou E-mail"
                    {...field}
                    className="rounded-bl-none rounded-br-none rounded-tl-lg rounded-tr-lg border-2 px-3 py-6 focus-visible:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
        </form>
      </Form>
    </FormBase>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button size="lg" type="submit" disabled={pending} className="text-base">
      {pending ? <LoadingIndicator /> : 'Enviar e-mail'}
    </Button>
  )
}
