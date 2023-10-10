'use client'

import { env } from 'process'

export function useLocalStorage() {
  const LocalStorageKey = env.LOCAL_STORAGE_KEY

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
