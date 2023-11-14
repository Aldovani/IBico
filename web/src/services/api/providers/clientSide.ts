'use client'
import { HTTPS_CODES } from '@/constants/http-codes'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { toast } from '@/utils/toast'
import axios, { AxiosError } from 'axios'

const clientApi = axios.create({
  baseURL: 'http://ibico.sa-east-1.elasticbeanstalk.com',
})
clientApi.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (error.code === 'ERR_NETWORK') {
      toast({ title: 'Error', text: 'Erro ', type: 'ERROR' })
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
