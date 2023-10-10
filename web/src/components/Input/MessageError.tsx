type MessageErrorProps = {
  message: string
}
export function MessageError({ message }: MessageErrorProps) {
  return (
    <span className="text-red-500 font-poppins font-medium text-xs mt-1">
      {message}
    </span>
  )
}
