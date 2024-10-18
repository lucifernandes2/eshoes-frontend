'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  )
}

interface SubmitButtonProps {
  text: string
  loadingText: string
  className?: string
  loading?: boolean
}

export function SubmitButton({ className, loading, loadingText, text }: Readonly<SubmitButtonProps>) {
  const status = useFormStatus()
  return (
    <Button type="submit" className={cn(className)} disabled={status.pending || loading} aria-disabled={status.pending || loading}>
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  )
}
