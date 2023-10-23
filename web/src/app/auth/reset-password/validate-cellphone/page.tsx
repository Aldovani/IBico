'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import Link from 'next/link'
import { useValidateCellphone } from './useValidateCellphone'

export default function ValidateCellphone() {
  const {
    errors,
    handleChangeCellphone,
    handleSubmit,
    isLoading,
    mutate,
    register,
  } = useValidateCellphone()

  return (
    <div className="max-w-lg  pb-10 w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="text-slate-900 text-3xl font-lato font-semibold">
          Validar telefone
        </h2>
        <p className="text-slate-400  mt-2 font-poppins">
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet{' '}
        </p>
      </header>

      <form
        className="flex flex-col mt-8"
        onSubmit={handleSubmit(({ cellphone }) => {
          mutate(cellphone)
        })}
      >
        <Input.Label
          id="cellphone"
          name="Telefone"
          error={!!errors.cellphone?.message}
        >
          <Input.Field
            {...register('cellphone', {
              onChange: (value) => {
                handleChangeCellphone(value.target.value)
              },
            })}
            id="cellphone"
            placeholder="(99) 99999-9999"
            maxLength={15}
            minLength={14}
            inputMode="tel"
            autoComplete="cc-number"
            error={!!errors.cellphone?.message}
          />
          {errors.cellphone?.message && (
            <Input.MessageError message={errors.cellphone.message} />
          )}
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
