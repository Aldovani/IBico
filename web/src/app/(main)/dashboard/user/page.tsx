import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import Image from 'next/image'

export default function ConfigUser() {
  return (
    <main className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
            Configurar perfil
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
            Foto de perfil
          </h2>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="flex gap-4 mt-4 items-center">
          <Image
            src="/img/avatar.png"
            width={80}
            height={80}
            alt=""
            className="w-20 h-20 rounded-full"
          />

          <div>
            <p className="text-xs text-slate-400 font-poppins ">
              Suporte para PNGs, JPEGs e GIFS abaixo de 10mb
            </p>
            <div className="flex gap-4 mt-3">
              <Button variants="secondary">Enviar avatar</Button>
              <Button
                variants="secondary"
                className="text-red-700 hover:bg-red-50 hover:border-red-200"
              >
                Deletar Avatar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-lato text-base text-slate-700 font-medium mb-1">
            Dados pessoais{' '}
          </h2>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <form className="grid grid-cols-2 gap-4 mt-6 items-center">
          <Input.Label id="name" name="Nome">
            <Input.Field defaultValue="Aldovani Henrique da costa" />
          </Input.Label>
          <Input.Label id="cellphone" name="Telefone">
            <Input.Field defaultValue="(16) 99999-9999" />
          </Input.Label>
          <Input.Label id="cpf" name="CPF">
            <Input.Field defaultValue="000.000.000-00" />
          </Input.Label>
        </form>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-lato text-base text-slate-700 font-medium mb-1">
            Zona de perigo
          </h2>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className=" flex items-center max-w-304 gap-6 mt-6">
          <Button variants="secondary">Desativar</Button>
          <Button
            variants="secondary"
            className="border-red-700 text-red-700 hover:bg-red-50"
          >
            Deletar
          </Button>
        </div>
      </section>
    </main>
  )
}
