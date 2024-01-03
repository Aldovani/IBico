/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useUserConfig } from './useUserConfig'
import { Modal } from '@/components/Modal'

import { FiXCircle } from 'react-icons/fi'
import Image from 'next/image'

export default function UserConfig() {
  const {
    errors,
    handleSubmit,
    register,
    handleChangeCPF,
    handleChangeCellphone,
    isLoading,
    mutate,
    handleDisableAccount,
    isLeave,
    isOpen,
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLoadingUserDisable,
    user,
    isMounted,
    handleUpdateAvatar,
    handleDeleteAvatar,
    isLoadingDeleteUserAvatar,
  } = useUserConfig()

  if (!user) return <h1>Carregando</h1>

  return (
    <main className="w-full">
      <section className=" left-0 flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-inter text-xl text-blue-900 font-medium mb-2">
            Configurar perfil
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-inter text-base text-slate-700 font-medium mb-1">
            Foto de perfil
          </h2>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="flex gap-4 mt-4 items-center">
          <Image
            src={user.avatar}
            width={80}
            height={80}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />

          <div>
            <p className="text-xs text-slate-400 font-poppins ">
              Suporte para PNGs, abaixo de 5mb
            </p>
            <div className="flex gap-4 mt-3">
              <label
                htmlFor="uploadImage"
                className="border cursor-pointer border-slate-300 bg-transparent text-slate-500 hover:bg-slate-200 font-poppins font-medium whitespace-nowrap flex  items-center rounded-lg  justify-center w-full  py-2 px-6   duration-150 ease-out "
              >
                Enviar avatar
                <input
                  className="hidden"
                  type="file"
                  onChange={handleUpdateAvatar}
                  id="uploadImage"
                />
              </label>
              <Button
                loading={isLoadingDeleteUserAvatar}
                onClick={handleDeleteAvatar}
                action="dangerous"
                variants="secondary"
              >
                Deletar Avatar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-inter text-base text-slate-700 font-medium mb-1">
            Dados pessoais{' '}
          </h2>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <form
          className="grid grid-cols-2 gap-4 mt-6 items-center max-md:grid-cols-1"
          onSubmit={handleSubmit(({ cellphone, cpf, name, username }) => {
            mutate({
              cellphone,
              cpf,
              name,
              username,
              currentPassword: undefined,
              newPassword: undefined,
              skills: user?.skills || [],
            })
          })}
        >
          <Input.Label id="name" name="Nome" error={!!errors.name}>
            <Input.Field
              id="name"
              {...register('name')}
              error={!!errors.name}
              defaultValue="Aldovani Henrique da costa"
            />
            <Input.MessageError message={errors.name?.message} />
          </Input.Label>
          <Input.Label id="cpf" error={!!errors.cpf} name="CPF">
            <Input.Field
              id="cpf"
              error={!!errors.cpf}
              {...register('cpf', {
                onChange(value) {
                  handleChangeCPF(value.target.value)
                },
              })}
              maxLength={14}
              defaultValue="000.000.000-00"
            />
            <Input.MessageError message={errors.cpf?.message} />
          </Input.Label>

          <Input.Label
            id="username"
            error={!!errors.username}
            name="Node de usuário"
          >
            <Input.Field
              id="username"
              error={!!errors.username}
              {...register('username')}
            />
            <Input.MessageError message={errors.username?.message} />
          </Input.Label>

          <Input.Label
            id="cellphone"
            error={!!errors.cellphone}
            name="Telefone"
          >
            <Input.Field
              id="cellphone"
              error={!!errors.cellphone}
              {...register('cellphone', {
                onChange: (value) => {
                  handleChangeCellphone(value.target.value)
                },
              })}
              defaultValue="(16) 99999-9999"
              inputMode="tel"
              autoComplete="cc-number"
              minLength={14}
              maxLength={17}
            />
            <Input.MessageError message={errors.cellphone?.message} />
          </Input.Label>

          <div className="flex col-start-1 col-end-2  max-w-304 gap-4 w-full">
            <Button variants="secondary">Cancelar</Button>
            <Button loading={isLoading} disabled={isLoading} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-inter text-base text-slate-700 font-medium mb-1">
            Zona de perigo
          </h2>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className=" flex items-center max-w-304 gap-6 mt-6">
          <Button onClick={handleOpen} variants="secondary">
            {user.active ? 'Desativar conta' : 'Ativar conta'}
          </Button>
          <Button onClick={handleOpen} variants="primary" action="dangerous">
            Deletar conta
          </Button>
        </div>
      </section>

      <Modal.Overlay isOpen={isOpen} onClose={handleClose}>
        <Modal.Container
          onAnimationEnd={handleAnimationEndClose}
          isLeave={isLeave}
          isMounted={isMounted}
          isOpen={isOpen}
        >
          <Modal.Header onClose={handleClose}>
            <div className="flex items-center gap-1">
              <div className="p-1 bg-rose-100 rounded-lg text-rose-600">
                <FiXCircle size={18} />
              </div>
              <h3 className="font-inter text-xl font-medium text-rose-600">
                Desativar conta
              </h3>
            </div>
          </Modal.Header>

          <Modal.Body>
            <p>
              voce tem certeza que voce deseja desativar sua conta, voce não
              poderar se candidatar em nenhuma oportunidade em nossa plataforma
              alem de não aparecer na busca dos outros usuários
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Action onClick={handleClose}>Cancelar</Modal.Action>

            <Modal.Action
              isLoading={isLoadingUserDisable}
              onClick={handleDisableAccount}
              actions="dangerous"
            >
              Desativar
            </Modal.Action>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Overlay>
    </main>
  )
}
