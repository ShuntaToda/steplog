'use client';

import { useState } from "react"

export const useOpenText = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false)

  const toggleIsOpen = () => {
    setIsOpen(prev => !prev)
  }
  return { isOpen, toggleIsOpen }
}
