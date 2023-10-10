import { VariantProps, tv } from 'tailwind-variants'
import { ReactNode } from 'react'

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
  icon: ReactNode
  onClick?: () => void
} & VariantProps<typeof iconStyles>

export function Icon({ icon, positions = 'right', onClick }: IconProps) {
  if (!onClick) {
    return (
      <div className={iconStyles({ positions })} onClick={onClick}>
        {icon}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={iconStyles({ positions })}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
