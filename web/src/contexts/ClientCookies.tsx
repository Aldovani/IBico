'use client'

import { CookiesProvider } from 'next-client-cookies'

export const ClientCookiesProvider: typeof CookiesProvider = ({
  children,
  ...rest
}) => <CookiesProvider {...rest}>{children}</CookiesProvider>
