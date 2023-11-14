'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useOpportunitiesFeed } from '@/contexts/OpportunitiesFeedContext'
import { FiMapPin, FiSearch } from 'react-icons/fi'

export function SearchOpportunities() {
  const {
    handleChangeTitleSearch,
    handleChangeLocalSearch,
    fetchOpportunities,
  } = useOpportunitiesFeed()
  return (
    <section className="mt-10 ">
      <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:gap-3">
        <div className="flex w-full gap-5  max-sm:flex-col">
          <Input.Label id="vaga" className="flex-1">
            <Input.Field
              onChange={(e) => handleChangeTitleSearch(e.target.value)}
              className="pl-10"
              placeholder="Titulo da vaga"
            >
              <Input.Icon
                positions="left"
                icon={<FiSearch size="20" className="text-blue-700 z-[9]" />}
              />
            </Input.Field>
          </Input.Label>

          <Input.Label id="local" className="flex-1">
            <Input.Field
              onChange={(e) => handleChangeLocalSearch(e.target.value)}
              className="pl-10"
              placeholder="Localização"
            >
              <Input.Icon
                positions="left"
                icon={<FiMapPin size="20" className="text-blue-700" />}
              />
            </Input.Field>
          </Input.Label>
        </div>

        <div className="flex gap-2 max-md:w-full max-md:flex-col ">
          <Button
            variants="secondary"
            className=" flex gap-1 items-center max-md:w-full"
          >
            Limpar campos
          </Button>
          <Button onClick={fetchOpportunities} className=" max-md:w-full">
            Buscar
          </Button>
        </div>
      </div>
    </section>
  )
}
