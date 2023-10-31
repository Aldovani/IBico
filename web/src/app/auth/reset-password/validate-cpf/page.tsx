'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import Link from 'next/link'
import { useValidateCPF } from './useValidateCPF'

export default function ValidateCPF() {
  const { errors, handleSubmit, isLoading, mutate, register, handleChangeCPF } =
    useValidateCPF()

  return (
    <div className="max-w-lg  pb-10 w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="text-slate-900 text-3xl font-lato font-semibold">
          Validar CPF
        </h2>
        <p className="text-slate-400  mt-2 font-poppins">
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet{' '}
        </p>
      </header>

      <form
        className="flex flex-col mt-8"
        onSubmit={() => handleSubmit(({ cpf }) => mutate(cpf))}
      >
        <Input.Label id="cpf" name="CPF" error={!!errors.cpf?.message}>
          <Input.Field
            error={!!errors.cpf?.message}
            id="cpf"
            {...register('cpf', {
              onChange: (value) => {
                handleChangeCPF(value.target.value)
              },
            })}
            placeholder="000.000.000-00"
            maxLength={14}
            inputMode="numeric"
            autoComplete="cc-number"
          />
          <Input.MessageError message={errors.cpf?.message} />
        </Input.Label>
        <Button className="mt-5" loading={isLoading}>
          validar número
        </Button>
        <span className="font-poppins text-slate-400 mt-4">
          Possui uma conta?
          <Link href="/auth/sign-in" className="text-blue-700 font-semibold">
            {' '}
            Entrar
          </Link>
        </span>
      </form>
    </div>
  )
}
