'use client'

import { motion, type Variants } from 'framer-motion'
import { ReactNode } from 'react'

type AnimationVariant =
   | 'fadeUp'
   | 'fadeDown'
   | 'fadeLeft'
   | 'fadeRight'
   | 'scale'
   | 'portalReveal'

interface ScrollRevealProps {
   children: ReactNode
   variant?: AnimationVariant
   delay?: number
   duration?: number
   className?: string
   style?: React.CSSProperties
   once?: boolean
   amount?: number
}

const animationVariants: Record<AnimationVariant, Variants> = {
   fadeUp: {
      hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
   },
   fadeDown: {
      hidden: { opacity: 0, y: -60, filter: 'blur(8px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
   },
   fadeLeft: {
      hidden: { opacity: 0, x: -80, filter: 'blur(8px)' },
      visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
   },
   fadeRight: {
      hidden: { opacity: 0, x: 80, filter: 'blur(8px)' },
      visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
   },
   scale: {
      hidden: { opacity: 0, scale: 0.7, filter: 'blur(12px)' },
      visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
   },
   portalReveal: {
      hidden: { opacity: 0, y: 80, scale: 0.97, filter: 'blur(15px)' },
      visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
   },
}

export default function ScrollReveal({
   children,
   variant = 'fadeUp',
   delay = 0,
   duration = 0.8,
   className,
   style,
   once = true,
   amount = 0.15,
}: ScrollRevealProps) {
   return (
      <motion.div
         initial='hidden'
         whileInView='visible'
         viewport={{ once, amount }}
         variants={animationVariants[variant]}
         transition={{
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
         }}
         className={className}
         style={style}
      >
         {children}
      </motion.div>
   )
}
