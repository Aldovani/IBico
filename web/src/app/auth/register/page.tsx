'use client'

import Link from 'next/link'
import { Input } from '@components/Input'
import { useRegister } from './useRegister'
import { Button } from '@/components/Button'

export default function Register() {
  const {
    errors,
    register,
    handleSubmit,
    handleToggleIconConfirmPassword,
    handleToggleIconPassword,
    isShowConfirmPassword,
    isShowPassword,
    handleRegister,
    isLoading,
    handleChangeCPF,
    handleChangeCellphone,
  } = useRegister()

  return (
    <div className="pb-10 max-w-lg w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="font-lato text-slate-900 text-3xl font-semibold">
          Cadastra-se no iBico
        </h2>
        <p className="font-poppins text-slate-400  mt-2">
          Insira seu nome completo, CPF, telefone, senha e confirmar senha para
          ter acesso a inúmeras oportunidades
        </p>
      </header>
      <form
        className="flex flex-col mt-8"
        onSubmit={handleSubmit(
          async ({ cellphone, cpf, name, password, username }) => {
            handleRegister({ cellphone, cpf, name, password, username })
          },
        )}
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

        <Input.Label
          id="name"
          className="mt-4"
          name="Nome completo"
          error={!!errors.name?.message}
        >
          <Input.Field
            error={!!errors.name?.message}
            id="name"
            {...register('name')}
            placeholder="Digite seu nome completo"
          />
          <Input.MessageError message={errors.name?.message} />
        </Input.Label>

        <Input.Label
          id="username"
          className="mt-4"
          name="Nome de usuário"
          error={!!errors.username?.message}
        >
          <Input.Field
            error={!!errors.username?.message}
            id="username"
            {...register('username')}
            placeholder="Digite seu nome de usuário"
          />
          <Input.MessageError message={errors.username?.message} />
        </Input.Label>

        <Input.Label
          id="cellphone"
          className="mt-4"
          name="Telefone"
          error={!!errors.cellphone?.message}
        >
          <Input.Field
            error={!!errors.cellphone?.message}
            id="cellphone"
            {...register('cellphone', {
              onChange: (value) => {
                handleChangeCellphone(value.target.value)
              },
            })}
            placeholder="Digite seu numero de telefone"
            inputMode="tel"
            autoComplete="cc-number"
            minLength={14}
            maxLength={15}
          />
          <Input.MessageError message={errors.cellphone?.message} />
        </Input.Label>

        <Input.Label
          id="password"
          className="mt-4"
          name="Senha"
          error={!!errors.password?.message}
        >
          <Input.Field
            error={!!errors.password?.message}
            id="password"
            {...register('password')}
            placeholder="••••••••••••••••"
            className="pr-16"
            type={!isShowPassword ? 'password' : 'text'}
          >
            <Input.Icon
              onClick={handleToggleIconPassword}
              isPassword={isShowPassword}
              error={!errors.password}
            />
          </Input.Field>
          <Input.MessageError message={errors.password?.message} />
        </Input.Label>

        <Input.Label
          id="confirmPassword"
          className="mt-4"
          name="Confirmar senha"
          error={!!errors.confirmPassword?.message}
        >
          <Input.Field
            error={!!errors.confirmPassword?.message}
            id="confirmPassword"
            {...register('confirmPassword')}
            placeholder="••••••••••••••••"
            type={!isShowConfirmPassword ? 'password' : 'text'}
            className="pr-16"
          >
            <Input.Icon
              onClick={handleToggleIconConfirmPassword}
              isPassword={isShowConfirmPassword}
              error={!errors.confirmPassword}
            />
          </Input.Field>
          <Input.MessageError message={errors.confirmPassword?.message} />
        </Input.Label>

        <Button className="mt-5" type="submit" loading={isLoading}>
          Registra-se
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
