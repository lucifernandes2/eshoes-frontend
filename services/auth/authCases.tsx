// 'use server'

// import { signIn, signOut } from '@/auth'
// import { AuthError } from 'next-auth'

// async function logoutUser() {
//   await signOut()
// }

// async function authenticate(
//   prevState:
//     | {
//         message: string
//       }
//     | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn('credentials', formData)
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return {
//             message: 'Credenciais inválidas, tente novamente'
//           }
//         default:
//           return {
//             message: 'Credenciais inválidas, tente novamente'
//           }
//       }
//     }
//     throw error
//   }
// }

// export { logoutUser, authenticate }
