import { HTTPS_CODES } from '@/constants/http-codes'
import { toast } from '@/utils/toast'
import axios, { AxiosError } from 'axios'
import { delay } from '../../utils/delay'
const baseURL = 'http://localhost:8080'
let isRefreshing = false
let failedRequestQueue: {
  onSuccess: (cookies: string[] | undefined) => void
  onFailure: (err: AxiosError) => void
}[] = []

const api = axios.create({
  baseURL,
  withCredentials: true,
})
const isServer = typeof window === 'undefined'

api.interceptors.request.use(async (request) => {
  await delay(1500)

  return request
})

api.interceptors.response.use(
  (response) => response,
  async function (
    error: AxiosError<{
      code: string
    }>,
  ) {
    if (error.code === 'ERR_NETWORK') {
      toast({
        title: 'Erro no servidor',
        text: 'Ocorreu um erro em nossos servidores, tente  novamente em breve',
        type: 'ERROR',
      })
    }

    if (error.response?.status === HTTPS_CODES.UNAUTHORIZED) {
      if (!error.config) return

      const originalConfig = error.config

      const apiErrorCode = error.response.data.code
      let cookies = ''
      if (isServer) {
        const { cookies: nextCookies } = await import('next/headers')
        const serverCookies = nextCookies().toString()
        cookies = serverCookies
      }

      if (
        apiErrorCode === 'token.expired' ||
        apiErrorCode === 'token.invalid'
      ) {
        if (!isRefreshing) {
          isRefreshing = true

          api
            .post(
              '/sessions/refresh',
              {},
              {
                headers: {
                  cookie: isServer && cookies,
                },
              },
            )
            .then((data) => {
              const cookies = data.headers['set-cookie']
              failedRequestQueue.forEach((request) =>
                request.onSuccess(cookies),
              )
              failedRequestQueue = []
            })
            .catch((err) => {
              failedRequestQueue.forEach((request) => request.onFailure(err))
              failedRequestQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }
      } else {
        api.delete('/sessions')
        return
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (cookies: string[] | undefined) => {
            originalConfig?.headers.set('cookie', cookies)

            resolve(api(originalConfig))
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          },
        })
      })
    }
    return Promise.reject(error)
  },
)

export { api }
