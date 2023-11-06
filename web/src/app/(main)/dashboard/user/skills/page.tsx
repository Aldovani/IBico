'use client'
import { Button } from '@/components/Button'
import { Skills as SkillComponent } from '@components/Skills'
import { useSkills } from './useSkills'

export default function Skills() {
  const { handleAddSkill, handleSubmit, removeSkill, skills, isLoading } =
    useSkills()

  return (
    <main className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
            Configurar Competências
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>

      <section className=" mt-8 items-center  border-b-2 border-slate-200 pb-6">
        <div>
          <h2 className="font-lato text-base text-slate-700 font-medium mb-1">
            Competências
          </h2>
          <p className="font-poppins text-slate-400 text-sm max-w-304">
            Insira sua Competências aqui, para adicionar basta apertar a tecla
            espaço
          </p>
        </div>

        <form
          className=" gap-4 mt-6 items-center max-w-sm"
          onSubmit={handleSubmit}
        >
          <SkillComponent
            skills={skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={removeSkill}
          />

          <div className="flex max-w-304 mt-6 gap-4 w-full">
            <Button variants="secondary">Cancelar</Button>
            <Button loading={isLoading}>Salvar</Button>
          </div>
        </form>
      </section>
    </main>
  )
}
