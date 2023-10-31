import { useLocalStorage } from '@/hooks/useLocalStorage'
import axios from 'axios'
import { env } from 'process'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/v1',
})
api.interceptors.request.use(
  function (config) {
    const { get } = useLocalStorage()
    const token = get('token')

    if (token) {
      return config
    }
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)
