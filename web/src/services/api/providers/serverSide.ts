import axios, { AxiosError } from 'axios'
import { getCookies } from 'next-client-cookies/server'
import { HTTPS_CODES } from '@/constants/http-codes'

const baseUrl = {
  local: 'http://localhost:8080/v1',
  nuvem: 'https://ibico.sa-east-1.elasticbeanstalk.com/v1',
}

export const serverApi = axios.create({
  baseURL: baseUrl.nuvem,
  headers: {
    referrerPolicy: 'unsafe_url',
  },
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
