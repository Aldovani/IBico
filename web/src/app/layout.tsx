import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { AppProviders } from '@/contexts'
import { ToastContainer } from '@/components/Toast'
import { cookies } from 'next/headers'
import { Page } from '@/components/Page'
import { Metadata } from 'next'
import { serverApi } from '@/services/api'
import { ReviewModal } from '@/components/ReviewModal'
import Head from 'next/head'

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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookiesAll = cookies().getAll()
  const user = await getServerSide()

  return (
    <html lang="pt-br">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <AppProviders cookies={cookiesAll} user={user}>
        <body className={`${poppins.variable} ${inter.variable}`}>
          <Page>{children}</Page>
          <ToastContainer />
          <ReviewModal />
        </body>
      </AppProviders>
    </html>
  )
}
async function getServerSide() {
  try {
    const { data } = await serverApi.get('/users')
    return data
  } catch (err) {
    return null
  }
}
