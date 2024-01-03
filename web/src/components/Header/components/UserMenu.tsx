'use client'

import { useAuth } from '@/hooks/useAuth'
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
  const { handleSignOut, user } = useAuth()
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

  if (!user) {
    return
  }

  return (
    <div className="relative flex ">
      <button
        className="w-[42px] h-[42px] flex items-center justify-center rounded-xl border transition-colors hover:border-blue-900 "
        onClick={handleClick}
      >
        <FiUser size={24} className="text-blue-900" />
      </button>

      <ul
        onMouseLeave={() => {
          setIsMenuOpen(false)
        }}
        ref={menuRef}
        data-open={isMenuOpen}
        className="z-[999] border translate-y-2 shadow-modal top-full px-2 py-2 opacity-0 transition-all  pointer-events-none data-[open='true']:opacity-100 data-[open='true']:pointer-events-auto data-[open='true']:-translate-y-0 absolute bg-slate-50  flex flex-col gap-3 right-0  border-slate-200 rounded-lg"
      >
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg  font-medium px-4 py-1  text-slate-500 transition-colors  hover:bg-slate-100   hover:text-blue-900"
            href={`/profile/${user.username}`}
          >
            <FiUser size={16} />
            Perfil
          </Link>
        </li>
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg  font-medium px-4 py-1  text-slate-500 transition-colors  hover:bg-slate-100   hover:text-blue-900"
            href="/dashboard/user"
          >
            <FiSettings size={16} />
            Configuração
          </Link>
        </li>
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg font-medium px-4 py-1 text-slate-500 transition-colors   hover:bg-slate-100 hover:text-blue-900"
            href="/dashboard/notifications"
          >
            <FiBell size={16} />
            Notificações
          </Link>
        </li>
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg font-medium px-4 py-1 text-slate-500 transition-colors   hover:bg-slate-100 hover:text-blue-900"
            href="/dashboard/history"
          >
            <FiFileText size={16} />
            Histórico
          </Link>
        </li>
        <li>
          <Link
            className="font-poppins flex items-center gap-2 rounded-lg font-medium px-4 py-1 text-slate-500 transition-colors   hover:bg-slate-100 hover:text-blue-900"
            href="/dashboard/opportunities"
          >
            <FiBriefcase size={16} />
            oportunidades
          </Link>
        </li>

        <li>
          <button
            onClick={handleSignOut}
            className="font-poppins w-full flex items-center gap-2 rounded-lg font-medium px-4 py-1 text-slate-500 transition-colors   hover:bg-slate-100 hover:text-blue-900"
          >
            <FiLogOut size={16} />
            Sair
          </button>
        </li>
      </ul>
    </div>
  )
}
