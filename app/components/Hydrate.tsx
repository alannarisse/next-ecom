'use client'

import { useThemeStore } from '@/store'
import {ReactNode, useEffect, useState} from 'react'

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const themeStore = useThemeStore()

  // wait til nextjs rehidration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <>
    {isHydrated ? <body className="font-lato px-4" data-theme={themeStore.mode}>{children}</body> : <body><h1>Loading the magic...</h1></body>}
    </>
  )
}