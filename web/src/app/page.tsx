import Link from 'next/link'
import {
  FiCrosshair,
  FiSearch,
  FiClock,
  FiCompass,
  FiCheck,
} from 'react-icons/fi'

export default function Home() {
  return (
    <>
      <header className="border-b border-slate-200 py-5">
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
            <Link href="auth/sign-in" className="font-poppins text-slate-700">
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

      <main className=" max-w-screen-xl flex items-center  m-auto h-hero">
        <div>
          <h1 className="text-6xl font-lato font-extrabold max-w-xl  text-blue-900">
            Explore as melhores oportunidades de emprego
          </h1>
          <p className="text-slate-400 font-poppins max-w-448  mt-3 mb-6">
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>

          <Link
            href="/opportunities"
            className="p-2 border w-60  border-slate-200 text-blue-700 h-10 px-4  flex items-center justify-center font-poppins font-medium rounded-lg"
          >
            Buscar oportunidades
          </Link>
        </div>
      </main>
      <div className="border-b border-slate-200 "></div>

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
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiCompass size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              + Objetivo
            </h3>
            <p className="text-slate-400 text-sm ">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiSearch size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              + Objetivo
            </h3>
            <p className="text-slate-400 text-sm ">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="px-4 py-6 max-w-304 border border-slate-200 rounded-lg">
            <FiClock size={32} className="text-blue-700" />
            <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-5 mb-3">
              + Objetivo
            </h3>
            <p className="text-slate-400 text-sm ">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
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
                  + Objetivo
                </h3>
                <p className="text-slate-400 text-sm ">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>

              <div className="px-4 bg-slate-50 py-6 max-w-304 border border-slate-200 rounded-lg">
                <span className="text-2xl font-poppins text-slate-400">02</span>
                <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-2 mb-3">
                  + Objetivo
                </h3>
                <p className="text-slate-400 text-sm ">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>

              <div className="px-4 bg-slate-50 py-6 max-w-304 border border-slate-200 rounded-lg">
                <span className="text-2xl font-poppins text-slate-400">03</span>
                <h3 className="font-poppins text-slate-900 font-semibold text-xl mt-2 mb-3">
                  + Objetivo
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

      <section className="max-w-screen-xl m-auto py-20 ">
        <span className="font-poppins font-bold text-sm text-slate-400">
          pra quem é
        </span>
        <h2 className="font-lato font-extrabold text-blue-900  mt-3 text-4xl max-w-304 ">
          Por que decidimos criar o iBico ?
        </h2>
        <p className="max-w-md font-poppins text-slate-400 mt-5 ">
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <p className="max-w-md font-poppins text-slate-400 mt-4 ">
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
      </section>
    </>
  )
}
