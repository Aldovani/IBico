'use client'
import Image from 'next/image'
import { Drawer } from '../Drawer'
import Link from 'next/link'

import { FiCheck } from 'react-icons/fi'

type DrawerOpportunity = {
  isOpen: boolean
  onClose: () => void
}

export function DrawerOpportunity({ isOpen, onClose }: DrawerOpportunity) {
  return (
    <Drawer.Provider isOpen={isOpen} onClose={onClose}>
      <Drawer.Overlay>
        <Drawer.Container>
          <div className="flex justify-between items-center">
            <h3 className="font-lato font-bold text-xl">Lista de candidatos</h3>
            <span className="text-slate-500">00</span>
          </div>

          <ul className="mt-4">
            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <Image
                className="rounded-full"
                src="/img/avatar.png"
                alt="test"
                width={40}
                height={40}
              />
              <div>
                <h4>Aldovani henrique da costa</h4>
                <Link className="text-blue-700 text-sm" href={`/profile`}>
                  ver perfil
                </Link>
              </div>

              <div>
                <button className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg">
                  <FiCheck size={24} />
                </button>
              </div>
            </li>
          </ul>
        </Drawer.Container>
      </Drawer.Overlay>
    </Drawer.Provider>
  )
}
