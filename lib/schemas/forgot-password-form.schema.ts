import { z } from 'zod'
export const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: 'Email é obrigatório' })
})

export type ForgotPassowrdDataType = z.TypeOf<typeof forgotPasswordFormSchema>
