import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export default function ChangePassword() {
  return (
    <div className="flex flex-col max-w-lg  pb-10 w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="text-slate-900 text-3xl font-lato font-semibold">
          Redefina sua senha
        </h2>
        <p className="text-slate-400  mt-2 font-poppins">
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet{' '}
        </p>
      </header>

      <form className="flex flex-col mt-8">
        <Input.Label id="password" name="Nova senha">
          <Input.Field />
        </Input.Label>
        <Input.Label id="confirmPassword" name="Confirmar senha">
          <Input.Field />
        </Input.Label>
        <Button className="mt-5">validar número</Button>
      </form>
    </div>
  )
}
