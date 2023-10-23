import Link from 'next/link'
import { SearchInput } from './components/SearchInput'
import { UserMenu } from './components/UserMenu'
import { Notifications } from './components/Notification'
import { FiPlus } from 'react-icons/fi'

export function Header() {
  return (
    <header className="w-full border-b-2  border-slate-200 py-3 fixed bg-slate-50 top-0 left-0 z-30">
      <div className="mx-auto flex  px-6 items-center justify-between max-w-screen-xl">
        <Link
          href="/opportunities"
          className="text-blue-700 font-lato font-extrabold text-4xl"
        >
          iBico
        </Link>

        <SearchInput />

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/opportunities/create"
            className=" border block border-slate-200 rounded-lg p-2"
            title="Publique sua oportunidade"
          >
            <FiPlus size={18} />
          </Link>

          <Notifications />
          <UserMenu />
        </div>
        {/* <div className="flex gap-5 items-center ">
          <Link
            href="/auth/sign-in"
            className=" font-poppins font-medium text-slate-700 hover:text-blue-700 max-sm:hidden"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="border-x border-y h-10 flex items-center border-slate-300 font-poppins font-medium text-blue-700 py-3 px-7 rounded-lg hover:bg-slate-100 whitespace-nowrap"
          >
            Cadastra-se
          </Link>
        </div> */}
      </div>
    </header>
  )
}
