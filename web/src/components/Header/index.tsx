import Link from 'next/link'
import { SearchInput } from './components/SearchInput'
import { UserMenu } from './components/UserMenu'
import { Notifications } from './components/Notification'
import { FiBriefcase } from 'react-icons/fi'

export function Header() {
  return (
    <header className="w-full border-b-2  border-slate-200 py-3 fixed bg-slate-50 top-0 left-0 z-30">
      <div className="mx-auto flex  px-6 items-center justify-between max-w-screen-xl">
        <Link
          href="/opportunities"
          className="text-blue-700 font-lato font-black text-4xl"
        >
          iBico
        </Link>

        <SearchInput />

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/opportunities/create"
            className=" border border-slate-200 rounded-lg p-2 flex item items-center gap-1  transition-colors hover:text-blue-700  "
            title="Publique sua oportunidade"
          >
            <FiBriefcase size={20} />
          </Link>

          <Notifications />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
