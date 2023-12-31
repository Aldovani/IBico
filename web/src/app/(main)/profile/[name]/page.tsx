import { User } from '@/contexts/authContext'

import { FiBriefcase, FiUser, FiThumbsUp } from 'react-icons/fi'
import { notFound } from 'next/navigation'
import { SkillsList } from '@/components/Skills/SkillsList'
import Link from 'next/link'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import { api } from '@/services/api'
import { cookies } from 'next/headers'

type ProfileProps = {
  params: {
    name: string
  }
}

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

async function fetchData(name: string) {
  try {
    const [userResponse, reviewsResponse] = await Promise.all([
      api.get(`http://localhost:8080/users/profile/${name}`, {
        headers: {
          cookie: cookies().toString(),
        },
      }),
      api.get(`http://localhost:8080/reviews/${name}`, {
        headers: {
          cookie: cookies().toString(),
        },
      }),
    ])

    if (userResponse.status !== 200 || reviewsResponse.status !== 200) {
      return null
    }

    const [user, reviews] = await Promise.all([
      userResponse.data,
      reviewsResponse.data,
    ])

    return {
      user: user.data,
      reviews: reviews.data,
      totalOpportunities: user.totalOpportunities,
      totalServices: user.totalServices,
    } as ResponseGetProfile
  } catch (err) {
    return null
  }
}

export default async function Profile({ params }: ProfileProps) {
  const data = await fetchData(params.name)

  if (!data) notFound()

  const { user, reviews, totalOpportunities, totalServices } = data
  return (
    <main className="pb-10">
      <div className="h-40 bg-blue-900"></div>

      <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto ">
        <header className="-translate-y-6 flex flex-col items-center justify-center">
          <Image
            src={user?.avatar || ''}
            className="border-8 border-slate-50 rounded-full"
            alt="avatar"
            width={190}
            height={190}
          />

          <h1 className="text-5xl font-bold">{user.name}</h1>
          <span className="font-poppins text-slate-400 mt-2">
            {formatDate(new Date(user.createdAt))}
          </span>
          <div className="flex items-center gap-3 mt-3">
            <p className="font-poppins text-blue-900">compartilhar</p>
            <p className="font-poppins text-slate-400">Reportar usuário</p>
          </div>
        </header>

        <div className="flex w-full mt-10 mb-8  gap-4 justify-between">
          <div className="border w-full border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <FiBriefcase size={32} className="text-blue-900" />
              <strong className="font-semibold font-poppins text-2xl">
                {totalServices.toString().padStart(2, '00')}
              </strong>
            </div>
            <p className="text-slate-500 max-w-[120px] mt-4">
              numero de serviços{' '}
            </p>
          </div>

          <div className="border w-full border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <FiUser size={32} className="text-blue-900" />
              <strong className="font-semibold font-poppins text-2xl">
                {totalOpportunities.toString().padStart(2, '00')}
              </strong>
            </div>
            <p className="text-slate-500 max-w-[120px] mt-4">
              numero de oportunidades{' '}
            </p>
          </div>

          <div className="border w-full border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <FiThumbsUp size={32} className="text-blue-900" />
              <strong className="font-semibold font-poppins text-2xl">
                {user.rating}
              </strong>
            </div>
            <p className="text-slate-500 max-w-[120px] mt-4">
              numero de usuário{' '}
            </p>
          </div>
        </div>

        <SkillsList
          skills={user.skills?.map((skill) => ({
            id: Math.random(),
            name: skill,
          }))}
        />

        <div className="w-full mt-8">
          <h3 className="text-slate-500 font-poppins">Ultimas atividades</h3>
          <ul className="mt-4">
            {reviews.map((item) => (
              <li
                key={item.id}
                className="flex border items-center border-slate-200 rounded-lg p-3"
              >
                <div className="bg-slate-200 w-14 h-14 rounded-full flex items-center justify-center">
                  <FiUser size={32} />
                </div>

                <div className="ml-3">
                  <h4 className="font-poppins font-medium ">
                    {item.opportunity.title}
                  </h4>

                  <Link
                    className="font-poppins text-xs text-slate-500"
                    href={`/profile/${item.opportunity.author.username}`}
                  >
                    por{' '}
                    <span className="text-blue-900">
                      Luize Santos da silva{' '}
                    </span>
                  </Link>
                </div>

                <div className="ml-auto flex flex-col items-end">
                  <span className="font-poppins text-slate-500">
                    20/09/2023
                  </span>
                  <span className="font-poppins text-green-600">ótimo</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
