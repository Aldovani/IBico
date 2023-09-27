// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// export function useRegister() {


//   const registerSchema = z.object({
//     cpf: z.string(),
//     name: z.string(),
//     cellphone: z.string(),
//     password: z.string().min(8),
//     confirmPassword: z.string().min(8)
//   })

//   type signInSchema = z.infer<typeof registerSchema>

//   const { register, handleSubmit, formState: { errors } } = useForm<signInSchema>({
//     resolver: zodResolver(registerSchema),
//     mode: "onSubmit"
//   });


//   function handleSignIn() {

//   }


//   return {
//     register, handleSubmit,
//     errors,
//     handleSignIn
//   }

// }