'use server'

import { cookies } from 'next/headers'

export async function getUserMeLoader() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')

  if (!token) {
    return {
      data: null,
      error: null,
      ok: false
    }
  }

  return {
    data: {},
    error: null,
    ok: true
  }
}

export async function logoutUser() {
  const cookieStore = cookies()
  cookieStore.delete('jwt')
  return true
}
