import { FiBriefcase, FiSmile, FiMeh, FiFrown } from 'react-icons/fi'

export default function History() {
  return (
    <main className="  max-w-4xl mx-auto  pt-14  px-6 pb-11 ">
      <section className="flex justify-between">
        <div className="py-5 px-4 pr-6 border-2 border-slate-200 rounded-lg">
          <FiBriefcase size={32} color="#1D4ED8" />
          <div className="flex mt-4 items-center gap-4  ">
            <span className="max-w-100 font-poppins text-slate-400 block">
              Total de atividades{' '}
            </span>
            <strong className="text-xl font-poppins font-semibold text-slate-900">
              20
            </strong>
          </div>
        </div>

        <div className="py-5 px-4 pr-6 border-2 border-slate-200 rounded-lg">
          <FiSmile size={32} color="#16A34A" />
          <div className="flex mt-4 items-center gap-4  ">
            <span className="max-w-100 font-poppins text-slate-400 block">
              Avaliações positivas{' '}
            </span>
            <strong className="text-xl font-poppins font-semibold text-slate-900">
              20
            </strong>
          </div>
        </div>

        <div className="py-5 px-4 pr-6 border-2 border-slate-200 rounded-lg">
          <FiMeh size={32} color="#CA8A04" />
          <div className="flex mt-4 items-center gap-4 ">
            <span className="max-w-100 font-poppins text-slate-400 block">
              Avaliações neutras{' '}
            </span>
            <strong className="text-xl font-poppins font-semibold text-slate-900">
              20
            </strong>
          </div>
        </div>

        <div className="py-5 px-4 pr-6 border-2 border-slate-200 rounded-lg">
          <FiFrown size={32} color="#E11D48" />
          <div className="flex mt-4 items-center gap-4 ">
            <span className="max-w-100 font-poppins text-slate-400 block">
              Avaliações negativas{' '}
            </span>
            <strong className="text-xl font-poppins font-semibold text-slate-900">
              20
            </strong>
          </div>
        </div>
      </section>
      <div className="">
        <h1 className="text-6xl">Aqui vem a tabela , vai tomar no cu </h1>
      </div>
    </main>
  )
}
