import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Header } from '@components/Header'
import Link from 'next/link'

import {
  FiSearch,
  FiMapPin,
  FiFilter,
  FiClock,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'

export default function Opportunities() {
  return (
     <div className=" max-w-screen-xl mx-auto pt-28 px-6 pb-16">
      
      <section className="max-w-lg ">
        <h1 className="font-lato font-bold text-4xl text-blue-700 ">
          Encontre uma oportunidade em poucos minutos{' '}
        </h1>
        <p className="text-slate-400 font-poppins mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
      </section>

      <section className="mt-10 ">
        <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:gap-3">
          <div className="flex w-full gap-5  max-sm:flex-col">
            <Input.Label id="vaga" className="flex-1">
              <Input.Wrapper>
                <Input.Icon positions="left" icon={<FiSearch size="14" />} />
                <Input.Field className="pl-10" placeholder="Titulo da vaga" />
              </Input.Wrapper>
            </Input.Label>

            <Input.Label id="local" className="flex-1">
              <Input.Wrapper>
                <Input.Icon positions="left" icon={<FiMapPin size="14" />} />
                <Input.Field className="pl-10" placeholder="Localização" />
              </Input.Wrapper>
            </Input.Label>
          </div>

          <div className="flex gap-2 max-md:w-full max-md:flex-col ">
            <Button
              variants="secondary"
              className="w-32 flex gap-1 items-center max-md:w-full"
            >
              <FiFilter size="16" />
              Filtros
            </Button>
            <Button className="w-32 max-md:w-full">Buscar</Button>
          </div>
        </div>
      </section>

      <section className="mt-12 pb-16">
        <header className="flex items-center justify-between">
          <p className="text-slate-500 text-base font-poppins">
            <strong className="text-blue-700">08 </strong>
            Oportunidades encontradas
          </p>

          <p className="text-slate-500 text-base  font-poppins">
            ordenar por <strong className="text-blue-700 ">Alfabética</strong>
          </p>
        </header>

        <div className="grid grid-flow-row  grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 mt-5">
          <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
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

          <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
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

          <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
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

          <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
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

          <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
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

          <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
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

          <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
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

          <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
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

        <div className="flex justify-end items-center gap-2 mt-5">
          <div className="rounded-lg h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
            <FiChevronLeft size="16" color="#64748B" />
          </div>
          <div className="font-poppins text-sm text-blue-700 bg-blue-50 rounded-lg font-medium h-8 w-8 border-x border-y border-blue-500 flex items-center justify-center">
            1
          </div>
          <div className="font-poppins text-sm text-slate-500 rounded-lg font-medium h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
            2
          </div>
          <div className="font-poppins text-sm text-slate-500 rounded-lg font-medium h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
            3
          </div>
          <div className="rounded-lg h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
            <FiChevronRight size="16" color="#64748B" />
          </div>
        </div>
      </section>
    </div>
  )
}
