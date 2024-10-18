'use client'

import FormBase from '@/components/forms'
import NewPasswordForm from '@/components/forms/new-password'

export default function NewPasswordPage() {
  return (
    <FormBase className="space-y-3">
      <div className="flex w-full flex-col items-start text-left">
        <h1 className="font-semibold">Defina sua nova senha</h1>
      </div>
      <NewPasswordForm />
    </FormBase>
  )
}
