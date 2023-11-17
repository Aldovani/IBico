'use client'

import process from 'process'

export function useLocalStorage() {
  const LocalStorageKey = 'ibico:dev'

  function save(key: string, value: string) {
    localStorage.setItem(`${LocalStorageKey}:${key}`, value)
  }

  function remove(key: string) {
    localStorage.removeItem(`${LocalStorageKey}:${key}`)
  }

  function get(key: string) {
    return localStorage.getItem(`${LocalStorageKey}:${key}`)
  }

  return {
    save,
    remove,
    get,
  }
}
