'use client'
import { SkillsList } from '@/components/Skills/SkillsList'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import {
  FiBriefcase,
  FiThumbsUp,
  FiUser,
  FiShare2,
  FiSlash,
  FiX,
  FiSmile,
  FiFrown,
  FiMeh,
} from 'react-icons/fi'
import { useProfile } from './useProfile'
import { ProfileSkeleton } from '@/components/ProfileSkeleton'

type ProfileProps = {
  params: {
    name: string
  }
}

export default function DrawerProfile({ params }: ProfileProps) {
  const { data, handleCloseDrawer, handleAnimationEnd, isOpen, isLoading } =
    useProfile({
      username: params.name,
    })

  return (
    <>
      <div
        onClick={handleCloseDrawer}
        className="fixed w-screen h-screen z-50 top-0 left-0 bg-black bg-opacity-5"
      ></div>
      <div
        onAnimationEnd={handleAnimationEnd}
        data-is-leaving={isOpen}
        className="fixed p-10 pt-6 pb-0 w-3/6 min-h-screen  animate-from-right bg-slate-50 right-0 top-0 z-[60] data-[is-leaving='false']:animate-leave-right"
      >
        {isLoading || !data ? (
          <ProfileSkeleton />
        ) : (
          <main className="relative">
            <div className="absolute top-0 right-0 ">
              <button
                onClick={handleCloseDrawer}
                className="border-x text-slate-400 border-y border-slate-200 p-1 rounded-lg transition-all bg-slate-50  hover:scale-105 hover:text-rose-600"
              >
                <FiX size={20} />
              </button>
            </div>
            <div>
              <header className="flex gap-10  items-center">
                <Image
                  src={data.user.avatar}
                  className="border-8 border-slate-50 rounded-full"
                  alt="avatar"
                  width={128}
                  height={128}
                />

                <div>
                  <h1 className=" text-4xl text-blue-900 font-bold">
                    {data.user.name}
                  </h1>
                  <span className="font-poppins block text-slate-400 mt-2">
                    por aqui desde{' '}
                    {formatDate(new Date(data.user.createdAt), {
                      dateStyle: 'long',
                    })}
                  </span>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="font-poppins text-blue-900 flex items-center gap-2">
                      compartilhar
                      <FiShare2 size={16} />
                    </p>
                    <p className="font-poppins text-rose-600 flex items-center  gap-2">
                      Reportar usuário
                      <FiSlash size={16} />
                    </p>
                  </div>
                </div>
              </header>

              <div className="flex w-full mt-8 mb-8  gap-4 justify-between">
                <div className="border w-full border-slate-200 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <FiBriefcase size={32} className="text-blue-900" />
                    <strong className="font-semibold font-poppins text-2xl">
                      {data.totalServices.toString().padStart(2, '00')}
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
                      {data.totalOpportunities.toString().padStart(2, '00')}
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
                      {data.user.rating >= 8 && (
                        <FiSmile size={32} color="#16A34A" />
                      )}
                      {data.user.rating >= 5 && data.user.rating < 8 && (
                        <FiMeh size={32} color="#CA8A04" />
                      )}
                      {data.user.rating >= 1 && data.user.rating < 5 && (
                        <FiFrown size={32} color="#E11D48" />
                      )}
                    </strong>
                  </div>
                  <p className="text-slate-500 max-w-[120px] mt-4">
                    avaliação do usuário{' '}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-slate-500 font-medium font-inter mb-3">
                  Competências
                </h3>
                <SkillsList
                  skills={data.user.skills.map((skill) => ({
                    id: Math.random(),
                    name: skill,
                  }))}
                />
              </div>

              <div className="w-full mt-8">
                <h3 className="text-slate-500 font-medium font-inter mb-3">
                  Ultimas atividades
                </h3>
                <ul className="mt-4">
                  {data.reviews.map((item) => (
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
                        <span className="font-poppins text-green-600">
                          ótimo
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  )
}
