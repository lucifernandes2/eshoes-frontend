// auth-actions.ts
'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { loginUserService } from '../services/auth-service' // Importar o serviço de login

const schemaLogin = z.object({
  login: z.string().min(1, {
    message: 'Porfavor, insira um email'
  }),
  password: z.string().min(6, {
    message: 'Insira uma senha válida'
  })
})

const config = {
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  secure: process.env.NODE_ENV === 'production'
}

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    login: formData.get('login'),
    password: formData.get('password')
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      message: 'Missing Fields. Failed to Login.',
      zodErrors: validatedFields.error.flatten().fieldErrors
    }
  }

  const responseData = await loginUserService(validatedFields.data)

  if (!responseData) {
    return {
      ...prevState,
      message: 'Ops! Something went wrong. Please try again.',
      zodErrors: null
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      message: 'Failed to Login.',
      strapiErrors: responseData.error,
      zodErrors: null
    }
  }

  cookies().set('jwt', responseData, config)

  redirect('/')
}
