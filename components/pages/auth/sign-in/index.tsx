'use client'

import { loginUserAction } from '@/app/data/actions/authorize-actions'
import { StrapiErrors } from '@/components/custom/strapi-errors'
import { SubmitButton } from '@/components/custom/submit-button'
import { ZodErrors } from '@/components/custom/zod-errors'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Footprints } from 'lucide-react'
import { useFormState } from 'react-dom'

const INITIAL_STATE = {
  data: null,
  message: null,
  zodErrors: null
}

export function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE)

  return (
    <div className="w-full max-w-md">
      <form method="POST" action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold flex justify-start gap-3">
              <p>E-Shoes</p>
              <Footprints className="w-6 h-6 mr-1" />
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Email</Label>
              <Input id="login" type="text" name="login" placeholder="email" />
              <ZodErrors error={formState?.zodErrors?.login} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" placeholder="senha" />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton text="Entrar" className="w-full" loadingText="Loading" />
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
