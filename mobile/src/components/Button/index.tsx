import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = {} & TouchableOpacityProps;

export function Button({ children }: ButtonProps) {
  return (
    <TouchableOpacity className="bg-blue-700">{children}</TouchableOpacity>
  );
}
