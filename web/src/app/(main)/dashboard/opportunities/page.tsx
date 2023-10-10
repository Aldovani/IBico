import { Button } from '@/components/Button'

export default function Opportunities() {
  return (
    <div className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
            Minhas oportunidades
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            confira todas suas oportunidades quem ainda estão em aberto
          </p>
        </div>

        <Button className=" max-w-304">Criar oportunidade</Button>
      </section>
    </div>
  )
}
