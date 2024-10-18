import { ThemeProvider } from '@/components/providers/theme-provider'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})
const roboto = localFont({
  src: [
    { path: './fonts/Roboto-Regular.ttf', weight: '400' },
    { path: './fonts/Roboto-Bold.ttf', weight: '700' }
  ],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: 'E-Shoes'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange> */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
