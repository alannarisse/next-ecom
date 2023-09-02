'use client'

import {ReactNode, useEffect, useState} from 'react'

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)

  // wait til nextjs rehidration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <>
    {isHydrated ? <>{children}</> : <div>Loading...</div>}
    </>
  )
}