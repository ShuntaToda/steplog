import { useEffect, useState } from "react"

export const useLocalstrage = (key: string, initial: any) => {
  const [storage, setStorage] = useState(() => {
    if (localStorage.getItem(key)) return localStorage.getItem(key)
    localStorage.setItem(key, initial)
    return initial
  })
  const setLocalstorage = (data: any) => {
    setStorage(data)
    localStorage.setItem(key, JSON.stringify(data))
  }

  return [storage, setLocalstorage]
}
