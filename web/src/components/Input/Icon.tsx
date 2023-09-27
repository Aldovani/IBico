import { ReactNode } from "react";

type IconProps = {
  icon: ReactNode;
  action: () => void;
};
export function Icon({ icon, action }: IconProps) {
  return (
    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/4" onClick={action}>
      {icon}
    </button>
  );
}
