// "use client";

// import Link from "next/link";
// import { Input } from "@components/Input";
// import { useRegister } from "./useRegister";

// export default function Register() {
//   const { errors, handleSubmit, register } = useRegister();

//   return (
//     <div className="flex flex-col pb-10 max-w-lg w-full max-md:m-auto max-sm:px-6">
//       <header className="mt-8">
//         <h2 className="text-slate-900 text-3xl font-semibold">
//           Cadastra-se no IBico
//         </h2>
//         <p className="text-slate-400  mt-2">
//           Insira seu nome completo, CPF, telefone, senha e confirmar senha para
//           ter acesso a inúmeras oportunidades
//         </p>
//       </header>
//       <form className="flex flex-col mt-8">
//         <Input.Label id="cpf" name="CPF">
//           <Input.Field
//             isError
//             id="cpf"
//             {...register("cpf")}
//             placeholder="Digite seu CPF"
//           />
//           {errors.cpf?.message && (
//             <Input.MessageError message={errors.cpf.message} />
//           )}
//         </Input.Label>

//         <Input.Label id="name" className="mt-2" name="Nome completo">
//           <Input.Field
//             isError
//             id="name"
//             {...register("name")}
//             placeholder="Digite seu nome completo"
//           />
//           {errors.name?.message && (
//             <Input.MessageError message={errors.name.message} />
//           )}
//         </Input.Label>

//         <Input.Label id="cellphone" className="mt-2" name="Telefone">
//           <Input.Field
//             isError
//             id="cellphone"
//             {...register("cellphone")}
//             placeholder="Digite seu numero de telefone"
//           />
//           {errors.cellphone?.message && (
//             <Input.MessageError message={errors.cellphone.message} />
//           )}
//         </Input.Label>

//         <Input.Label id="password" className="mt-2" name="Senha">
//           <Input.Field
//             isError
//             id="password"
//             {...register("password")}
//             placeholder="••••••••••••••••"
//           />
//           {errors.password?.message && (
//             <Input.MessageError message={errors.password.message} />
//           )}
//         </Input.Label>

//         <Input.Label
//           id="confirmPassword"
//           className="mt-2"
//           name="Confirmar senha"
//         >
//           <Input.Field
//             isError
//             id="confirmPassword"
//             {...register("confirmPassword")}
//             placeholder="••••••••••••••••"
//           />
//           {errors.confirmPassword?.message && (
//             <Input.MessageError message={errors.confirmPassword.message} />
//           )}
//         </Input.Label>

//         <button className="mt-5 bg-blue-700 text-slate-50 w-full py-3 font-bold text-lg rounded-lg">
//           Registra-se
//         </button>

//         <span className="text-slate-400 mt-2">
//           Possui uma conta?
//           <Link href="/auth/sign-in" className="text-blue-700 font-semibold">
//             Entrar
//           </Link>
//         </span>
//       </form>
//     </div>
//   );
// }
