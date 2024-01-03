'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

type ReactPortalProps = {
  containerId: string
  children: React.ReactNode
}

export function ReactPortal({
  containerId = 'portal-root',
  children,
}: ReactPortalProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    containerRef.current = document.getElementById(containerId)

    if (!containerRef.current) {
      containerRef.current = document.createElement('div')
      containerRef.current.setAttribute('id', containerId)
      document.body.appendChild(containerRef.current)
      document.body.appendChild(containerRef.current)
    }
    setMounted(true)
  }, [containerId, mounted])

  return mounted && containerRef.current
    ? ReactDOM.createPortal(
        <>{children}</>,
        document.body.appendChild(containerRef.current) || document.body,
      )
    : null
}
