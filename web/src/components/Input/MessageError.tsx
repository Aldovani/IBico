type MessageErrorProps = {
  message?: string
}
export function MessageError({ message }: MessageErrorProps) {
  if (!message) return null

  return (
    <span className="text-rose-500 font-poppins font-medium text-xs mt-1">
      {message}
    </span>
  )
}
