import './globals.css'
import type { Metadata } from 'next'
import { Lato, Poppins } from 'next/font/google'
import { AppProviders } from '@/contexts'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
})

const lato = Lato({
  variable: '--font-lato',
  weight: ['400', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'IBico',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProviders>
      <html lang="pt-br">
        <body className={`${poppins.variable} ${lato.variable}`}>
          {children}
        </body>
      </html>
    </AppProviders>
  )
}
