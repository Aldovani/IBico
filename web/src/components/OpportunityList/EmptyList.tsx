import Link from 'next/link'

export function OpportunityListEmpty() {
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h1>Voce não possui nenhuma oportunidade criada no momento </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias iusto
        nemo at quidem, dolorem fugiat? Illo sit cumque eius voluptate aliquam
        nam vero, voluptates similique exercitationem vel voluptatem? Similique,
        sint.
      </p>
      <Link href="/dashboard/opportunities/create">Crie agora mesmo</Link>
    </section>
  )
}
