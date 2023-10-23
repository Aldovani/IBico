import Link from 'next/link'
import { FiBell, FiBriefcase, FiUser } from 'react-icons/fi'

export function Notifications() {
  return (
    <div className="relative group ">
      <Link
        href="/dashboard/notifications"
        className=" border block border-slate-200 rounded-lg p-2"
      >
        <FiBell size={18} />
      </Link>

      <div className="pt-4 absolute translate-y-2 right-0 opacity-0 transition-all pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 ">
        <div className="w-96  border rounded-lg border-slate-200 px-4 py-6 bg-slate-50">
          <div className="flex items-center justify-between border-b pb-4 border-slate-200">
            <h3 className="text-slate-900 text-lg font-bold font-lato">
              Suas notificações
            </h3>
            <Link
              href="/dashboard/notifications"
              className="text-blue-700 font-poppins font-medium"
            >
              ver todos
            </Link>
          </div>
          <ul>
            <li className=" flex items-center gap-3 mt-2">
              <div className="p-2 rounded-full bg-slate-200 text-slate-500 w-10 h-10">
                <FiBriefcase size={24} />
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-slate-500">
                  Uma nova oportunidade baseada nas suas competências foi
                  publicado na plataforma
                </strong>
                <span className="text-xs text-slate-400  font-poppins">
                  há 10 minutos atrás
                </span>
              </div>
            </li>
            <li className=" flex items-center gap-3 mt-4">
              <div className="p-2 rounded-full bg-slate-200 text-slate-500 w-10 h-10">
                <FiUser size={24} />
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-slate-500">
                  Uma nova oportunidade baseada nas suas competências foi
                  publicado na plataforma
                </strong>
                <span className="text-xs text-slate-400  font-poppins">
                  há 10 minutos atrás
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
