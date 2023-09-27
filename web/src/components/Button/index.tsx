import { ComponentProps } from "react";

type ButtonProps = {
  isLoading?: boolean;
} & ComponentProps<"button">;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`  font-poppins  bg-blue-700 text-slate-50 w-full py-3 font-bold text-lg rounded-lg duration-150 ease-out  hover:bg-blue-600 ${className}`}
    >
      Entrar
    </button>
  );
}
