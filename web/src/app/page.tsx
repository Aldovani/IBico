import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-9xl font-lato">Aqui vem um LP foda</h1>
      <Link href="/opportunities">Vagas</Link>
      <Link href="/auth/sign-in">lOGIN</Link>
      <Link href="/auth/register">Register</Link>
    </main>
  )
}
