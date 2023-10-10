import { KeyboardEvent, useRef } from 'react'
import { z } from 'zod'

type inputsRefs = HTMLInputElement | null

export function useVerifyCode() {
  const pinsInputs = useRef<inputsRefs[]>([])
  const pinsLength = new Array(6).fill(0)

  function handleKey(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (!pinsInputs) return

    const pinElement = pinsInputs.current[index] as HTMLInputElement

    if (event.key === 'Backspace' && event.code === 'Backspace') {
      if (pinElement.value === '') {
        pinElement.value = ''

        pinsInputs.current[index - 1]?.focus()
      }
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      pinsInputs.current[index + 1]?.focus()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      pinsInputs.current[index - 1]?.focus()
    }
  }

  function handleChange(index: number) {
    if (!pinsInputs) return
    const pinElement = pinsInputs.current[index] as HTMLInputElement

    const codeNumber = z.string().regex(/[0-9]/)

    const valideCode = codeNumber.safeParse(pinElement.value)

    if (!valideCode.success) {
      pinElement.value = ''
      return
    }

    pinsInputs.current[index + 1]?.focus()
  }
  return {
    handleChange,
    handleKey,
    pinsInputs,
    pinsLength,
  }
}
