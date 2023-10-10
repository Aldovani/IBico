'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useVerifyCode } from './useVerifyCode'

export default function EntrePin() {
  const { handleChange, handleKey, pinsInputs, pinsLength } = useVerifyCode()
  return (
    <div className="flex flex-col max-w-lg  pb-10 w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="text-slate-900 text-3xl font-lato font-semibold">
          Validar código
        </h2>
        <p className="text-slate-400  mt-2 font-poppins">
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet{' '}
        </p>
      </header>

      <form className="flex flex-col mt-8">
        <div className="flex flex-row gap-2 ">
          {pinsLength.map((_, idx) => (
            <Input.Pin
              maxLength={1}
              key={idx}
              ref={(el) => (pinsInputs.current[idx] = el)}
              onChange={() => handleChange(idx)}
              onKeyDown={(e) => handleKey(e, idx)}
              placeholder="0"
            />
          ))}
        </div>
        <Button className="mt-5">validar código</Button>
        <span className="font-poppins text-slate-400 mt-4">
          não recebeu código
          <span className="text-blue-700 font-semibold"> Reenviar</span>
        </span>
      </form>
    </div>
  )
}
