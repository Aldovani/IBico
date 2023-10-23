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
    <div className="flex items-center justify-between gap-3 h-12 w-full max-w-448 border-x border-y border-slate-200 bg-slate-100 pl-5 rounded-lg">
      <span className="max-h-96 overflow-hidden text-ellipsis">{text}</span>
      <button
        onClick={handleCopy}
        className="text-slate-400 bg-slate-50 p-3 h-full rounded-e-lg border-l hover:text-blue-700 hover:bg-blue-50 transition-all"
      >
        <FiCopy size={24} />
      </button>
    </div>
  )
}
