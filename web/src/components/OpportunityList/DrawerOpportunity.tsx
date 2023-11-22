'use client'
import { Drawer } from '../Drawer'
import Link from 'next/link'

import { FiCheck, FiX } from 'react-icons/fi'
import { Candidate } from '@/services/api/repositories/opportunity'
import { Skeleton } from '../skeleton'
import { Button } from '../Button'
import Image from 'next/image'

type DrawerOpportunity = {
  isOpen: boolean
  isEmpty: boolean
  candidates: Candidate[]
  isLoading: boolean
  onClose: () => void
  onSelectCandidate: (data: { username: string; opportunityId: string }) => void
  isSelectCandidateLoading: boolean
}

export function DrawerOpportunity({
  isOpen,
  onClose,
  candidates,
  isLoading,
  isSelectCandidateLoading,
  onSelectCandidate,
  isEmpty,
}: DrawerOpportunity) {
  return (
    <Drawer.Provider isOpen={isOpen} onClose={onClose}>
      <Drawer.Overlay>
        <Drawer.Container>
          <div className="flex justify-between items-center">
            <h3 className="font-inter font-bold text-xl">
              Lista de candidatos
            </h3>

            <button
              onClick={onClose}
              className="border-x text-slate-400 border-y border-slate-200 p-1 rounded-lg transition-all bg-slate-50  hover:scale-105 hover:text-red-700"
            >
              <FiX size={20} />
            </button>
          </div>
          {!isLoading && isEmpty && (
            <p className="mt-4 text-slate-400">
              Nenhum candidato se candidatou para a vaga
            </p>
          )}

          <ul className="mt-4 [&>*:not(:first-child)]:mt-4">
            {isLoading && <Skeleton className="h-8" />}
            {!isLoading &&
              candidates.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 justify-between items-center"
                >
                  <Image
                    className="rounded-full"
                    src={item.candidateImgURL}
                    alt={item.candidateName}
                    width={48}
                    height={48}
                  />
                  <div className="w-full">
                    <h4 className="font-poppins font-semibold">
                      {item.candidateName}
                    </h4>
                    <Link
                      className="text-blue-700 text-sm"
                      href={`/profile/${item.candidateUsername}`}
                    >
                      ver perfil
                    </Link>
                  </div>

                  <div>
                    <Button
                      loading={isSelectCandidateLoading}
                      variants="secondary"
                      onClick={() =>
                        onSelectCandidate({
                          username: item.candidateUsername,
                          opportunityId: item.opportunityId,
                        })
                      }
                      className="hover:scale-105 hover:bg-green-100 hover:border-green-200  p-2 border text-green-700"
                    >
                      <FiCheck size={24} />
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </Drawer.Container>
      </Drawer.Overlay>
    </Drawer.Provider>
  )
}
