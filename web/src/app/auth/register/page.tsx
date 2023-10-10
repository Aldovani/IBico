'use client'

import Link from 'next/link'
import { Input } from '@components/Input'
import { useRegister } from './useRegister'
import { Button } from '@/components/Button'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function Register() {
  const {
    errors,
    register,
    handleSubmit,
    handleToggleConfirmPassword,
    handleTogglePassword,
    isShowConfirmPassword,
    isShowPassword,
    handleRegister,
    isLoading,
    handleChangeCPF,
    handleChangeCellphone,
  } = useRegister()

  return (
    <div className="flex flex-col pb-10 max-w-lg w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="font-lato text-slate-900 text-3xl font-semibold">
          Cadastra-se no IBico
        </h2>
        <p className="font-poppins text-slate-400  mt-2">
          Insira seu nome completo, CPF, telefone, senha e confirmar senha para
          ter acesso a inúmeras oportunidades
        </p>
      </header>
      <form
        className="flex flex-col mt-8"
        onSubmit={handleSubmit(
          ({ cellphone, confirmPassword, cpf, name, password }) => {
            console.log(cellphone)
            handleRegister({ cellphone, confirmPassword, cpf, name, password })
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
            placeholder="Digite seu CPF"
            maxLength={14}
            inputMode="numeric"
            autoComplete="cc-number"
          />
          {errors.cpf?.message && (
            <Input.MessageError message={errors.cpf.message} />
          )}
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
          {errors.name?.message && (
            <Input.MessageError message={errors.name.message} />
          )}
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
          />
          {errors.cellphone?.message && (
            <Input.MessageError message={errors.cellphone.message} />
          )}
        </Input.Label>

        <Input.Label
          id="password"
          className="mt-4"
          name="Senha"
          error={!!errors.password?.message}
        >
          <Input.Wrapper>
            <Input.Field
              error={!!errors.password?.message}
              id="password"
              {...register('password')}
              placeholder="••••••••••••••••"
              className="pr-16"
              type={!isShowPassword ? 'password' : 'text'}
            />
            <Input.Icon
              onClick={handleTogglePassword}
              icon={
                !isShowPassword ? (
                  <FiEye size="24" color="#94A3B8" />
                ) : (
                  <FiEyeOff size="24" color="#94A3B8" />
                )
              }
            />
          </Input.Wrapper>
        </Input.Label>

        <Input.Label
          id="confirmPassword"
          className="mt-4"
          name="Confirmar senha"
          error={!!errors.confirmPassword?.message}
        >
          <Input.Wrapper>
            <Input.Field
              error={!!errors.confirmPassword?.message}
              id="confirmPassword"
              {...register('confirmPassword')}
              placeholder="••••••••••••••••"
              type={!isShowConfirmPassword ? 'password' : 'text'}
              className="pr-16"
            />
            <Input.Icon
              onClick={handleToggleConfirmPassword}
              icon={
                !isShowConfirmPassword ? (
                  <FiEye size="24" color="#94A3B8" />
                ) : (
                  <FiEyeOff size="24" color="#94A3B8" />
                )
              }
            />
          </Input.Wrapper>

          {errors.confirmPassword?.message && (
            <Input.MessageError message={errors.confirmPassword.message} />
          )}
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
