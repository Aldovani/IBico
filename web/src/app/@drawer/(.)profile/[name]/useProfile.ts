import { User } from '@/contexts/authContext'
import { api } from '@/services/api'
import { UserRepository } from '@/services/api/repositories/user'
import { toast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AnimationEvent, useState } from 'react'

type Reviews = {
  id: string
  describe: string
  rating: number
  createdAt: string
  opportunity: {
    title: string
    description: string
    author: {
      name: string
      username: string
      avatar: string
    }
  }
}
type ResponseGetProfile = {
  user: User & { rating: number }
  reviews: Reviews[]
  totalOpportunities: number
  totalServices: number
}

type useProfileProps = {
  username: string
}
export function useProfile({ username }: useProfileProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const { data, isLoading } = useQuery({
    queryKey: ['GET_PROFILE'],
    queryFn: () => fetchProfile(username),
    onSuccess: (data) => {
      if (!data) {
        toast({
          title: 'Usuário não encontrado',
          text: 'Verifique se o nome do usuário',
          type: 'ERROR',
        })
        router.back()
      }
    },
  })

  function handleCloseDrawer() {
    setIsOpen(false)
  }

  function handleAnimationEnd(e: AnimationEvent<HTMLDivElement>) {
    if (e.animationName === 'leaveRight') {
      router.back()
    }
  }

  return {
    isOpen,
    isLoading,
    data,
    handleCloseDrawer,
    handleAnimationEnd,
  }
}

async function fetchProfile(username: string) {
  try {
    const [user, reviews] = await Promise.all([
      UserRepository.getProfile(username),
      api.get(`http://localhost:8080/reviews/${username}`),
    ])

    if (user.status !== 200 || reviews.status !== 200) {
      return null
    }

    return {
      user: user.data,
      reviews: reviews.data.data,
      totalOpportunities: user.totalOpportunities,
      totalServices: user.totalServices,
    } as ResponseGetProfile
  } catch (err) {
    return null
  }
}
