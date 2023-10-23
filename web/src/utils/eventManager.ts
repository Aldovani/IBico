type EventMangerType = { (args: unknown): void }[]

export class EventManager<payload> {
  private listeners

  constructor() {
    this.listeners = new Map<string, EventMangerType>()
  }

  on(event: string, listener: (args: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }

    this.listeners.get(event)?.push(listener)
  }

  emit(event: string, payload: payload) {
    if (!this.listeners.has(event)) return

    this.listeners.get(event)?.forEach((listener) => listener(payload))
  }

  removeListener(event: string, listenerRemove: (args: any) => void) {
    const listeners = this.listeners.get(event)

    if (!listeners) return

    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerRemove,
    )

    this.listeners.set(event, filteredListeners)
  }
}
