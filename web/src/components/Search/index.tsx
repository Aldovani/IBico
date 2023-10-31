import { FiFilter, FiMapPin, FiSearch } from 'react-icons/fi'
import { Input } from '../Input'
import { Button } from '../Button'

export function SearchOpportunities() {
  return (
    <section className="mt-10 ">
      <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:gap-3">
        <div className="flex w-full gap-5  max-sm:flex-col">
          <Input.Label id="vaga" className="flex-1">
            <Input.Wrapper>
              <Input.Icon
                positions="left"
                icon={<FiSearch size="20" className="text-blue-700" />}
              />
              <Input.Field className="pl-10" placeholder="Titulo da vaga" />
            </Input.Wrapper>
          </Input.Label>

          <Input.Label id="local" className="flex-1">
            <Input.Wrapper>
              <Input.Icon
                positions="left"
                icon={<FiMapPin size="20" className="text-blue-700" />}
              />
              <Input.Field className="pl-10" placeholder="Localização" />
            </Input.Wrapper>
          </Input.Label>
        </div>

        <div className="flex gap-2 max-md:w-full max-md:flex-col ">
          <Button
            variants="secondary"
            className="w-32 flex gap-1 items-center max-md:w-full"
          >
            <FiFilter size="16" />
            Filtros
          </Button>
          <Button className="w-32 max-md:w-full">Buscar</Button>
        </div>
      </div>
    </section>
  )
}
