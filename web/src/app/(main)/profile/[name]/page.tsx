import { User } from '@/contexts/authContext'
import { serverApi } from '@/services/api'
import { AxiosResponse } from 'axios'

import { FiBriefcase, FiUser, FiThumbsUp } from 'react-icons/fi'
import { notFound } from 'next/navigation'
import { SkillsList } from '@/components/Skills/SkillsList'
import Link from 'next/link'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'

type ProfileProps = {
  params: {
    name: string
  }
}

type ResponseGetUser = User & {
  opportunitiesPosted: []
  reviews: []
}

async function fetchData(name: string) {
  console.log(name)
  try {
    const { data } = await serverApi.get<
      unknown,
      AxiosResponse<ResponseGetUser>
    >(`/users/${name}`)
    return data
  } catch (err) {
    console.log({ err })
    return null
  }
}

export default async function Profile({ params }: ProfileProps) {
  const data = await fetchData(params.name)

  if (!data) notFound()
  console.log({ data })

  const user = data
  return (
    <main className="pb-10">
      <div className="h-40 bg-blue-700"></div>

      <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto ">
        <header className="-translate-y-6 flex flex-col items-center justify-center">
          <Image
            src={user?.imgURL || ''}
            className="border-8 border-slate-50 rounded-full"
            alt="avatar"
            width={190}
            height={190}
          />

          <h1 className="text-5xl font-bold">{user.name}</h1>
          <span className="font-poppins text-slate-400 mt-2">
            {formatDate.format(new Date(user.dateOfCreation))}
          </span>
          <div className="flex items-center gap-3 mt-3">
            <p className="font-poppins text-blue-700">compartilhar</p>
            <p className="font-poppins text-slate-400">Reportar usuário</p>
          </div>
        </header>

        <div className="flex w-full mt-10 mb-8  gap-4 justify-between">
          <div className="border w-full border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <FiBriefcase size={32} className="text-blue-700" />
              <strong className="font-semibold font-poppins text-2xl">
                {user.reviews.length}
              </strong>
            </div>
            <p className="text-slate-500 max-w-[120px] mt-4">
              numero de serviços{' '}
            </p>
          </div>

          <div className="border w-full border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <FiUser size={32} className="text-blue-700" />
              <strong className="font-semibold font-poppins text-2xl">
                {user.opportunitiesPosted.length}
              </strong>
            </div>
            <p className="text-slate-500 max-w-[120px] mt-4">
              numero de oportunidades{' '}
            </p>
          </div>

          <div className="border w-full border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <FiThumbsUp size={32} className="text-blue-700" />
              <strong className="font-semibold font-poppins text-2xl">
                20
              </strong>
            </div>
            <p className="text-slate-500 max-w-[120px] mt-4">
              numero de usuário{' '}
            </p>
          </div>
        </div>

        <SkillsList skills={user.skills} />

        <div className="w-full mt-8">
          <h3 className="text-slate-500 font-poppins">Ultimas atividades</h3>
          <ul className="mt-4">
            <li className="flex border items-center border-slate-200 rounded-lg p-3">
              <div className="bg-slate-200 w-14 h-14 rounded-full flex items-center justify-center">
                <FiUser size={32} />
              </div>

              <div className="ml-3">
                <h4 className="font-poppins font-medium ">Faxineira</h4>

                <Link
                  className="font-poppins text-xs text-slate-500"
                  href={`/profile/{}`}
                >
                  por{' '}
                  <span className="text-blue-500">Luize Santos da silva </span>
                </Link>
              </div>

              <div className="ml-auto flex flex-col items-end">
                <span className="font-poppins text-slate-500">20/09/2023</span>
                <span className="font-poppins text-green-600">ótimo</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
