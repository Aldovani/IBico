import { NavigationAside } from '@/components/NavigationAside'

const links = [
  { href: '/dashboard/notifications', text: 'Todas' },
  {
    href: '/dashboard/notifications?filter=as',
    text: 'Candidaturas',
  },
  { href: '', text: 'Minhas oportunidades' },
]

export default function Notification() {
  return (
    <div className="flex gap-20  max-w-screen-xl  mx-auto pt-14  px-6 pb-11 max-sm:flex-col max-sm:gap-5">
      <NavigationAside links={links} />
      <div className="w-full">
        <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
          <div className="max-w-304">
            <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
              Minhas notificações
            </h1>
            <p className="font-poppins text-slate-400 text-sm">
              confira todas suas notificações que voce recebeu na plataforma
            </p>
          </div>
        </section>

        <div className="mt-6"></div>
      </div>
    </div>
  )
}
