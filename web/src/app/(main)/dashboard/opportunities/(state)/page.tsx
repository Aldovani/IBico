'use client'
import Link from 'next/link'
import { OpportunityList } from '@/components/OpportunityList'
import { useOpportunity } from './useOpportunity'
import { ModalOpportunity } from '@/components/OpportunityList/ModalOpportunity'
import { Pagination } from '@/components/Pagination'

export default function Opportunities() {
  const {
    closeModal,
    handleAnimationEndClose,
    handleDeleteOpportunity,
    handleOpenModal,
    isModalLeave,
    isModalOpen,
    modalContent,
    opportunities,
    isOpportunityLoading,
    isMounted,
    isLoadingDelete,
    isEmpty,
    currentPage,
    handleChangePage,
    totalElements,
    totalPages,
    isFinished,
    handleChangeStatusOpportunity,
    filter,
  } = useOpportunity()

  return (
    <div className="flex-1">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-inter text-xl text-blue-900 font-medium mb-2">
            Minhas oportunidades
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            confira todas suas oportunidades que voce já postou na plataforma
          </p>
        </div>

        <Link
          href="/dashboard/opportunities/create"
          className=" max-w-304 px-8 py-2 bg-blue-900 text-slate-50 font-poppins font-medium rounded-lg transition-colors hover:bg-blue-900/90"
        >
          Criar oportunidade
        </Link>
      </section>

      <div className="mt-6">
        <OpportunityList
          onOpenModal={handleOpenModal}
          opportunities={opportunities}
          isLoading={isOpportunityLoading}
          isEmpty={isEmpty}
          filter={filter}
        />
        {!isOpportunityLoading && !isEmpty && (
          <Pagination
            pageSize={10}
            currentPage={currentPage}
            onChangePage={handleChangePage}
            totalElements={totalElements}
            totalPages={totalPages}
          />
        )}
      </div>

      <ModalOpportunity
        type={filter}
        isMounted={isMounted}
        isDeleteLoading={isLoadingDelete}
        isLeave={isModalLeave}
        isOpen={isModalOpen}
        body={modalContent}
        onAnimationEndClose={handleAnimationEndClose}
        onClose={closeModal}
        isFinishedLoading={isFinished}
        onFinishedOpportunity={handleChangeStatusOpportunity}
        onDeleteOpportunity={handleDeleteOpportunity}
      />
    </div>
  )
}
