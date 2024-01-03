import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-bold text-blue-900">404</h1>
      <span className="text-2xl text-slate-400 mt-2">
        Ops, aparentemente voce se perdeu{' '}
      </span>

      <Link
        href="/opportunities"
        className="border border-slate px-16 py-2 rounded-lg mt-2"
      >
        Voltar
      </Link>
    </main>
  )
}
