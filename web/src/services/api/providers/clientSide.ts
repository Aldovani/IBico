'use client'
import { HTTPS_CODES } from '@/constants/http-codes'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { toast } from '@/utils/toast'
import axios, { AxiosError } from 'axios'

const baseUrl = {
  local: 'http://localhost:8080/v1',
  nuvem: 'https://ibico.sa-east-1.elasticbeanstalk.com/v1',
}

const clientApi = axios.create({
  baseURL: baseUrl.nuvem,
  headers: {
    referrerPolicy: 'unsafe_url',
  },
})
clientApi.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (error.code === 'ERR_NETWORK') {
      toast({
        title: 'Error',
        text: 'Ops! Encontramos um problema interno no servidor. Estamos trabalhando para corrigi-lo. Desculpe pelo inconveniente.',
        type: 'ERROR',
      })
    }
    if (error.response?.status === HTTPS_CODES.UNAUTHORIZED) {
      const { remove } = useLocalStorage()
      remove('token')
    }
    return Promise.reject(error)
  },
)

clientApi.interceptors.request.use(function (config) {
  const { get } = useLocalStorage()
  const token = get('token')
  if (!token) {
    return config
  }
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export { clientApi }
