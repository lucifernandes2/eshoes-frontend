// 'use server'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
// import { z } from 'zod'

// import { registerUserService } from '../services/auth-service'

// const schemaRegister = z.object({
//   email: z.string().email({
//     message: 'Please enter a valid email address'
//   }),
//   password: z.string().min(6).max(100, {
//     message: 'Password must be between 6 and 100 characters'
//   }),
//   username: z.string().min(3).max(20, {
//     message: 'Username must be between 3 and 20 characters'
//   })
// })

// const config = {
//   domain: process.env.HOST ?? 'localhost',
//   httpOnly: true,
//   maxAge: 60 * 60 * 24 * 7, // 1 week
//   path: '/',
//   secure: process.env.NODE_ENV === 'production'
// }

// // export async function registerUserAction(prevState: any, formData: FormData) {
// //   console.log('Hello From Register User Action')

// //   const validatedFields = schemaRegister.safeParse({
// //     email: formData.get('email'),
// //     password: formData.get('password'),
// //     username: formData.get('username')
// //   })

// //   if (!validatedFields.success) {
// //     return {
// //       ...prevState,
// //       message: 'Missing Fields. Failed to Register.',
// //       strapiErrors: null,
// //       zodErrors: validatedFields.error.flatten().fieldErrors
// //     }
// //   }

// //   const responseData = await registerUserService(validatedFields.data)

// //   if (!responseData) {
// //     return {
// //       ...prevState,
// //       message: 'Ops! Something went wrong. Please try again.',
// //       strapiErrors: null,
// //       zodErrors: null
// //     }
// //   }

// //   if (responseData.error) {
// //     return {
// //       ...prevState,
// //       message: 'Failed to Register.',
// //       strapiErrors: responseData.error,
// //       zodErrors: null
// //     }
// //   }
// //   cookies().set('jwt', responseData.jwt, config)
// //   redirect('/')
// // }
