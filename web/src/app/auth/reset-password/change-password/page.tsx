'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useResetPassword } from './useChangePassword'

export default function ChangePassword() {
  const {
    handleToggleConfirmPassword,
    handleTogglePassword,
    isShowConfirmPassword,
    isShowPassword,
    errors,
    handleSubmit,
    register,
    isLoading,
    mutate,
  } = useResetPassword()

  return (
    <div className="max-w-lg  pb-10 w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="text-slate-900 text-3xl font-lato font-semibold">
          Redefina sua senha
        </h2>
        <p className="text-slate-400  mt-2 font-poppins">
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet{' '}
        </p>
      </header>

      <form
        className="flex flex-col mt-8"
        onSubmit={handleSubmit(({ password }) => {
          mutate(password)
        })}
      >
        <Input.Label id="password" name="Nova senha" error={!!errors.password}>
          <Input.Wrapper>
            <Input.Field
              error={!!errors.password}
              placeholder="••••••••••••••••"
              {...register('password')}
              type={isShowPassword ? 'text' : 'password'}
              id="password"
              minLength={8}
            />

            <Input.Icon
              onClick={handleTogglePassword}
              isPassword={isShowPassword}
              error={!errors.password}
            />
          </Input.Wrapper>
          <Input.MessageError message={errors.password?.message} />
        </Input.Label>

        <Input.Label
          id="confirmPassword"
          className="mt-5"
          name="Confirmar senha"
          error={!!errors.confirmPassword}
        >
          <Input.Wrapper>
            <Input.Field
              id="confirmPassword"
              {...register('confirmPassword')}
              type={isShowConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••••••••••"
              minLength={8}
              error={!!errors.confirmPassword}
            />
            <Input.Icon
              onClick={handleToggleConfirmPassword}
              isPassword={isShowConfirmPassword}
              error={!errors.confirmPassword}
            />
          </Input.Wrapper>
          <Input.MessageError message={errors.confirmPassword?.message} />
        </Input.Label>
        <Button className="mt-5" loading={isLoading}>
          Alterar senha
        </Button>
      </form>
    </div>
  )
}
