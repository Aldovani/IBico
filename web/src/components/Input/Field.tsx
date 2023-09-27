import { tv, VariantProps } from "tailwind-variants";
import { ComponentProps, Ref, forwardRef } from "react";

const field = tv({
  base: "w-full bg-slate-100 mt-2 font-poppins outline-0 placeholder:text-slate-400 text-slate-700  border-slate-200 border-2 pl-4 rounded-lg py-4  focus:border-blue-700 focus:text-blue-700",
  variants: {
    error: {
      true: "border-red-500 text-red-500 focus:border-red-500 focus:text-red-500 placeholder:text-red-400 ",
    },
  },
});

type FieldProps = ComponentProps<"input"> & VariantProps<typeof field> & {};

export const Field = forwardRef(function (
  { error, ...props }: FieldProps,
  ref: Ref<HTMLInputElement> | null
) {
  return <input className={field({ error })} ref={ref} {...props} />;
});

Field.displayName = "InputField";
