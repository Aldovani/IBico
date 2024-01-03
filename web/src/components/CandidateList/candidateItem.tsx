import Image from 'next/image'
import Link from 'next/link'
import { FiFrown, FiMeh, FiSmile } from 'react-icons/fi'
import { Button } from '../Button'
type Candidate = {
  id: string
  avatar: string
  username: string
  name: string
  rating: number
}

type CandidateItemProps = {
  candidate: Candidate
  isSelectCandidateLoading: boolean
  handleSelectCandidate: () => void
}
export function CandidateItem({
  candidate,
  isSelectCandidateLoading,
  handleSelectCandidate,
}: CandidateItemProps) {
  return (
    <li className="flex flex-col  justify-center border border-slate-200 p-6 rounded-lg flex-1 min-w-[266px] max-w-[276px] ">
      <div className=" relative mx-auto w-fit">
        <Image
          src={candidate.avatar}
          className="rounded-full"
          alt={candidate.name}
          width={80}
          height={80}
        />
        <div className="absolute bottom-0 right-0 bg-slate-50 rounded-full p-1 border border-slate-200">
          {candidate.rating >= 8 && <FiSmile size={32} color="#16A34A" />}
          {candidate.rating >= 5 && candidate.rating < 8 && (
            <FiMeh size={32} color="#CA8A04" />
          )}
          {candidate.rating >= 1 && candidate.rating < 5 && (
            <FiFrown size={32} color="#E11D48" />
          )}
        </div>
      </div>
      <h2 className="text-center text-xl mt-3 font-inter text-gray-600 font-medium">
        {candidate.name}
      </h2>
      <div className=" flex flex-col gap-2">
        <Link
          href={`/profile/${candidate.username}`}
          className="mt-2 hover:bg-slate-100 transition-all text-blue-900 font-poppins py-2 border rounded-lg flex items-center justify-center"
        >
          Ver Perfil
        </Link>
        <Button
          variants="secondary"
          loading={isSelectCandidateLoading}
          className=" hover:bg-green-100 text-green-600 py-2 border rounded-lg border-slate-200"
          onClick={handleSelectCandidate}
        >
          Selecionar candidato
        </Button>
      </div>
    </li>
  )
}
