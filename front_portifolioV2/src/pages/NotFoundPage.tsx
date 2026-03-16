import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 p-6">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-slate-300">Pagina nao encontrada.</p>
        <Link
          to="/"
          className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400 transition-colors"
        >
          Voltar para inicio
        </Link>
      </section>
    </main>
  )
}
