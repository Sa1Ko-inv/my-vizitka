'use client'
import React, { useEffect, useRef } from 'react'
import styles from './HexagonGrid.module.css'

export default function HexagonGrid() {
   const canvasRef = useRef<HTMLCanvasElement | null>(null)

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let animationFrameId: number
      let width = (canvas.width = window.innerWidth)
      let height = (canvas.height = window.innerHeight)

      const handleResize = () => {
         if (!canvas) return
         width = canvas.width = window.innerWidth
         height = canvas.height = window.innerHeight
      }
      window.addEventListener('resize', handleResize)

      // Hexagon geometry parameters
      const hexRadius = 40 // Outer radius (size of hexagon)
      const hexHeight = hexRadius * Math.sqrt(3)
      const horizSpacing = hexRadius * 1.5
      const vertSpacing = hexHeight

      // Helper to draw a single hexagon path
      const drawHexagonPath = (x: number, y: number, radius: number) => {
         ctx.beginPath()
         for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const xPos = x + radius * Math.cos(angle)
            const yPos = y + radius * Math.sin(angle)
            if (i === 0) ctx.moveTo(xPos, yPos)
            else ctx.lineTo(xPos, yPos)
         }
         ctx.closePath()
      }

      const startTime = Date.now()

      const render = () => {
         const elapsed = (Date.now() - startTime) * 0.001

         // Clear canvas with pure deep void black color
         ctx.fillStyle = '#030107'
         ctx.fillRect(0, 0, width, height)

         const cols = Math.ceil(width / horizSpacing) + 2
         const rows = Math.ceil(height / vertSpacing) + 2

         for (let row = -1; row < rows; row++) {
            for (let col = -1; col < cols; col++) {
               // Calculate center position of hexagon
               const x = col * horizSpacing
               let y = row * vertSpacing
               if (col % 2 !== 0) {
                  y += vertSpacing / 2
               }

               // 1. Shimmer/Brightness Wave (pulses line thickness and glow intensity subtly)
               const wave1 = Math.sin(elapsed * 1.0 + col * 0.2 + row * 0.3)
               const wave2 = Math.cos(elapsed * 0.8 - col * 0.25 + row * 0.2)
               const shimmer = (wave1 + wave2 + 2) / 4 // Normalized 0 to 1

               // 2. Dynamic Color Shift Wave (shifts every single cell between Dark Gothic Violet and Deep Wine Purple)
               const colorWave = Math.sin(elapsed * 0.5 + col * 0.15 + row * 0.2)
               const colorBlend = (colorWave + 1) / 2 // Normalized 0 to 1

               // Interpolate RGB between Dark Gothic Violet (92, 22, 143) and Deep Velvet Purple (74, 14, 120)
               const r = Math.round(92 - colorBlend * 18)
               const g = Math.round(22 - colorBlend * 8)
               const b = Math.round(143 - colorBlend * 23)

               // Extremely subtle, elegant opacity for a true gothic background void
               const alpha = 0.03 + shimmer * 0.15
               ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
               ctx.lineWidth = 1.0 + shimmer * 0.5

               // Draw outer hexagon rim
               drawHexagonPath(x, y, hexRadius - 2)
               ctx.stroke()

               // Fill inner face with subtle dark velvet highlight
               const faceAlpha = 0.005 + shimmer * 0.02
               ctx.fillStyle = `rgba(100, 30, 160, ${faceAlpha})`
               drawHexagonPath(x, y, hexRadius - 4)
               ctx.fill()
            }
         }

         animationFrameId = requestAnimationFrame(render)
      }

      render()

      return () => {
         window.removeEventListener('resize', handleResize)
         cancelAnimationFrame(animationFrameId)
      }
   }, [])

   return (
      <div className={styles.canvasContainer}>
         {/* Ambient glowing background blobs for deep gothic depth */}
         <div className={styles.gothicGlowViolet} />
         <div className={styles.gothicGlowAmethyst} />
         <canvas ref={canvasRef} className={styles.hexCanvas} />
      </div>
   )
}
