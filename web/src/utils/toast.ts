import { EventManager } from './eventManager'

type ToastProps = {
  type: 'SUCCESS' | 'ERROR' | 'WARNING'
  text: string
  title: string
}
export const toastEventManager = new EventManager<ToastProps>()

export function toast({ type, text, title }: ToastProps) {
  toastEventManager.emit('addtoast', { type, text, title })
}
