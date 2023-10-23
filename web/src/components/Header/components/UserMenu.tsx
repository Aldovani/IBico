'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import {
  FiSettings,
  FiBell,
  FiBriefcase,
  FiFileText,
  FiLogOut,
  FiUser,
} from 'react-icons/fi'

export function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)

  function handleCloseMenu(e: any) {
    if (!menuRef.current?.contains(e.target) && e.target.id !== 'button-menu') {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseMenu)

    return () => document.removeEventListener('mousedown', handleCloseMenu)
  }, [])

  function handleClick() {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="relative flex ">
      <button onClick={handleClick}>
        <Image
          className="  rounded-full border-2 transition-colors hover:border-blue-700 "
          src="/img/avatar.png"
          alt=""
          width={42}
          height={42}
          id="button-menu"
        />
      </button>

      <ul
        onMouseLeave={() => {
          setIsMenuOpen(false)
        }}
        ref={menuRef}
        data-open={isMenuOpen}
        className=" border translate-y-2 shadow-modal top-full px-2 py-2 opacity-0 transition-all  pointer-events-none data-[open='true']:opacity-100 data-[open='true']:pointer-events-auto data-[open='true']:-translate-y-0 absolute bg-slate-50  flex flex-col gap-3 right-0  border-slate-200 rounded-lg"
      >
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg  font-medium px-4 py-1  text-slate-500 transition-colors  hover:bg-slate-100   hover:text-blue-700"
            href="/dashboard/user"
          >
            <FiUser size={16} />
            Perfil
          </Link>
        </li>
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg  font-medium px-4 py-1  text-slate-500 transition-colors  hover:bg-slate-100   hover:text-blue-700"
            href="/dashboard/user"
          >
            <FiSettings size={16} />
            Configuração
          </Link>
        </li>
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg font-medium px-4 py-1 text-slate-500 transition-colors   hover:bg-slate-100 hover:text-blue-700"
            href="/dashboard/notifications"
          >
            <FiBell size={16} />
            Notificações
          </Link>
        </li>
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg font-medium px-4 py-1 text-slate-500 transition-colors   hover:bg-slate-100 hover:text-blue-700"
            href="/dashboard/history"
          >
            <FiFileText size={16} />
            Histórico
          </Link>
        </li>
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg font-medium px-4 py-1 text-slate-500 transition-colors   hover:bg-slate-100 hover:text-blue-700"
            href="/dashboard/opportunities"
          >
            <FiBriefcase size={16} />
            oportunidades
          </Link>
        </li>

        <li>
          <button className="font-poppins w-full flex items-center gap-2 rounded-lg font-medium px-4 py-1 text-slate-500 transition-colors   hover:bg-slate-100 hover:text-blue-700">
            <FiLogOut size={16} />
            Sair
          </button>
        </li>
      </ul>
    </div>
  )
}
