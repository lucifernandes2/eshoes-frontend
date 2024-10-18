import Image from 'next/image'
import React from 'react'

import FadeinImages from '../animation-login/page'

export default function FormBase({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="flex h-screen max-h-screen w-full items-center justify-center overflow-hidden">
      <section className="flex w-[40%] flex-col gap-8 px-[128px] py-[115px]">
        <Image priority width={280} height={40.34} src="/logo-primary.svg" alt="Logo Moldsourcing" className="mx-auto flex h-auto w-full max-w-sm" />
        <div className={`mx-auto w-full max-w-xl ${className}`}>{children}</div>
      </section>
      <div className="w-[60%] bg-cover">
        <FadeinImages />
      </div>
    </div>
  )
}
