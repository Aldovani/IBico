// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { isValidCPF } from '@/utils/isvalidCPF'
// import { useState } from 'react'
// import { mask } from '@/utils/maskCPF'

// export function useSignIn() {
//   const [isShowPassword, setIsShowPassword] = useState(false)

//   const signInSchema = z.object({
//     CPF: z.string().max(11, 'Deve conter 11 caracteres'),
//     password: z.string().min(8, 'Deve conter no mínimo 8 caracteres')
//   }).superRefine((val, ctx) => {

//     if (!isValidCPF(val.CPF)) {
//       ctx.addIssue({ message: "CPF invalido", code: "custom", path: ['CPF'] })
//     }


//   })

//   type signInSchema = z.infer<typeof signInSchema>

//   const { register, handleSubmit, formState: { errors } } = useForm<signInSchema>({
//     resolver: zodResolver(signInSchema),
//     mode: "onSubmit",

//   });


//   function handleSignIn() {

//   }

//   function handleTogglePassword() {
//     setIsShowPassword(current => !current)
//   }

//   return {
//     register, handleSubmit,
//     errors,
//     handleSignIn,
//     handleTogglePassword,
//     isShowPassword
//   }
// }