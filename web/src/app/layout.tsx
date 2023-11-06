import './globals.css'
import { Lato, Poppins } from 'next/font/google'
import { AppProviders } from '@/contexts'
import { ToastContainer } from '@/components/Toast'
import { ReviewModal } from '@/components/ReviewModal'
import { cookies, headers } from 'next/headers'
import { Page } from '@/components/Page'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { serverApi } from '@/services/api'
import { checkIsPublicRoute } from '@/utils/checkIsPublicRoute'

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
  title: 'iBico',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookiesAll = cookies().getAll()
  const user = await fetchUser()

  // const headersList = headers()
  // const url = headersList.get('x-url') || '/'
  // const { pathname } = new URL(url)
  // const isPublicPage = checkIsPublicRoute(pathname)

  // if (!!user && !isPublicPage) {
  //   redirect('/auth/sign-in')
  // }

  // if (user && isPublicPage) {
  //   redirect('/opportunities')
  // }

  return (
    <html lang="pt-br">
      <AppProviders cookies={cookiesAll} user={user}>
        <body className={`${poppins.variable} ${lato.variable}`}>
          <Page>{children}</Page>
          <ToastContainer />
          {/* <ReviewModal /> */}
        </body>
      </AppProviders>
    </html>
  )
}
async function fetchUser() {
  try {
    const { data } = await serverApi.get('/users')
    console.log({ dados: data })
    return data.items[0]
  } catch (err) {
    return null
  }
}
