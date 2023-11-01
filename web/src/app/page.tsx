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
      <header className="border-b fixed w-full bg-slate-50 border-slate-200 py-4 shadow-sm">
        <div className="max-w-screen-xl m-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-lato font-extrabold text-blue-700"
          >
            iBico
          </Link>

          <nav>
            <ul className="flex gap-8">
              <li>
                <Link
                  className="text-slate-400 font-poppins transcition hover:text-blue-700"
                  href="/"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 font-poppins transcition hover:text-blue-700"
                  href="/opportunities"
                >
                  Oportunidades
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 font-poppins transcition hover:text-blue-700"
                  href="#about"
                >
                  sobre
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 font-poppins transcition hover:text-blue-700"
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

      <main className="pt-20  h-screen bg-hero bg-no-repeat bg-cover ">
        <div className="max-w-screen-xl flex h-full justify-center flex-col  m-auto">
          <h1 className="text-6xl font-lato font-extrabold max-w-xl  text-slate-50">
            Explore as melhores oportunidades de emprego
          </h1>
          <p className="text-slate-200 font-poppins max-w-448  mt-3 mb-6">
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
      </main>

      <section className="bg-slate-100 py-20">
        <div className="max-w-screen-xl m-auto flex items-center justify-between">
          <div>
            <h4 className="text-8xl font-lato font-extrabold text-slate-900">
              5.000<span className="text-blue-700">+</span>
            </h4>
            <p className="text-slate-500 max-w-304">
              oportunidades cadastrado em nossa plataforma{' '}
            </p>
          </div>

          <div>
            <h4 className="text-8xl font-lato font-extrabold text-slate-900">
              10k<span className="text-blue-700">+</span>
            </h4>
            <p className="text-slate-500 max-w-304">
              usuários registrado na nossa plataforma{' '}
            </p>
          </div>

          <div>
            <h4 className="text-8xl font-lato font-extrabold text-slate-900">
              50<span className="text-blue-700">%</span>
            </h4>
            <p className="text-slate-500 max-w-304">
              oportunidades cadastrado em nossa plataforma{' '}
            </p>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-24 max-w-screen-xl m-auto   ">
        <span className="font-poppins font-bold text-sm text-slate-400">
          vantagens
        </span>
        <h2 className="font-lato font-extrabold text-blue-900  mt-3 text-4xl max-w-lg ">
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
              + Objetivo
            </h3>
            <p className="text-slate-400 text-sm ">
              Encontre empregos que atendam aos seus objetivos de carreira e
              estilo de vida.
            </p>
          </div>
          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiCompass size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              + Velocidade
            </h3>
            <p className="text-slate-400 text-sm ">
              Inicie sua próxima oportunidade de trabalho em tempo recorde,
              graças à nossa busca eficiente.
            </p>
          </div>

          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiSearch size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              + Procura
            </h3>
            <p className="text-slate-400 text-sm ">
              Simplificamos a busca de empregos temporários, permitindo que você
              encontre oportunidades sob medida.
            </p>
          </div>

          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiClock size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              + Tempo
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
            <span className="font-poppins font-bold text-sm text-slate-400">
              facilidade & agilidade
            </span>
            <div className="flex justify-between items-center">
              <h2 className="font-lato font-extrabold text-blue-900  text-4xl max-w-lg ">
                Veja como é simples e fácil cadastrar uma oportunidade na
                plataforma
              </h2>
              <p className="max-w-md font-poppins text-slate-400 mt-4">
                Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
          </header>

          <main className="flex  justify-between gap-8 mt-10">
            <div className=" flex-1 rounded-lg ">
              <video src="/video/steap-1.webm" muted autoPlay loop></video>
            </div>
            <div className="p-10 bg-slate-50 border flex-1 border-slate-200 rounded-lg ">
              <header className="border-b border-slate-200 pb-6 ">
                <span className="font-lato font-bold text-3xl text-slate-400">
                  01
                </span>
                <h3 className="font-lato font-bold text-2xl text-slate-900 mt-6 mb-3">
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
          </main>

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
                  + Objetivo
                </h3>
                <p className="text-slate-400 text-sm ">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </section>

      <section id="about" className="max-w-screen-xl m-auto py-20 ">
        <div className="flex justify-between item">
          <div>
            <span className="font-poppins font-bold text-sm text-slate-400">
              pra quem é
            </span>
            <h2 className="font-lato font-extrabold text-blue-900  mt-3 text-4xl max-w-304 ">
              Por que decidimos criar o iBico ?
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

              <p className="font-poppins text-slate-400 mt-4 ">
                Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
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

      <footer className="max-w-screen-xl m-auto py-20 ">
        <div className=" flex justify-between items-center border-b border-slate-200 pb-6">
          <span className="text-3xl font-lato font-extrabold text-blue-700">
            iBico
          </span>

          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  href=""
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <FiFacebook size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <FiTwitter size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="p-2 border border-l-slate-200 block rounded-lg text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <FiLinkedin size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href=""
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
