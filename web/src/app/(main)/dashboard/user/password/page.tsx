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
          <h1 className="font-inter text-xl text-blue-900 font-medium mb-2">
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
          onSubmit={handleSubmit(({ currentPassword, newPassword }) =>
            handleChangePassword(currentPassword, newPassword),
          )}
        >
          <Input.Label
            id="currentPassword"
            error={!!errors.currentPassword}
            name="Senha atual"
          >
            <Input.Field
              {...register('currentPassword')}
              placeholder="•••••••••••••"
              minLength={8}
              id="currentPassword"
              error={!!errors.currentPassword}
              isLoading={isLoading}
              type={isShowPassword ? 'text' : 'password'}
            >
              <Input.Icon
                error={!errors.currentPassword}
                isPassword={isShowPassword}
                isLoading={isLoading}
                onClick={handleTogglePassword}
              />
            </Input.Field>
            <Input.MessageError message={errors.currentPassword?.message} />
          </Input.Label>
          <Input.Label
            id="newPassword"
            error={!!errors.newPassword}
            name="Confirmar senha"
          >
            <Input.Field
              id="newPassword"
              {...register('newPassword')}
              placeholder="•••••••••••••"
              minLength={8}
              isLoading={isLoading}
              error={!!errors.newPassword}
              type={isShowConfirmPassword ? 'text' : 'password'}
            >
              <Input.Icon
                error={!errors.newPassword}
                isLoading={isLoading}
                isPassword={isShowConfirmPassword}
                onClick={handleToggleConfirmPassword}
              />
            </Input.Field>
            <Input.MessageError message={errors.newPassword?.message} />
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
