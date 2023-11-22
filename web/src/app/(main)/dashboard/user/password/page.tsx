'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { usePasswordConfig } from './usePasswordConfig'

export default function PasswordConfig() {
  const {
    errors,
    handleSubmit,
    handleToggleConfirmPassword,
    handleTogglePassword,
    isShowConfirmPassword,
    isShowPassword,
    register,
    isLoading,
    handleChangePassword,
  } = usePasswordConfig()

  return (
    <main className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-inter text-xl text-slate-900 font-bold mb-2">
            Configurar senha
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-inter text-base text-slate-700 font-medium mb-1">
            Alterar senha
          </h2>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <form
          className="grid grid-cols-2 gap-4 mt-6 items-center max-sm:grid-cols-1"
          onSubmit={handleSubmit(({ password }) =>
            handleChangePassword(password),
          )}
        >
          <Input.Label id="password" error={!!errors.password} name="Senha">
            <Input.Field
              {...register('password')}
              placeholder="•••••••••••••"
              minLength={8}
              error={!!errors.password}
              isLoading={isLoading}
              type={isShowPassword ? 'text' : 'password'}
            >
              <Input.Icon
                error={!errors.password}
                isPassword={isShowPassword}
                isLoading={isLoading}
                onClick={handleTogglePassword}
              />
            </Input.Field>
            <Input.MessageError message={errors.password?.message} />
          </Input.Label>
          <Input.Label
            id="confirmPassword"
            error={!!errors.confirmPassword}
            name="Confirmar senha"
          >
            <Input.Field
              {...register('confirmPassword')}
              placeholder="•••••••••••••"
              minLength={8}
              isLoading={isLoading}
              error={!!errors.confirmPassword}
              type={isShowConfirmPassword ? 'text' : 'password'}
            >
              <Input.Icon
                error={!errors.confirmPassword}
                isLoading={isLoading}
                isPassword={isShowConfirmPassword}
                onClick={handleToggleConfirmPassword}
              />
            </Input.Field>
            <Input.MessageError message={errors.confirmPassword?.message} />
          </Input.Label>

          <div className="col-start-1 col-end-2 flex max-w-304 gap-4 w-full">
            <Button variants="secondary">Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </form>
      </section>
    </main>
  )
}
