'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useChangePassword } from '@/hooks/useChangePassword'

export default function PasswordConfig() {
  const {
    errors,
    handleSubmit,
    register,
    handleToggleConfirmPassword,
    handleTogglePassword,
    isShowConfirmPassword,
    isShowPassword,
  } = useChangePassword()
  return (
    <main className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
            Configurar senha
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-lato text-base text-slate-700 font-medium mb-1">
            Alterar senha
          </h2>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <form
          className="grid grid-cols-2 gap-4 mt-6 items-center max-sm:grid-cols-1"
          onSubmit={handleSubmit(() => {
            console.log('')
          })}
        >
          <Input.Label id="password" error={!!errors.password} name="Senha">
            <Input.Wrapper>
              <Input.Field
                {...register('password')}
                placeholder="•••••••••••••"
                minLength={8}
                error={!!errors.password}
                type={isShowPassword ? 'text' : 'password'}
              />
              <Input.Icon
                error={!errors.password}
                isPassword={isShowPassword}
                onClick={handleTogglePassword}
              />
            </Input.Wrapper>
            <Input.MessageError message={errors.password?.message} />
          </Input.Label>
          <Input.Label
            id="confirmPassword"
            error={!!errors.confirmPassword}
            name="Confirmar senha"
          >
            <Input.Wrapper>
              <Input.Field
                {...register('confirmPassword')}
                placeholder="•••••••••••••"
                minLength={8}
                error={!!errors.confirmPassword}
                type={isShowConfirmPassword ? 'text' : 'password'}
              />
              <Input.Icon
                error={!errors.confirmPassword}
                isPassword={isShowConfirmPassword}
                onClick={handleToggleConfirmPassword}
              />
            </Input.Wrapper>
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
