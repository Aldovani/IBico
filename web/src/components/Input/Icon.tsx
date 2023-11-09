import { VariantProps, tv } from 'tailwind-variants'
import { ReactNode } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const iconStyles = tv({
  base: 'absolute top-1/2 -translate-y-1/2',
  variants: {
    positions: {
      right: ' right-4',
      left: 'left-4',
    },
  },
})

type IconProps = {
  icon?: ReactNode
  isPassword?: boolean
  isLoading?: boolean
  error?: boolean

  onClick?: () => void
} & VariantProps<typeof iconStyles>

export function Icon({
  icon,
  positions = 'right',
  onClick,
  error,
  isPassword = undefined,
  isLoading,
}: IconProps) {
  if (isLoading) return null

  if (!onClick) {
    return (
      <span className={iconStyles({ positions })} onClick={onClick}>
        {icon}
      </span>
    )
  }

  return (
    <button
      type="button"
      className={iconStyles({ positions })}
      onClick={onClick}
    >
      {icon}

      {isPassword && <FiEye size="24" color={error ? '#94a3b8' : '#E11D48'} />}
      {!isPassword && (
        <FiEyeOff size="24" color={error ? '#94a3b8' : '#E11D48'} />
      )}
    </button>
  )
}
