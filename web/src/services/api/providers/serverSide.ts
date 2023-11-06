import { env } from 'process'
import axios, { AxiosError } from 'axios'
import { getCookies } from 'next-client-cookies/server'
import { HTTPS_CODES } from '@/constants/http-codes'

export const serverApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/v1',
})

serverApi.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (error.response?.status === HTTPS_CODES.UNAUTHORIZED) {
      getCookies().set('token', '')
    }
    return Promise.reject(error)
  },
)

serverApi.interceptors.request.use(function (config) {
  const token = getCookies().get('token')

  if (!token) {
    return config
  }
  config.headers.Authorization = `Bearer ${token}`
  return config
})
