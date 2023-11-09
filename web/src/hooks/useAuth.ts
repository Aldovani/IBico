import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'

export function useAuth() {
  const data = useContext(AuthContext)

  return data
}
