import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export default function Skills() {
  return (
    <main className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
            Configurar Competências
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="flex max-w-304 gap-4 w-full">
          <Button variants="secondary">Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-lato text-base text-slate-700 font-medium mb-1">
            Competências
          </h2>
          <p className="font-poppins text-slate-400 text-sm max-w-304">
            Insira sua Competências aqui, para adicionar basta apertar a tecla
            espaço
          </p>
        </div>

        <form className="grid grid-cols-2 gap-4 mt-6 items-center">
          <Input.Label id="skills" name="Competência">
            <Input.Field />
          </Input.Label>
        </form>
      </section>
    </main> 
  )
}
