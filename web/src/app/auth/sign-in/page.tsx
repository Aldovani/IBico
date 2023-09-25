import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex flex-col max-w-lg  pb-10 w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="text-slate-900 text-3xl font-semibold">
          Bem vindo ao IBico
        </h2>
        <p className="text-slate-400  mt-2">
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet{" "}
        </p>
      </header>

      <form className="flex flex-col mt-8">
        <label htmlFor="cpfPhone" className="flex flex-col">
          <span className="text-slate-800">CPF/Telefone</span>
          <input
            type="text"
            id="cpfPhone"
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
        <span className="text-slate-400 mt-2">
          Esqueceu a senha?{" "}
          <Link
            href="/auth/reset-password"
            className="text-blue-700 font-semibold"
          >
            Redefinir
          </Link>
        </span>
        <button className="mt-5 bg-blue-700 text-slate-50 w-full py-3 font-bold text-lg rounded-lg duration-150 ease-out  hover:bg-blue-600">
          Entrar
        </button>

        <span className="text-slate-400 mt-2">
          Não possui uma conta?{" "}
          <Link href="/auth/register" className="text-blue-700 font-semibold">
            Registra-se
          </Link>
        </span>
      </form>
    </div>
  );
}
