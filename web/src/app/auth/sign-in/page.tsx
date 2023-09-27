// "use client";
// import Link from "next/link";
// import { useSignIn } from "./useSignIn";
// import { Input } from "@/components/Input";
// import { FiEyeOff, FiEye } from "react-icons/fi";
// import { Button } from "@/components/Button";

// export default function SignIn() {
//   const {
//     handleSubmit,
//     register,
//     errors,
//     handleTogglePassword,
//     isShowPassword,
//   } = useSignIn();

//   return (
//     <div className="flex flex-col max-w-lg  pb-10 w-full max-md:m-auto max-sm:px-6">
//       <header className="mt-8">
//         <h2 className="text-slate-900 text-3xl font-lato font-semibold">
//           Bem vindo ao IBico
//         </h2>
//         <p className="text-slate-400  mt-2 font-poppins">
//           Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
//           vulputate libero et velit interdum, ac aliquet{" "}
//         </p>
//       </header>

//       <form className="flex flex-col mt-8" onSubmit={handleSubmit(() => {})}>
//         <Input.Label error={!!errors.CPF} id="cpf" name="CPF">
//           <Input.Field
//             error={!!errors.CPF}
//             id="cpf"
//             placeholder="Digite seu CPF"
//             autoComplete="cc-number"
//             inputMode="numeric"
//             type="text"
//             maxLength={11}
//             {...register("CPF")}
//           />
//           {errors.CPF?.message && (
//             <Input.MessageError message={errors.CPF.message} />
//           )}
//         </Input.Label>

//         <Input.Label
//           error={!!errors.password}
//           id="password"
//           className="mt-2"
//           name="Senha"
//         >
//           <Input.Wrapper>
//             <Input.Field
//               error={!!errors.password}
//               id="password"
//               type={isShowPassword ? "text" : "password"}
//               {...register("password")}
//               placeholder="••••••••••••••••"
//             />
//             <Input.Icon
//               action={handleTogglePassword}
//               icon={
//                 !isShowPassword ? (
//                   <FiEye size="24" color="#94A3B8" />
//                 ) : (
//                   <FiEyeOff size="24" color="#94A3B8" />
//                 )
//               }
//             />
//           </Input.Wrapper>
//           {errors.password?.message && (
//             <Input.MessageError message={errors.password.message} />
//           )}
//         </Input.Label>

//         <span className="text-slate-400 mt-2 font-poppins">
//           Esqueceu a senha?{" "}
//           <Link
//             href="/auth/reset-password"
//             className="text-blue-700 font-semibold"
//           >
//             Redefinir
//           </Link>
//         </span>

//         <Button className="mt-5">Entrar</Button>
//         <span className="text-slate-400 mt-2 font-poppins">
//           Não possui uma conta?{" "}
//           <Link href="/auth/register" className="text-blue-700 font-semibold">
//             Registra-se
//           </Link>
//         </span>
//       </form>
//     </div>
//   );
// }
