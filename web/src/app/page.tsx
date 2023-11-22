import Link from 'next/link'
import {
  FiCrosshair,
  FiSearch,
  FiClock,
  FiCompass,
  FiCheck,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
} from 'react-icons/fi'

export default function Home() {
  return (
    <>
      <header className="border-b fixed w-full bg-slate-50 border-slate-200 py-4 ">
        <div className="max-w-screen-xl m-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-inter font-semibold text-blue-700"
          >
            iBico
          </Link>

          <nav>
            <ul className="flex gap-8">
              <li>
                <Link
                  className="text-slate-400 font-poppins transition hover:text-blue-700"
                  href="/"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 font-poppins transition hover:text-blue-700"
                  href="/opportunities"
                >
                  Oportunidades
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 font-poppins transition hover:text-blue-700"
                  href="#app"
                >
                  App
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-6 items-center">
            <Link
              href="auth/sign-in"
              className="font-poppins font-semibold py-2 px-4 relative z-20  text-slate-700 transition-colors hover:after:scale-100     hover:text-blue-700 after:transition-transform after:rounded-lg after:block after:bg-slate-100 after:absolute after:w-full after:h-full after:inset-0 after:scale-0  after:-z-10 "
            >
              Entrar
            </Link>
            <Link
              href="auth/register"
              className="p-2 border  border-slate-200 text-blue-700 h-10 px-4  flex items-center justify-center font-poppins font-medium rounded-lg"
            >
              Cadastra-se
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20  h-screen   max-w-screen-xl mx-auto ">
        <div className="w-full h-full flex justify-between items-center">
          <div>
            <h1 className="text-[64px] leading-[120%] font-inter font-medium max-w-2xl  text-blue-900">
              Explore as melhores oportunidades de emprego
            </h1>
            <p className="text-slate-500 font-poppins max-w-lg  mt-3 mb-6">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>

            <Link
              href="/opportunities"
              className="p-2 border w-60 bg-slate-50  border-slate-200 text-blue-700 h-10 px-4  flex items-center justify-center font-poppins font-medium rounded-lg"
            >
              Buscar oportunidades
            </Link>
          </div>
          <div className="grid gap-4 grid-cols-2 grid-rows-2 w-full h-full max-w-xl max-h-[490px]  ">
            <div className="rounded-tl-lg bg-hero-01 col-start-1 col-end-2 row-start-1 row-end-2"></div>
            <div className="rounded-bl-lg bg-hero-02 col-start-1 col-end-2 row-start-2 row-end-3"></div>
            <div className="rounded-r-lg bg-hero-03 col-start-2 col-end-3 row-start-1 row-end-3"></div>
          </div>
        </div>
      </main>

      <section className="bg-blue-700 py-28">
        <div className="max-w-screen-xl m-auto flex items-start justify-between">
          <div>
            <h4 className="text-8xl font-inter leading-none font-extrabold text-slate-50">
              5.000+
            </h4>
            <p className="text-slate-100 max-w-304">
              oportunidades cadastrado em nossa plataforma{' '}
            </p>
          </div>

          <div>
            <h4 className="text-8xl leading-none font-inter font-extrabold text-slate-50">
              10k+
            </h4>
            <p className="text-slate-100 max-w-304">
              usuários registrado na nossa plataforma{' '}
            </p>
          </div>

          <div>
            <h4 className="text-8xl leading-none font-inter font-extrabold text-slate-50">
              50%
            </h4>
            <p className="text-slate-100 max-w-304">
              oportunidades cadastrado em nossa plataforma{' '}
            </p>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-24 max-w-screen-xl m-auto   ">
        <span className="font-poppins font-semibold text-sm text-blue-700">
          vantagens
        </span>
        <h2 className="font-inter leading-[120%] font-medium text-blue-900  mt-3 text-[2.5rem] max-w-[620px] ">
          Confira algumas da vantagens da nossa plataforma{' '}
        </h2>
        <p className="max-w-md font-poppins text-slate-400 mt-4">
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>

        <div className="flex gap-6 mt-12">
          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiCrosshair size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              Objetivo
            </h3>
            <p className="text-slate-400 text-sm ">
              Encontre empregos que atendam aos seus objetivos de carreira e
              estilo de vida.
            </p>
          </div>
          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiCompass size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              Velocidade
            </h3>
            <p className="text-slate-400 text-sm ">
              Inicie sua próxima oportunidade de trabalho em tempo recorde,
              graças à nossa busca eficiente.
            </p>
          </div>

          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiSearch size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              Procura
            </h3>
            <p className="text-slate-400 text-sm ">
              Simplificamos a busca de empregos temporários, permitindo que você
              encontre oportunidades sob medida.
            </p>
          </div>

          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiClock size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              Tempo
            </h3>
            <p className="text-slate-400 text-sm ">
              Economize tempo e aproveite a flexibilidade para trabalhar quando
              e onde você desejar.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 pt-20 pb-20">
        <div className="max-w-screen-xl m-auto">
          <header>
            <span className="font-poppins font-semibold text-sm text-blue-700">
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

          <div className="flex  justify-between gap-8 mt-10">
            <div className=" flex-1 rounded-lg ">
              <video src="/video/steap-1.webm" muted autoPlay loop></video>
            </div>
            <div className="p-10 bg-slate-50 border flex-1 border-slate-200 rounded-lg ">
              <header className="border-b border-slate-200 pb-6 ">
                <span className="font-inter font-bold text-3xl text-slate-400">
                  01
                </span>
                <h3 className="font-inter font-bold text-2xl text-slate-900 mt-6 mb-3">
                  Cria uma conta
                </h3>
                <p className="font-poppins text-slate-400">
                  Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac
                </p>
              </header>
              <main className="mt-6">
                <ul>
                  <li className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg  text-blue-700">
                      <FiCheck size={20} />
                    </div>
                    <p className="text-slate-400 font-poppins">
                      <strong>Dorem ipsum dolor sit amet, consectetur</strong>{' '}
                      adipiscing elit. Nunc vulputate libero et velit interdum,
                      ac aliquet{' '}
                    </p>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg  text-blue-700">
                      <FiCheck size={20} />
                    </div>
                    <p className="text-slate-400 font-poppins">
                      <strong>Dorem ipsum dolor sit amet, consectetur</strong>{' '}
                      adipiscing elit. Nunc vulputate libero et velit interdum,
                      ac aliquet{' '}
                    </p>
                  </li>
                </ul>
              </main>
            </div>
          </div>

          <footer>
            <div className="flex gap-6 mt-12">
              <div className="px-4 bg-slate-50 py-6 max-w-304 border border-slate-200 rounded-lg">
                <span className="text-2xl font-poppins text-slate-400">01</span>
                <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-2 mb-3">
                  Cria uma conta
                </h3>
                <p className="text-slate-400 text-sm ">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>

              <div className="px-4 bg-slate-50 py-6 max-w-304 border border-slate-200 rounded-lg">
                <span className="text-2xl font-poppins text-slate-400">02</span>
                <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-2 mb-3">
                  Entrar na conta
                </h3>
                <p className="text-slate-400 text-sm ">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>

              <div className="px-4 bg-slate-50 py-6 max-w-304 border border-slate-200 rounded-lg">
                <span className="text-2xl font-poppins text-slate-400">03</span>
                <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-2 mb-3">
                  Publicar oportunidade
                </h3>
                <p className="text-slate-400 text-sm ">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>

              <div className="px-4 bg-slate-50 py-6 max-w-304 border border-slate-200 rounded-lg">
                <span className="text-2xl font-poppins text-slate-400">04</span>
                <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-2 mb-3">
                  Selecione o candidato
                </h3>
                <p className="text-slate-500 text-sm ">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </section>

      <section id="about" className="max-w-screen-xl m-auto pt-20 pb-28 ">
        <div className="flex  justify-between items-center">
          <div>
            <span className="font-poppins font-bold text-sm text-blue-700">
              pra quem é
            </span>
            <h2 className="font-inter font-medium text-blue-900 leading-[120%]  mt-3 text-[40px] max-w-sm ">
              Por que decidimos criar o <span className="font-bold">iBico</span>{' '}
              ?
            </h2>
            <div className="max-w-[520px]">
              <p className="font-poppins text-slate-400 mt-5 ">
                Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
              <p className="font-poppins text-slate-400 mt-4 ">
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                condimentum lobortis.
              </p>

              <p className="font-poppins text-slate-400 mt-4 ">
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                condimentum lobortis.
              </p>
            </div>
          </div>

          <div className="grid  h-[480px] grid-cols-2 grid-rows-2  gap-x-4 gap-y-3 max-w-[582px]   w-full">
            <div className="rounded-xl col-start-1 max-w-[280px] bg-people-01 bg-no-repeat bg-cover col-end-2 row-start-1 row-end-2"></div>
            <div className="rounded-xl col-start-1 max-w-[280px] bg-people-02 col-end-2 row-start-2 row-end-3"></div>
            <div className="rounded-xl col-start-2 max-w-[280px] bg-people-03 col-end-3 row-start-1 row-end-3"></div>
          </div>
        </div>
      </section>

      <section id="app" className="bg-slate-100 py-36 ">
        <div className="max-w-7xl  mx-auto h-full flex flex-col  justify-center ">
          <span className="font-poppins font-semibold text-sm text-blue-700">
            baixe nosso app
          </span>
          <h2 className="font-inter font-medium text-blue-900  text-[40px]">
            Por que decidimos criar o iBico ?
          </h2>
          <div>
            <p className="max-w-md font-poppins text-slate-500 mt-4">
              Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
            <p className="max-w-md font-poppins text-slate-500 mt-4">
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
              condimentum lobortis.
            </p>
          </div>
        </div>
      </section>

      <footer className="max-w-screen-xl m-auto  py-20 ">
        <div className=" flex justify-between items-center border-b border-slate-200 pb-6">
          <span className="text-3xl font-inter font-semibold text-blue-700">
            iBico
          </span>

          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  href="/"
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <FiFacebook size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <FiTwitter size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <FiLinkedin size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-700 transition-colors"
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
