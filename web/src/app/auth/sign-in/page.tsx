'use client'
import Link from 'next/link'
import { useSignIn } from './useSignIn'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

export default function SignIn() {
  const {
    handleSubmit,
    register,
    errors,
    handleTogglePassword,
    isShowPassword,
    handleChangeCPF,
    handleSignIn,
    isLoading,
  } = useSignIn()

  return (
    <div className=" max-w-lg  pb-10 w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="text-blue-900 text-3xl font-inter font-semibold">
          Bem vindo ao iBico
        </h2>
        <p className="text-slate-400  mt-2 font-poppins">
          Por favor, faça o login para acessar sua conta e encontrar
          oportunidades temporárias.
        </p>
      </header>

      <form
        className="flex flex-col mt-8 "
        onSubmit={handleSubmit(({ cpf, password }) =>
          handleSignIn({ cpf, password }),
        )}
      >
        <Input.Label error={!!errors.cpf} id="cpf" name="CPF">
          <Input.Field
            error={!!errors.cpf}
            id="cpf"
            placeholder="000.000.000-00"
            autoComplete="cc-number"
            inputMode="numeric"
            type="text"
            maxLength={14}
            {...register('cpf', {
              onChange: (value) => {
                handleChangeCPF(value.target.value)
              },
            })}
          />
          <Input.MessageError message={errors.cpf?.message} />
        </Input.Label>

        <Input.Label
          error={!!errors.password}
          id="password"
          className="mt-4"
          name="Senha"
        >
          <Input.Field
            error={!!errors.password}
            id="password"
            type={isShowPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="••••••••••••••••"
            autoComplete="current-password"
          >
            <Input.Icon
              onClick={handleTogglePassword}
              isPassword={isShowPassword}
              error={!errors.password}
            />
          </Input.Field>
          <Input.MessageError message={errors.password?.message} />
        </Input.Label>

        <span className="text-slate-400 mt-2 font-poppins">
          Esqueceu a senha?{' '}
          <Link
            href="/auth/reset-password/validate-cpf"
            className="text-blue-900 font-semibold"
          >
            Redefinir senha
          </Link>
        </span>

        <Button loading={isLoading} disabled={isLoading} className="mt-5">
          Entrar
        </Button>
        <span className="text-slate-400 mt-2 font-poppins">
          Não possui uma conta?{' '}
          <Link href="/auth/register" className="text-blue-900 font-semibold">
            Registra-se
          </Link>
        </span>
      </form>
    </div>
  )
}
