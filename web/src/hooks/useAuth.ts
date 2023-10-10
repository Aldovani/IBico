import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'

export function useAuth() {
  const { handleSignIn, isLoading, handleSignOut, isAuthenticated, user } =
    useContext(AuthContext)

  return {
    handleSignIn,
    isLoading,
    handleSignOut,
    isAuthenticated,
    user,
  }
}
