import Link from 'next/link'
import { OpportunityList } from '@/components/OpportunityList'
import { Suspense } from 'react'

export default async function Opportunities() {
  // const {
  //   handleAnimationEndClose,
  //   handleCloseModal,
  //   handleOpenModal,
  //   isLeave,
  //   isOpen,
  // } = useModal()

  // console.log({ items })
  // const { isOpen: isDrawerOpen, onClose, onOpen } = useDrawer()
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
        <Suspense fallback={<h1>Carregando...</h1>}>
          <OpportunityList />
        </Suspense>
      </div>
    </div>
  )
}
