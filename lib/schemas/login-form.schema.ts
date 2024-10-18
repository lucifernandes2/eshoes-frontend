import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string(),
  password: z.string()
})

export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type LoginDataType = z.TypeOf<typeof loginFormSchema>
