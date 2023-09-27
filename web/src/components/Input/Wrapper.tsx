import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};
export function Wrapper({ children }: WrapperProps) {
  return <div className="relative w-full">{children}</div>;
}
