'use client'

import React, { useEffect, useRef } from 'react'
import styles from './GothicBackground.module.css'
import pageStyles from '../app/page.module.css'

class SmokeParticle {
   x: number
   y: number
   size: number
   speedX: number
   speedY: number
   angle: number
   rotationSpeed: number
   alpha: number
   maxAlpha: number
   life: number
   maxLife: number

   constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth
      this.y = Math.random() * canvasHeight
      // Size between 400 and 900px for nice voluminous puffs
      this.size = Math.random() * 500 + 400 
      this.speedX = (Math.random() - 0.5) * 1.2
      this.speedY = (Math.random() - 0.5) * 1.2
      this.angle = Math.random() * Math.PI * 2
      this.rotationSpeed = (Math.random() - 0.5) * 0.005
      
      this.maxAlpha = Math.random() * 0.15 + 0.05 // Lower visibility for subtlety
      this.alpha = 0
      this.life = 0
      this.maxLife = Math.random() * 800 + 400 
   }

   update() {
      this.x += this.speedX
      this.y += this.speedY
      this.angle += this.rotationSpeed
      this.life++

      if (this.life < 100) {
         this.alpha = (this.life / 100) * this.maxAlpha
      } else if (this.life > this.maxLife - 100) {
         this.alpha = ((this.maxLife - this.life) / 100) * this.maxAlpha
      } else {
         this.alpha = this.maxAlpha
      }
   }

   draw(ctx: CanvasRenderingContext2D, sprite: HTMLCanvasElement) {
      if (this.alpha <= 0) return
      ctx.save()
      ctx.globalAlpha = this.alpha
      ctx.globalCompositeOperation = 'screen'
      ctx.translate(this.x, this.y)
      ctx.rotate(this.angle)
      ctx.drawImage(sprite, -this.size / 2, -this.size / 2, this.size, this.size)
      ctx.restore()
   }
}

class EmberParticle {
   x: number
   y: number
   size: number
   speedX: number
   speedY: number
   color: string
   alpha: number
   life: number
   maxLife: number

   constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth
      this.y = Math.random() * canvasHeight
      this.size = Math.random() * 2 + 0.5
      this.speedX = (Math.random() - 0.5) * 1.5
      this.speedY = Math.random() * -1.5 - 0.5
      
      const colors = ['#d4bfff', '#a38ec4', '#9d4edd', '#d4af37', '#7d2ae8']
      this.color = colors[Math.floor(Math.random() * colors.length)]
      
      this.alpha = Math.random() * 0.7 + 0.1
      this.life = 0
      this.maxLife = Math.random() * 300 + 100
   }

   update(mouseX: number, mouseY: number, canvasHeight: number, canvasWidth: number) {
      this.x += this.speedX + Math.sin(this.life * 0.02) * 0.3
      this.y += this.speedY

      if (mouseX !== -1 && mouseY !== -1) {
         const dx = mouseX - this.x
         const dy = mouseY - this.y
         const distance = Math.sqrt(dx * dx + dy * dy)
         
         if (distance < 120) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (120 - distance) / 120
            const maxPush = 3
            
            this.x -= forceDirectionX * force * maxPush
            this.y -= forceDirectionY * force * maxPush
         }
      }

      this.life++

      if (this.life > this.maxLife - 50) {
         this.alpha = Math.max(0, this.alpha - 0.015)
      }

      if (this.y < -20 || this.life >= this.maxLife || this.alpha <= 0 || this.x < -20 || this.x > canvasWidth + 20) {
         this.y = canvasHeight + 20
         this.x = Math.random() * canvasWidth
         this.life = 0
         this.alpha = Math.random() * 0.7 + 0.1
      }
   }

   draw(ctx: CanvasRenderingContext2D) {
      ctx.save()
      ctx.globalAlpha = this.alpha
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.shadowBlur = 8
      ctx.shadowColor = this.color
      ctx.fill()
      ctx.restore()
   }
}

export default function GothicBackground() {
   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let animationFrameId: number
      let smokeArray: SmokeParticle[] = []
      let embersArray: EmberParticle[] = []
      let imageLoaded = false
      
      const spriteCanvas = document.createElement('canvas')
      spriteCanvas.width = 512
      spriteCanvas.height = 512
      const spriteCtx = spriteCanvas.getContext('2d')

      const img = new Image()
      img.src = '/purple_smoke.png'
      img.onload = () => {
         if (!spriteCtx) return
         // Draw the highly detailed smoke texture
         spriteCtx.drawImage(img, 0, 0, 512, 512)
         
         // Mask the edges so it's a perfectly soft, borderless puff
         spriteCtx.globalCompositeOperation = 'destination-in'
         const grad = spriteCtx.createRadialGradient(256, 256, 0, 256, 256, 256)
         grad.addColorStop(0, 'rgba(0,0,0,1)')
         grad.addColorStop(0.6, 'rgba(0,0,0,0.8)')
         grad.addColorStop(1, 'rgba(0,0,0,0)')
         spriteCtx.fillStyle = grad
         spriteCtx.fillRect(0, 0, 512, 512)
         
         imageLoaded = true
      }
      
      const mouse = { x: -1, y: -1 }

      const handleResize = () => {
         canvas.width = window.innerWidth
         canvas.height = window.innerHeight
         initParticles()
      }

      const handleMouseMove = (e: MouseEvent) => {
         mouse.x = e.clientX
         mouse.y = e.clientY
      }
      
      const handleMouseLeave = () => {
          mouse.x = -1
          mouse.y = -1
      }

      const initParticles = () => {
         smokeArray = []
         embersArray = []
         
         // Smoke puffs
         const numSmoke = Math.min(Math.floor((canvas.width * canvas.height) / 70000), 25)
         for (let i = 0; i < numSmoke; i++) {
            smokeArray.push(new SmokeParticle(canvas.width, canvas.height))
            smokeArray[i].life = Math.random() * smokeArray[i].maxLife // Randomize starting life
         }

         // Embers
         const numEmbers = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 200)
         for (let i = 0; i < numEmbers; i++) {
            embersArray.push(new EmberParticle(canvas.width, canvas.height))
         }
      }

      const animate = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height)
         
         // Draw Smoke Puffs
         if (imageLoaded) {
            for (let i = 0; i < smokeArray.length; i++) {
               const p = smokeArray[i]
               p.update()
               if (p.life >= p.maxLife) {
                  smokeArray[i] = new SmokeParticle(canvas.width, canvas.height)
               }
               p.draw(ctx, spriteCanvas)
            }
         }

         // Draw Embers
         for (let i = 0; i < embersArray.length; i++) {
            embersArray[i].update(mouse.x, mouse.y, canvas.height, canvas.width)
            embersArray[i].draw(ctx)
         }
         
         animationFrameId = requestAnimationFrame(animate)
      }

      window.addEventListener('resize', handleResize)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseleave', handleMouseLeave)
      
      handleResize()
      animate()

      return () => {
         window.removeEventListener('resize', handleResize)
         window.removeEventListener('mousemove', handleMouseMove)
         window.removeEventListener('mouseleave', handleMouseLeave)
         cancelAnimationFrame(animationFrameId)
      }
   }, [])

   return (
      <div className={styles.backgroundContainer}>
         {/* Continuous Volume Smoke & Embers */}
         <canvas ref={canvasRef} className={styles.canvasEmbers} />

         {/* SVG noise overlay to make everything feel like real gas */}
         <div className={styles.noiseOverlay} />

         {/* Global Side Frame Lines from page.module.css */}
         <div className={pageStyles.globalSideFrameLeft} />
         <div className={pageStyles.globalSideFrameRight} />
         <div className={`${pageStyles.globalSideLineAccents} ${pageStyles.accentLeft}`} />
         <div className={`${pageStyles.globalSideLineAccents} ${pageStyles.accentRight}`} />

         {/* Twinkling Ambient Stars */}
         <span className={pageStyles.starGlint} style={{ top: '12%', left: '8%' }}>✦</span>
         <span className={pageStyles.starGlint} style={{ top: '25%', right: '12%', animationDelay: '1s' }}>✦</span>
         <span className={pageStyles.starGlint} style={{ top: '45%', left: '15%', animationDelay: '2s' }}>✦</span>
         <span className={pageStyles.starGlint} style={{ top: '65%', right: '8%', animationDelay: '1.5s' }}>✦</span>
         <span className={pageStyles.starGlint} style={{ top: '85%', left: '10%', animationDelay: '2.5s' }}>✦</span>
      </div>
   )
}
