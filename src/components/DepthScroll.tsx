'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface DepthScrollProps {
   children: ReactNode
   className?: string
}

export default function DepthScroll({ children, className }: DepthScrollProps) {
   const ref = useRef<HTMLDivElement>(null)

   // Отслеживаем прокрутку относительно этого элемента
   const { scrollYProgress } = useScroll({
      target: ref,
      // 'start end': начало элемента (верх) касается конца вьюпорта (низа) -> только появляется
      // 'end start': конец элемента (низ) касается начала вьюпорта (верха) -> полностью ушел
      offset: ['start end', 'end start'],
   })

   // Маппинг значений: 
   // 0 - 0.2: Появление из глубины (снизу вверх)
   // 0.2 - 0.8: Нормальное состояние (читаем контент)
   // 0.8 - 1: Уход в "затылок" (полет камеры сквозь секцию наверх)
   
   const opacity = useTransform(
      scrollYProgress,
      [0, 0.15, 0.85, 1],
      [0, 1, 1, 0]
   )
   
   const scale = useTransform(
      scrollYProgress,
      [0, 0.15, 0.85, 1],
      [0.8, 1, 1, 1.15]
   )
   
   const y = useTransform(
      scrollYProgress,
      [0, 0.15],
      [150, 0]
   )

   return (
      <motion.div
         ref={ref}
         style={{
            opacity,
            scale,
            y,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            height: '100%'
         }}
         className={className}
      >
         {children}
      </motion.div>
   )
}
