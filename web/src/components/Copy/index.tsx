'use client'
import { toast } from '@/utils/toast'
import { FiCopy } from 'react-icons/fi'
type CopyProps = {
  text: string
}

export function Copy({ text }: CopyProps) {
  function handleCopy() {
    navigator.clipboard.writeText(text)
    toast({
      text: `Link copiado com sucesso agora só basta compartilhar  em suas redes sócias`,
      title: 'Sucesso',
      type: 'SUCCESS',
    })
  }

  return (
    <div className="flex items-center max-w-448  ">
      <div className=" flex items-center border-x border-y border-slate-200   rounded-s-lg pl-5 bg-slate-100 h-12  ">
        <span className=" line-clamp-1 overflow-hidden text-ellipsis">
          {text}
        </span>
      </div>
      <button
        onClick={handleCopy}
        className="h-12 text-slate-400 bg-slate-50 p-3  hover:border-blue-900 rounded-e-lg border   hover:text-blue-900 hover:bg-blue-900/10 transition-all"
      >
        <FiCopy size={24} />
      </button>
    </div>
  )
}
