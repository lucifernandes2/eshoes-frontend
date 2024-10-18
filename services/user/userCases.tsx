'use server'

import userAdapters from './userAdapters'

// user use cases
export async function forgotPassword(
  prevState:
    | {
        message?: string
        error?: string
      }
    | undefined,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string

    if (email) {
      const existingUser = userAdapters.getUserByEmail(email)

      if (!existingUser) {
        return {
          error: 'Email não encontrado.'
        }
      }
      console.log('aqui')
      return {
        success: 'Email de confirmação enviado.'
      }
    }

    return {
      error: 'O processamento de e-mail falhou.'
    }
  } catch (error) {
    return {
      error: 'O envio de e-mail falhou'
    }
  }
}
