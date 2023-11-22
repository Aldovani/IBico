import { Checkbox } from '@/components/Checkbox'

export default function Notification() {
  return (
    <main className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-inter text-xl text-slate-900 font-bold mb-2">
            Configurar notificações
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>

      <section className=" mt-8   border-b-2 border-slate-200 pb-6 flex justify-between max-sm:flex-col max-sm:gap-6">
        <div>
          <h2 className="font-inter text-base text-slate-700 font-medium mb-1">
            Notificações por e-mail
          </h2>
          <p className="font-poppins text-slate-400 text-sm max-w-304">
            Insira sua Competências aqui, para adicionar basta apertar a tecla
            espaço
          </p>
        </div>

        <div className=" flex flex-col gap-6">
          <Checkbox
            id="email-opportunities"
            title="Novas oportunidades"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Checkbox
            id="email-employs"
            title="Novos candidatos "
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Checkbox
            id="email-reviews"
            title="Avaliações"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Checkbox
            id="email-services"
            title="Solicitando serviço"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
      </section>

      <section className=" mt-8   border-b-2 border-slate-200 pb-6 flex justify-between max-sm:flex-col max-sm:gap-6 ">
        <div>
          <h2 className="font-inter text-base text-slate-700 font-medium mb-1">
            Notificações por SMS
          </h2>
          <p className="font-poppins text-slate-400 text-sm max-w-304">
            Insira sua Competências aqui, para adicionar basta apertar a tecla
            espaço
          </p>
        </div>

        <div className=" flex flex-col gap-6">
          <Checkbox
            id="sms-opportunities"
            title="Novas oportunidades"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Checkbox
            id="sms-employs"
            title="Novos candidatos "
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Checkbox
            id="sms-reviews"
            title="Avaliações"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Checkbox
            id="sms-services"
            title="Solicitando serviço"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
      </section>
    </main>
  )
}
