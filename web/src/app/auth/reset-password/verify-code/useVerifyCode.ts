import { clientApi } from '@/services/api/providers/clientSide'
import { toast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { z } from 'zod'

type inputsRefs = HTMLInputElement | null

type ResetPasswordInfo = {
  requestId: string
  userCpf: string
}
type RequestVerifyCodePayload = {
  requestId: string
  userCpf: string
  code: string
}

export function useVerifyCode() {
  const pinsInputs = useRef<inputsRefs[]>([])
  const pinsLength = new Array(6).fill(0)
  const [resetPasswordInfo, setResetPasswordInfo] = useState<
    ResetPasswordInfo | undefined
  >(undefined)

  const [code, setCode] = useState(new Map())
  const queyParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (!queyParams.get('data')) return

    const data = JSON.parse(atob(queyParams.get('data') || '{}'))
    if (data?.requestId) {
      setResetPasswordInfo(data)
    }
  }, [queyParams])

  const { mutate } = useMutation({
    mutationFn: handleRequestVerifyCode,
    onSuccess: (data) => {
      const dataToVerifyCode = {
        accessToken: data.accessToken,
      }

      const dataToBase64 = btoa(JSON.stringify(dataToVerifyCode))
      router.push(`/auth/reset-password/change-password?data=${dataToBase64}`)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!resetPasswordInfo?.requestId && !resetPasswordInfo?.userCpf) {
      return
    }

    if (code.size <= 5) {
      toast({ text: 'Código invalido', title: 'Error', type: 'ERROR' })

      return
    }
    let finalCode = ''
    code.forEach((item) => (finalCode += `${item}`))

    mutate({
      requestId: resetPasswordInfo.requestId,
      userCpf: resetPasswordInfo.userCpf,
      code: finalCode,
    })
  }

  async function handleRequestVerifyCode({
    code,
    requestId,
    userCpf,
  }: RequestVerifyCodePayload) {
    const { data } = await clientApi.post('/password/validateCode', {
      code,
      requestId,
      userCpf: userCpf.replace(/\D/g, ''),
    })

    return data
  }

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
      setCode((prev) => {
        prev.delete(index)
        return prev
      })

      return
    }
    setCode((prev) => prev.set(index, Number(pinElement.value)))

    pinsInputs.current[index + 1]?.focus()
  }
  return {
    handleChange,
    handleKey,
    pinsInputs,
    pinsLength,
    resetPasswordInfo,
    handleSubmit,
  }
}
