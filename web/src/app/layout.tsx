import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { AppProviders } from '@/contexts'
import { ToastContainer } from '@/components/Toast'
import { cookies } from 'next/headers'
import { Page } from '@/components/Page'
import { Metadata } from 'next'
import { ReviewModal } from '@/components/ReviewModal'
import { api } from '@/services/api'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
})

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'iBico',
  description: '',
  other: {
    'Content-Security-Policy': 'upgrade-insecure-requests',
  },
}
type RootLayoutProps = {
  children: React.ReactNode
  drawer: React.ReactNode
}

export default async function RootLayout({
  children,
  drawer,
}: RootLayoutProps) {
  const user = await getServerSide()

  return (
    <html lang="pt-br">
      <AppProviders user={user}>
        <body className={`${poppins.variable} ${inter.variable}`}>
          <Page>{children}</Page>
          <Page>{drawer}</Page>
          <ToastContainer />
          <ReviewModal />
        </body>
      </AppProviders>
    </html>
  )
}

async function getServerSide() {
  try {
    const { data } = await api.get('http://localhost:8080/users/me', {
      headers: { cookie: cookies().toString() },
    })
    return data
  } catch (err) {
    return null
  }
}
