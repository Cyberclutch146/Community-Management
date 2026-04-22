'use client'

import { useEffect, useState } from 'react'

export default function DynamicBackground({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100

      // throttle using requestAnimationFrame for performance
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setMousePos({ x, y })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col w-full">
      {/* Fixed background layer */}
      <div
        className="fixed inset-0 pointer-events-none transition-colors duration-300 z-[-1]"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(31,61,43,0.06), transparent 25%),
            radial-gradient(circle at 20% 10%, rgba(31,61,43,0.04), transparent 40%),
            #f5f4f1
          `
        }}
      />
      {children}
    </div>
  )
}