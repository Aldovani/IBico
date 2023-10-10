import axios from 'axios'
import { env } from 'process'

export const api = axios.create({
  baseURL: env.API_URL,
})
