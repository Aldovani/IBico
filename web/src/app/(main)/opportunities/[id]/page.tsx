import { Button } from '@/components/Button'
import Link from 'next/link'
import {
  FiArrowLeft,
  FiClock,
  FiDollarSign,
  FiShare2,
  FiSlash,
  FiCalendar,
  FiMapPin,
} from 'react-icons/fi'

export default function OpportunityDetails() {
  return (
    <div className=" max-w-screen-xl mx-auto pt-28 px-6 pb-24 grid grid-cols-opportunity-details items-start justify-between max-lg:grid-cols-1">
      <div>
        <section className="flex items-center justify-between ">
          <div className="flex-1">
            <span className="flex items-center text-slate-500 gap-1 font-poppins font-medium">
              {<FiArrowLeft size={20} />} Voltar
            </span>
            <h1 className="font-lato text-4xl font-bold text-slate-900 mt-4 mb-2">
              Faxineiro
            </h1>
            <span className="font-poppins text-sm text-slate-400 ">
              postado 4 de setembro de 2023
            </span>
            <div className="flex items-center gap-6 mt-4">
              <span className="flex items-center text-blue-700 gap-2">
                compartilhar
                <FiShare2 />
              </span>
              <span className="flex items-center whitespace-nowrap text-slate-400 gap-2">
                Reportar vaga
                <FiSlash />
              </span>
            </div>
          </div>

          <div className="w-48 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:bg-slate-50  max-sm:w-full max-sm:px-6 max-sm:py-4 max-sm:border-t-2 border-slate-200 max-sm:shadow-2xl max-sm:shadow-slate-400">
            <Button className="flex-grow-1">Candidata-se</Button>
          </div>
        </section>

        <section className="flex justify-between gap-4 mt-6 max-md:flex-wrap">
          <div className=" flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiClock size={32} color="#1D4ED8" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Salario
            </span>
            <strong className="text-slate-900 font-poppins font-semibold">
              R$600,00
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiDollarSign size={32} color="#1D4ED8" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Carga horaria
            </span>
            <strong className="text-slate-900 font-poppins font-semibold">
              12 horas
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiCalendar size={32} color="#1D4ED8" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Data
            </span>
            <strong className="text-slate-900 font-poppins font-semibold">
              24/09/2023
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiMapPin size={32} color="#1D4ED8" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Local
            </span>
            <strong className="text-slate-900 font-poppins font-semibold">
              Rua luiz tira dentes
            </strong>
          </div>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-lato font-medium">
            Postado por
          </h3>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt="user picture"
              className="w-12 h-12 rounded-full"
            />
            <div className="mt-3">
              <h4 className="font-poppins text-slate-900 font-medium">
                Aldovani Henrique da costa
              </h4>
              <Link
                className="font-poppins text-blue-700 "
                href="/user/aldovani"
              >
                ver perfil
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-lato font-medium">
            Descrição
          </h3>
          <p className="font-poppins text-slate-400 mt-3">
            Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellu{' '}
          </p>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-lato font-medium">
            Competências
          </h3>
          <p className="font-poppins text-slate-400 mt-3">
            Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Horem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis. Horem ipsum dolor
            sit amet, consectetur adipiscing elit. Nunc vulputate libero et
            velit interdum, ac aliquet odio mattis. Horem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis.
          </p>
        </section>
      </div>

      <section className="max-w-xs max-lg:max-w-none  w-full max-md:mt-6">
        <h2 className="text-slate-700 text-2xl font-lato font-medium ">
          Vagas semelhantes
        </h2>

        <div className="flex flex-col max-lg:flex-wrap justify-between gap-4 mt-4 ">
          <article className="min-w-80 border-x border-y border-slate-200 rounded-lg px-4 py-6">
            <header>
              <h3 className="font-lato font-semibold text-xl">Faxineira</h3>
              <span className="font-poppins text-xs text-slate-500">
                por
                <Link href="user/id-muito-foda" className="text-blue-500">
                  {' '}
                  Luize Santos da silva{' '}
                </Link>
              </span>
            </header>
            <main className="mt-3">
              <p className="text-slate-400 text-xs font-poppins ">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>

              <div className="mt-4 flex items-center gap-5 ">
                <div className="flex items-center gap-1 ">
                  <FiClock size={16} color="#64748B" />
                  <span className="text-slate-400 font-poppins">12h</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiDollarSign size={16} color="#64748B" />
                  <span className="text-slate-400 font-poppins">R$150/h</span>
                </div>
              </div>
            </main>

            <footer className="mt-5">
              <Link
                href="opportunities/id-muito-foda/"
                className="text-blue-700 font-poppins"
              >
                Ver vaga
              </Link>
            </footer>
          </article>

          <article className="min-w-80 border-x border-y border-slate-200 rounded-lg  px-4 py-6">
            <header>
              <h3 className="font-lato font-semibold text-xl">Faxineira</h3>
              <span className="font-poppins text-xs text-slate-500">
                por
                <Link href="user/id-muito-foda" className="text-blue-500">
                  {' '}
                  Luize Santos da silva{' '}
                </Link>
              </span>
            </header>
            <main className="mt-3">
              <p className="text-slate-400 text-xs font-poppins ">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>

              <div className="mt-4 flex items-center gap-5 ">
                <div className="flex items-center gap-1 ">
                  <FiClock size={16} color="#64748B" />
                  <span className="text-slate-400 font-poppins">12h</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiDollarSign size={16} color="#64748B" />
                  <span className="text-slate-400 font-poppins">R$150/h</span>
                </div>
              </div>
            </main>

            <footer className="mt-5">
              <Link
                href="opportunities/id-muito-foda/"
                className="text-blue-700 font-poppins"
              >
                Ver vaga
              </Link>
            </footer>
          </article>

          <article className="min-w-80 border-x border-y border-slate-200 rounded-lg px-4 py-6">
            <header>
              <h3 className="font-lato font-semibold text-xl">Faxineira</h3>
              <span className="font-poppins text-xs text-slate-500">
                por
                <Link href="user/id-muito-foda" className="text-blue-500">
                  {' '}
                  Luize Santos da silva{' '}
                </Link>
              </span>
            </header>
            <main className="mt-3">
              <p className="text-slate-400 text-xs font-poppins ">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>

              <div className="mt-4 flex items-center gap-5 ">
                <div className="flex items-center gap-1 ">
                  <FiClock size={16} color="#64748B" />
                  <span className="text-slate-400 font-poppins">12h</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiDollarSign size={16} color="#64748B" />
                  <span className="text-slate-400 font-poppins">R$150/h</span>
                </div>
              </div>
            </main>

            <footer className="mt-5">
              <Link
                href="opportunities/id-muito-foda/"
                className="text-blue-700 font-poppins"
              >
                Ver vaga
              </Link>
            </footer>
          </article>

          <article className="min-w-80 border-x border-y border-slate-200 rounded-lg  px-4 py-6">
            <header>
              <h3 className="font-lato font-semibold text-xl">Faxineira</h3>
              <span className="font-poppins text-xs text-slate-500">
                por
                <Link href="user/id-muito-foda" className="text-blue-500">
                  {' '}
                  Luize Santos da silva{' '}
                </Link>
              </span>
            </header>
            <main className="mt-3">
              <p className="text-slate-400 text-xs font-poppins ">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>

              <div className="mt-4 flex items-center gap-5 ">
                <div className="flex items-center gap-1 ">
                  <FiClock size={16} color="#64748B" />
                  <span className="text-slate-400 font-poppins">12h</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiDollarSign size={16} color="#64748B" />
                  <span className="text-slate-400 font-poppins">R$150/h</span>
                </div>
              </div>
            </main>

            <footer className="mt-5">
              <Link
                href="opportunities/id-muito-foda/"
                className="text-blue-700 font-poppins"
              >
                Ver vaga
              </Link>
            </footer>
          </article>
        </div>
      </section>
    </div>
  )
}
