import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-col pb-10 max-w-lg w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="text-slate-900 text-3xl font-semibold">
          Cadastra-se no IBico
        </h2>
        <p className="text-slate-400  mt-2">
          Insira seu nome completo, CPF, telefone, senha e confirmar senha para
          ter acesso a inúmeras oportunidades
        </p>
      </header>
      <form className="flex flex-col mt-8">
        <label htmlFor="cpf" className="flex flex-col">
          <span className="text-slate-800">CPF</span>
          <input
            type="text"
            id="cpf"
            className="bg-slate-100 mt-2 border-slate-200  text-slate-400 border-2 pl-4 rounded-lg py-4"
            placeholder="Digite seu CPF ou Telefone"
          />
        </label>
        <label htmlFor="name" className="flex flex-col">
          <span className="text-slate-800">Nome completo</span>
          <input
            type="text"
            id="name"
            className="bg-slate-100 mt-2 border-slate-200  text-slate-400 border-2 pl-4 rounded-lg py-4"
            placeholder="Digite seu CPF ou Telefone"
          />
        </label>
        <label htmlFor="phone" className="flex flex-col">
          <span className="text-slate-800">Telefone</span>
          <input
            type="text"
            id="phone"
            className="bg-slate-100 mt-2 border-slate-200  text-slate-400 border-2 pl-4 rounded-lg py-4"
            placeholder="Digite seu CPF ou Telefone"
          />
        </label>
        <label htmlFor="password" className="flex flex-col mt-4">
          <span className="text-slate-800">Senha</span>
          <input
            type="text"
            id="password"
            className="bg-slate-100 mt-2  text-slate-400  border-slate-200 border-2 pl-4 rounded-lg py-4"
            placeholder="••••••••••••••••"
          />
        </label>
        <label htmlFor="confirmPassword" className="flex flex-col mt-4">
          <span className="text-slate-800">Confirmar Senha</span>
          <input
            type="text"
            id="confirmPassword"
            className="bg-slate-100 mt-2  text-slate-400  border-slate-200 border-2 pl-4 rounded-lg py-4"
            placeholder="••••••••••••••••"
          />
        </label>

        <button className="mt-5 bg-blue-700 text-slate-50 w-full py-3 font-bold text-lg rounded-lg">
          Registra-se
        </button>

        <span className="text-slate-400 mt-2">
          Possui uma conta?
          <Link href="/auth/sign-in" className="text-blue-700 font-semibold">
            Entrar
          </Link>
        </span>
      </form>
    </div>
  );
}
