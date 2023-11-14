'use client'
import Link from 'next/link'
import { OpportunityList } from '@/components/OpportunityList'
import { useOpportunity } from './useOpportunity'
import { ModalOpportunity } from '@/components/OpportunityList/ModalOpportunity'
import { DrawerOpportunity } from '@/components/OpportunityList/DrawerOpportunity'

export default function Opportunities() {
  const {
    closeDrawer,
    closeModal,
    handleAnimationEndClose,
    handleDeleteOpportunity,
    handleOpenDrawer,
    handleOpenModal,
    isDrawerOpen,
    isModalLeave,
    isModalOpen,
    modalContent,
    opportunities,
    isOpportunityLoading,
    isMounted,
    isLoadingDelete,
    isEmpty,
    isCandidatesLoading,
    candidates,
    handleSelectCandidate,
    isSelectCandidateLoading,
    isCandidateListEmpty,
  } = useOpportunity()

  return (
    <div className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
            Minhas oportunidades
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            confira todas suas oportunidades quem ainda estão em aberto
          </p>
        </div>

        <Link
          href="/dashboard/opportunities/create"
          className=" max-w-304 px-8 py-2 bg-blue-700 text-slate-50 font-poppins font-medium rounded-lg transition-colors hover:bg-blue-600"
        >
          Criar oportunidade
        </Link>
      </section>

      <div className="mt-6">
        <OpportunityList
          onOpenDrawer={handleOpenDrawer}
          onOpenModal={handleOpenModal}
          opportunities={opportunities}
          isLoading={isOpportunityLoading}
          isEmpty={isEmpty}
        />
      </div>

      <ModalOpportunity
        isMounted={isMounted}
        isDeleteLoading={isLoadingDelete}
        isLeave={isModalLeave}
        isOpen={isModalOpen}
        body={modalContent}
        onAnimationEndClose={handleAnimationEndClose}
        onClose={closeModal}
        onDeleteOpportunity={handleDeleteOpportunity}
      />

      <DrawerOpportunity
        isEmpty={isCandidateListEmpty}
        onSelectCandidate={handleSelectCandidate}
        isSelectCandidateLoading={isSelectCandidateLoading}
        candidates={candidates}
        isLoading={isCandidatesLoading}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </div>
  )
}
