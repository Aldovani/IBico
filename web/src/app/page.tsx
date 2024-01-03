'use client'
import Link from 'next/link'
import {
  FiCrosshair,
  FiSearch,
  FiClock,
  FiCompass,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
} from 'react-icons/fi'
import { AiOutlineApple } from 'react-icons/ai'
import { SlSocialGoogle } from 'react-icons/sl'
import anime from 'animejs'
import { useEffect } from 'react'
import { inView, motion } from 'framer-motion'
import { Reveal } from '@/components/Reveal'

export default function Home() {
  useEffect(() => {
    inView('.status', () => {
      anime({
        targets: ['.opportunities'],
        innerHTML: [1, 5000],
        round: 1,
        easing: 'cubicBezier(0.17,0.84,0.44,1)',
        delay: 400,
        duration: 1500,
      })
      anime({
        targets: ['.users'],
        innerHTML: [1, 10],
        round: 1,
        easing: 'cubicBezier(0.17,0.84,0.44,1)',
        delay: 400,
        duration: 1700,
      })
      anime({
        targets: ['.other'],
        innerHTML: [1, 50],
        round: 1,
        easing: 'cubicBezier(0.17,0.84,0.44,1)',
        delay: 400,
        duration: 2000,
      })
    })
  }, [])

  return (
    <>
      <Reveal to="bottom" duration={0.3}>
        <header className="header border-b fixed w-full bg-slate-50 border-slate-200 py-2 z-[999] ">
          <div className="navigation max-w-screen-xl m-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-3xl font-inter font-semibold text-blue-900"
            >
              iBico
            </Link>

            <div className="flex gap-5 items-center">
              <Link
                href="auth/sign-in"
                className="font-poppins font-semibold py-3 px-4 relative z-20  text-slate-700 transition-colors hover:after:scale-100 after:transition-transform after:rounded-lg after:block after:bg-slate-100 after:absolute after:w-full after:h-full after:inset-0 after:scale-0  after:-z-10 "
              >
                Entrar
              </Link>
              <Link
                href="auth/register"
                className="hover:bg-blue-900 hover:text-slate-50 duration-100 transition-all py-3 border  border-slate-200 text-blue-900 h-10 px-4  flex items-center justify-center font-poppins font-medium rounded-lg"
              >
                Cadastra-se
              </Link>
            </div>
          </div>
        </header>
      </Reveal>

      <Reveal delay={0.5}>
        <main className="relative     pt-20  h-screen ">
          <div className="absolute z-[-2] top-0 left-0 w-full h-full bg-[length:90px_90px] bg-hero-square"></div>
          <div className="absolute z-[-1] top-0 left-0 w-full h-full bg-hero-square-opacity"></div>

          <div className="hero-content  max-w-screen-xl mx-auto   w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-xl text-blue-900 font-poppins  font-semibold">
                Se junte a milhares de usuários
              </span>
              <h1 className="title text-[64px] leading-[115%] font-inter font-medium max-w-4xl text-center  text-blue-900">
                Explore as melhores oportunidades de emprego
              </h1>
              <p className="text-slate-500 font-poppins max-w-lg  text-center mt-3 mb-6">
                Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>

              <Link
                href="/opportunities"
                className="hover:bg-blue-900 hover:text-slate-50 duration-100 transition-all p-3 border w-60 bg-slate-50  border-slate-200 text-blue-900 h-10 px-4  flex items-center justify-center font-poppins font-medium rounded-lg"
              >
                Procurar oportunidades
              </Link>
            </div>
          </div>
        </main>
      </Reveal>

      <section className="bg-blue-900 py-11">
        <div className="max-w-screen-xl m-auto flex items-center justify-between">
          <Reveal delay={0.5}>
            <div className="max-w-[335px]">
              <h2 className="font-inter text-[32px] leading-[120%] font-medium text-slate-50 mb-3">
                Por que você deve confiar en nos
              </h2>
              <p className="font-poppins text-slate-200 ">
                Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit{' '}
              </p>
            </div>
          </Reveal>

          <div className="status flex items-center gap-8">
            <div>
              <h4 className=" text-[40px] font-inter leading-none font-extrabold text-slate-50 mb-2">
                <motion.span className="opportunities">5.000 </motion.span>+
              </h4>
              <p className="text-slate-200 max-w-[221px]">
                oportunidades cadastrado em nossa plataforma{' '}
              </p>
            </div>

            <div>
              <h4 className="text-[40px] leading-none font-inter font-extrabold text-slate-50 mb-2">
                <span className="users">10</span>k+
              </h4>
              <p className="text-slate-200 max-w-[221px]">
                usuários registrado na nossa plataforma{' '}
              </p>
            </div>

            <div>
              <h4 className="text-[40px] leading-none font-inter font-extrabold text-slate-50 mb-2">
                <span className="other">50</span>%
              </h4>
              <p className="text-slate-200 max-w-[221px]">
                oportunidades cadastrado em nossa plataforma{' '}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-24 max-w-screen-xl m-auto   ">
        <Reveal>
          <span className="font-poppins font-semibold text-sm text-blue-900">
            vantagens
          </span>
          <h2 className="font-inter leading-[120%] font-medium text-blue-900  mt-3 text-[2.5rem] max-w-[620px] ">
            Confira algumas da vantagens da nossa plataforma{' '}
          </h2>
          <p className="max-w-md font-poppins text-slate-400 mt-4">
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>
        </Reveal>

        <div className="benefits flex gap-6 mt-12">
          <Reveal delay={0.5}>
            <div className="card-benefit px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
              <FiCrosshair size={32} className="text-blue-900" />
              <h3 className="font-poppins text-blue-900 font-semibold text-xl mt-5 mb-3">
                Objetivo
              </h3>
              <p className="text-slate-400 text-sm ">
                Encontre empregos que atendam aos seus objetivos de carreira e
                estilo de vida.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="card-benefit px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
              <FiCompass size={32} className="text-blue-900" />
              <h3 className="font-poppins text-blue-900 font-semibold text-xl mt-5 mb-3">
                Velocidade
              </h3>
              <p className="text-slate-400 text-sm ">
                Inicie sua próxima oportunidade de trabalho em tempo recorde,
                graças à nossa busca eficiente.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="card-benefit px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
              <FiSearch size={32} className="text-blue-900" />
              <h3 className="font-poppins text-blue-900 font-semibold text-xl mt-5 mb-3">
                Procura
              </h3>
              <p className="text-slate-400 text-sm ">
                Simplificamos a busca de empregos temporários, permitindo que
                você encontre oportunidades sob medida.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="card-benefit px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
              <FiClock size={32} className="text-blue-900" />
              <h3 className="font-poppins text-blue-900 font-semibold text-xl mt-5 mb-3">
                Tempo
              </h3>
              <p className="text-slate-400 text-sm ">
                Economize tempo e aproveite a flexibilidade para trabalhar
                quando e onde você desejar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-100 pt-20 pb-20">
        <div className="max-w-screen-xl m-auto">
          <Reveal>
            <header>
              <span className="font-poppins font-semibold text-sm text-blue-900">
                facilidade & agilidade
              </span>
              <div className="flex justify-between items-center">
                <h2 className="mt-3 font-inter font-medium text-blue-900  text-4xl leading-[120%] max-w-[540px] ">
                  Veja como é simples e fácil cadastrar uma oportunidade na
                  plataforma
                </h2>
                <p className="max-w-md font-poppins text-slate-500 mt-4">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
            </header>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="flex   justify-between gap-8 mt-10  h-[445px]">
              <video
                className=" flex-1 rounded-lg"
                src="/video/steap-1.webm"
                muted
                autoPlay
                loop
              ></video>
              <div>
                <div
                  data-active="true"
                  className=" card-step [&:hover>*]:shadow-card [&:hover>*]:opacity-100 [&:hover>*:not(:hover)]:shadow-none [&:hover>*:not(:hover)]:opacity-50 flex flex-col  gap-6 overflow-y-scroll pb-4 max-h-[445px]"
                >
                  <div
                    data-active="true"
                    className="data-[active='true']:shadow-card data-[active='true']:opacity-100 transition-all bg-slate-50 border-slate-200  opacity-50 border rounded-lg flex items-start  py-6 px-8 gap-6"
                  >
                    <span className="font-inter font-bold text-3xl text-blue-900">
                      01
                    </span>
                    <div>
                      <h3 className="font-inter font-semibold text-xl text-slate-600">
                        Cria uma conta
                      </h3>
                      <p className="font-poppins text-slate-400">
                        Torem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac
                      </p>
                    </div>
                  </div>

                  <div
                    className="card-step data-[active='true']:shadow-card data-[active='true']:opacity-100
                  transition-all bg-slate-50 border-slate-200 opacity-50    border rounded-lg flex items-start  py-6 px-8 gap-6"
                  >
                    <span className="font-inter font-bold text-3xl text-blue-900">
                      02
                    </span>
                    <div>
                      <h3 className="font-inter font-semibold text-xl text-slate-600">
                        Entrar na plataforma
                      </h3>
                      <p className="font-poppins text-slate-400">
                        Torem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac
                      </p>
                    </div>
                  </div>

                  <div className=" card-step data-[active='true']:shadow-card data-[active='true']:opacity-100 transition-all bg-slate-50 border-slate-200 opacity-50   border rounded-lg flex items-start  py-6 px-8 gap-6">
                    <span className="font-inter font-bold text-3xl text-blue-900">
                      03
                    </span>
                    <div>
                      <h3 className="font-inter font-semibold text-xl text-slate-600">
                        Publicar oportunidade
                      </h3>
                      <p className="font-poppins text-slate-400">
                        Torem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac
                      </p>
                    </div>
                  </div>

                  <div className="card-step data-[active='true']:shadow-card data-[active='true']:opacity-100 transition-all bg-slate-50 border-slate-200 opacity-50     border rounded-lg flex items-start  py-6 px-8 gap-6">
                    <span className="font-inter font-bold text-3xl text-blue-900">
                      04
                    </span>
                    <div>
                      <h3 className="font-inter font-semibold text-xl text-slate-600">
                        Selecionar um candidato
                      </h3>
                      <p className="font-poppins text-slate-400">
                        Torem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="max-w-screen-xl m-auto pt-20 pb-28 ">
        <Reveal>
          <div className="flex  justify-between items-center">
            <div>
              <span className="font-poppins font-bold text-sm text-blue-900">
                pra quem é
              </span>
              <h2 className="font-inter font-medium text-blue-900 leading-[120%]  mt-3 text-[40px] max-w-sm ">
                Por que decidimos criar o{' '}
                <span className="font-bold">iBico</span> ?
              </h2>
              <div className="max-w-[520px]">
                <p className="font-poppins text-slate-400 mt-5 ">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
                <p className="font-poppins text-slate-400 mt-4 ">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Curabitur tempus urna at
                  turpis condimentum lobortis.
                </p>

                <p className="font-poppins text-slate-400 mt-4 ">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Curabitur tempus urna at
                  turpis condimentum lobortis.
                </p>
              </div>
            </div>

            <div className="grid  h-[480px] grid-cols-2 grid-rows-2  gap-x-4 gap-y-3 max-w-[582px]   w-full">
              <div className="rounded-xl col-start-1 max-w-[280px] bg-people-01 bg-no-repeat bg-cover col-end-2 row-start-1 row-end-2"></div>
              <div className="rounded-xl col-start-1 max-w-[280px] bg-people-02 col-end-2 row-start-2 row-end-3"></div>
              <div className="rounded-xl col-start-2 max-w-[280px] bg-people-03 col-end-3 row-start-1 row-end-3"></div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="app" className="bg-hero-square bg-[length:90px_90px] py-28">
        <Reveal>
          <div className="max-w-7xl  mx-auto h-full flex flex-col  justify-center items-center">
            <span className="font-poppins font-semibold text-sm text-blue-900">
              baixe nosso app
            </span>
            <h2 className="max-w-[580px] text-center font-inter font-medium leading-[120%] text-blue-900  text-[40px]">
              Tenha diversas oportunidades na palma da sua mão
            </h2>
            <p className="max-w-xl text-center font-poppins text-slate-500 mt-4">
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
              condimentum lobortis.
            </p>

            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="border py-3 gap-2  px-8 bg-slate-50 flex items-center border-slate-200 rounded-lg">
                <AiOutlineApple size={28} className="text-blue-900" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-poppins">
                    Download via
                  </span>
                  <span className="text-sm text-blue-900 font-poppins">
                    Apple Store
                  </span>
                </div>
              </div>
              <div className="border py-3 gap-2  px-8 bg-slate-50 flex items-center border-slate-200 rounded-lg">
                <SlSocialGoogle size={28} className="text-blue-900" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-poppins">
                    Download via
                  </span>
                  <span className="text-sm text-blue-900 font-poppins">
                    Apple Store
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="max-w-screen-xl m-auto  py-20 ">
        <div className=" flex justify-between items-center border-b border-slate-200 pb-6">
          <span className="text-3xl font-inter font-semibold text-blue-900">
            iBico
          </span>

          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  href="/"
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-900 transition-colors"
                >
                  <FiFacebook size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-900 transition-colors"
                >
                  <FiTwitter size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-900 transition-colors"
                >
                  <FiLinkedin size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-900 transition-colors"
                >
                  <FiInstagram size={20} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-between items-center pt-6">
          <p className="text-slate-400 font-poppins ">
            &copy; 2023 iBico. Todos os direitos reservados.
          </p>

          <div className="text-slate-400 font-poppins flex gap-4">
            <span>Politica de privacidade</span>
            <span>Termo e condições</span>
          </div>
        </div>
      </footer>
    </>
  )
}
