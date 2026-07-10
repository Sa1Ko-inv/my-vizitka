'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './page.module.css'
import VRMCharacter from '../components/VRMCharacter'
import HexagonGrid from '../components/HexagonGrid'
import ScrollReveal from '../components/ScrollReveal'
import DepthScroll from '../components/DepthScroll'
import GothicBackground from '../components/GothicBackground'

const GothicCardFrame = () => {
   return (
      <div className={styles.gothicFrameContainer}>
         {/* Deep luxury void obsidian base with dark violet grunge undertone */}
         <div className={styles.gothicSharpBg} />

         {/* Intense atmospheric dark violet corner flares */}
         <div className={`${styles.gothicSharpGlow} ${styles.glowTopRight}`} />
         <div
            className={`${styles.gothicSharpGlow} ${styles.glowBottomLeft}`}
         />

         {/* Razor-sharp framing lines with aggressive metallic violet borders */}
         <div className={styles.gothicSharpInnerFrame} />

         {/* Top-Left Sharp Spearhead Crest & Thorny Vines */}
         <div className={styles.cathedralCornerTL}>
            <svg
               viewBox='0 0 280 280'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               {/* Layered Gothic Arrowhead Corner Crest */}
               <motion.path
                  d='M8 8 L25 25 L8 42 M8 8 L42 8 L25 25'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M16 16 L35 35 L16 54 M16 16 L54 16 L35 35'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M8 70 V8 H70 M16 60 V16 H60'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M8 65 H22 L16 75 Z M65 8 V22 L75 16 Z'
                  fill='url(#metalTL)'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
               />
               {/* Top Horizontal Border Bar & Thorny Tendrils */}
               <motion.path
                  d='M70 8 H260 M60 16 H240'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M42 12 C90 2, 140 22, 190 2 C220 22, 245 2, 265 12'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M60 7 Q65 2, 70 5 M110 17 Q115 22, 120 19 M160 7 Q165 2, 170 5 M210 17 Q215 22, 220 19'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               {/* Left Vertical Border Bar & Thorny Tendrils */}
               <motion.path
                  d='M8 70 V260 M16 60 V240'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M12 42 C2 90, 22 140, 2 190 C22 220, 2 245, 12 265'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M7 60 Q2 65, 5 70 M17 110 Q22 115, 19 120 M7 160 Q2 165, 5 170 M17 210 Q22 215, 19 220'
                  stroke='url(#metalTL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               {/* Floating Light crosses / star glints in safe margin */}
               <motion.path
                  d='M35 65 L43 65 M39 61 L39 69 M65 35 L73 35 M69 31 L69 39 M55 55 L61 55 M58 52 L58 58'
                  stroke='#d4bfff'
                  strokeWidth='1'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <defs>
                  <linearGradient
                     id='metalTL'
                     x1='0%'
                     y1='0%'
                     x2='100%'
                     y2='100%'
                  >
                     <stop offset='0%' stopColor='#ffffff' />
                     <stop offset='30%' stopColor='#a38ec4' />
                     <stop offset='70%' stopColor='#6c28b5' />
                     <stop offset='100%' stopColor='#320a55' />
                  </linearGradient>
               </defs>
            </svg>
         </div>

         {/* Bottom-Right Sharp Spearhead Crest & Thorny Roots */}
         <div className={styles.cathedralCornerBR}>
            <svg
               viewBox='0 0 280 280'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               {/* Layered Gothic Arrowhead Corner Crest */}
               <motion.path
                  d='M272 272 L255 255 L272 238 M272 272 L238 272 L255 255'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M264 264 L245 245 L264 226 M264 264 L226 264 L245 245'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M210 272 H272 V210 M220 264 H264 V220'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M272 215 H258 L264 205 Z M215 272 V258 L205 264 Z'
                  fill='url(#metalBR)'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
               />
               {/* Bottom Horizontal Border Bar & Thorny Tendrils */}
               <motion.path
                  d='M20 272 H210 M40 264 H220'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M15 268 C60 258, 110 278, 160 258 C190 278, 215 258, 235 268'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M50 261 Q55 256, 60 259 M100 275 Q105 280, 110 277 M150 261 Q155 256, 160 259 M200 275 Q205 280, 210 277'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               {/* Right Vertical Border Bar & Thorny Tendrils */}
               <motion.path
                  d='M272 20 V210 M264 40 V220'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M268 15 C258 60, 278 110, 258 160 C278 190, 258 215, 268 235'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M261 50 Q256 55, 259 60 M275 100 Q280 105, 277 110 M261 150 Q256 155, 259 160 M275 200 Q280 205, 277 210'
                  stroke='url(#metalBR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               {/* Floating light crosses */}
               <motion.path
                  d='M245 215 L253 215 M249 211 L249 219 M215 245 L223 245 M219 241 L219 249 M225 225 L231 225 M228 222 L228 228'
                  stroke='#d4bfff'
                  strokeWidth='1'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <defs>
                  <linearGradient
                     id='metalBR'
                     x1='100%'
                     y1='100%'
                     x2='0%'
                     y2='0%'
                  >
                     <stop offset='0%' stopColor='#ffffff' />
                     <stop offset='30%' stopColor='#a38ec4' />
                     <stop offset='70%' stopColor='#6c28b5' />
                     <stop offset='100%' stopColor='#320a55' />
                  </linearGradient>
               </defs>
            </svg>
         </div>

         {/* Top-Right Thorny Tendril */}
         <div className={styles.thornTendrilTR}>
            <svg
               viewBox='0 0 200 200'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               {/* Corner Spire & Blades */}
               <motion.path
                  d='M160 8 H192 V40 M168 16 H184 V32 M192 8 L160 40'
                  stroke='url(#metalTR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               {/* Horizontal & Vertical Thorny Wisps */}
               <motion.path
                  d='M10 8 H160 M10 16 H168 M192 40 V190 M184 32 V190'
                  stroke='url(#metalTR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M15 12 C50 2, 90 22, 130 2 C150 22, 170 8, 188 12 C198 30, 178 60, 198 100 C178 140, 198 170, 188 185'
                  stroke='url(#metalTR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M40 7 Q45 2, 50 5 M80 17 Q85 22, 90 19 M120 7 Q125 2, 130 5 M183 50 Q178 55, 181 60 M197 90 Q202 95, 199 100 M183 130 Q178 135, 181 140'
                  stroke='url(#metalTR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               {/* Floating light crosses */}
               <motion.path
                  d='M150 25 L158 25 M154 21 L154 29 M175 50 L175 58 M171 54 L179 54'
                  stroke='#d4bfff'
                  strokeWidth='1'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <defs>
                  <linearGradient
                     id='metalTR'
                     x1='100%'
                     y1='0%'
                     x2='0%'
                     y2='100%'
                  >
                     <stop offset='0%' stopColor='#ffffff' />
                     <stop offset='50%' stopColor='#a38ec4' />
                     <stop offset='100%' stopColor='#320a55' />
                  </linearGradient>
               </defs>
            </svg>
         </div>

         {/* Bottom-Left Thorny Tendril */}
         <div className={styles.thornTendrilBL}>
            <svg
               viewBox='0 0 200 200'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               {/* Corner Spire & Blades */}
               <motion.path
                  d='M8 160 V192 H40 M16 168 V184 H32 M8 192 L40 160'
                  stroke='url(#metalBL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               {/* Horizontal & Vertical Thorny Wisps */}
               <motion.path
                  d='M40 192 H190 M32 184 H190 M8 10 V160 M16 10 V168'
                  stroke='url(#metalBL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M12 15 C2 50, 22 90, 2 130 C22 150, 8 170, 12 188 C30 198, 60 178, 100 198 C140 178, 170 198, 185 188'
                  stroke='url(#metalBL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M7 40 Q2 45, 5 50 M17 80 Q22 85, 19 90 M7 120 Q2 125, 5 130 M50 183 Q55 178, 60 181 M90 197 Q95 202, 100 199 M130 183 Q135 178, 140 181'
                  stroke='url(#metalBL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               {/* Floating light crosses */}
               <motion.path
                  d='M25 150 L33 150 M29 146 L29 154 M50 175 L50 183 M46 179 L54 179'
                  stroke='#d4bfff'
                  strokeWidth='1'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <defs>
                  <linearGradient
                     id='metalBL'
                     x1='0%'
                     y1='100%'
                     x2='100%'
                     y2='0%'
                  >
                     <stop offset='0%' stopColor='#ffffff' />
                     <stop offset='50%' stopColor='#a38ec4' />
                     <stop offset='100%' stopColor='#320a55' />
                  </linearGradient>
               </defs>
            </svg>
         </div>
      </div>
   )
}

const GothicCathedralPortal = () => {
   return (
      <div className={styles.cathedralPortalContainer}>
         <div className={styles.portalCenterGlow} />
         <svg
            className={styles.portalSvg}
            viewBox='0 0 500 500'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
         >
            {/* Outer Glowing Aura Rings */}
            <motion.circle
               cx='250'
               cy='250'
               r='220'
               stroke='url(#portalGrad)'
               strokeWidth='2'
               strokeDasharray='4 12'
               initial={{ pathLength: 0 }}
               whileInView={{ pathLength: 1 }}
               transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <motion.circle
               cx='250'
               cy='250'
               r='190'
               stroke='url(#portalGrad)'
               strokeWidth='1.5'
               initial={{ pathLength: 0 }}
               whileInView={{ pathLength: 1 }}
               transition={{ duration: 2, ease: 'easeInOut' }}
            />
            {/* Intricate Sacred Geometry Altar Stars */}
            <motion.polygon
               points='250,50 391,109 450,250 391,391 250,450 109,391 50,250 109,109'
               stroke='url(#portalGrad)'
               strokeWidth='1.5'
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 0.6 }}
               transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.polygon
               points='250,70 377,123 430,250 377,377 250,430 123,377 70,250 123,123'
               stroke='url(#portalGrad)'
               strokeWidth='1'
               opacity='0.6'
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 0.6 }}
               transition={{ duration: 2, delay: 0.5 }}
            />
            {/* Cardinal Cathedral Spires / Daggers */}
            <motion.path
               d='M250 10 L262 50 L250 70 L238 50 Z'
               fill='url(#portalGrad)'
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
               d='M250 490 L262 450 L250 430 L238 450 Z'
               fill='url(#portalGrad)'
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
               d='M10 250 L50 262 L70 250 L50 238 Z'
               fill='url(#portalGrad)'
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
               d='M490 250 L450 262 L430 250 L450 238 Z'
               fill='url(#portalGrad)'
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.5 }}
            />
            {/* Radiating Rose Window Spikes */}
            <motion.path
               d='M250 30 L250 470 M30 250 L470 250 M95 95 L405 405 M95 405 L405 95'
               stroke='url(#portalGrad)'
               strokeWidth='1'
               strokeDasharray='2 8'
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
               <linearGradient
                  id='portalGrad'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='100%'
               >
                  <stop offset='0%' stopColor='#ffffff' />
                  <stop offset='25%' stopColor='#d4bfff' />
                  <stop offset='60%' stopColor='#9d4edd' />
                  <stop offset='100%' stopColor='#5c168f' />
               </linearGradient>
            </defs>
         </svg>
      </div>
   )
}

const GothicSectionDivider = () => {
   return (
      <ScrollReveal variant='scale' duration={1} amount={0.5}>
         <div className={styles.sectionDividerContainer}>
            <div className={styles.dividerMist} />
            <div className={styles.dividerLaser} />
            {/* Left Blade Wing */}
            <svg
               className={styles.dividerWingLeft}
               viewBox='0 0 260 60'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <motion.path
                  d='M260 30 L50 30 L20 10 M260 30 L50 30 L20 50 M220 30 L100 15 M220 30 L100 45'
                  stroke='url(#wingGradL)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M260 30 L60 30 L35 20 M260 30 L60 30 L35 40'
                  stroke='url(#wingGradL)'
                  strokeWidth='1'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <defs>
                  <linearGradient
                     id='wingGradL'
                     x1='0%'
                     y1='0%'
                     x2='100%'
                     y2='0%'
                  >
                     <stop offset='0%' stopColor='#5c168f' />
                     <stop offset='60%' stopColor='#9d4edd' />
                     <stop offset='100%' stopColor='#ffffff' />
                  </linearGradient>
               </defs>
            </svg>
            {/* Center Floating Diamond Crest */}
            <div className={styles.dividerDiamondCrest}>
               <span className={styles.dividerStar}>✦</span>
            </div>
            {/* Right Blade Wing */}
            <svg
               className={styles.dividerWingRight}
               viewBox='0 0 260 60'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <motion.path
                  d='M0 30 L210 30 L240 10 M0 30 L210 30 L240 50 M40 30 L160 15 M40 30 L160 45'
                  stroke='url(#wingGradR)'
                  strokeWidth='1.5'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <motion.path
                  d='M0 30 L200 30 L225 20 M0 30 L200 30 L225 40'
                  stroke='url(#wingGradR)'
                  strokeWidth='1'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
               />
               <defs>
                  <linearGradient
                     id='wingGradR'
                     x1='0%'
                     y1='0%'
                     x2='100%'
                     y2='0%'
                  >
                     <stop offset='0%' stopColor='#ffffff' />
                     <stop offset='40%' stopColor='#9d4edd' />
                     <stop offset='100%' stopColor='#5c168f' />
                  </linearGradient>
               </defs>
            </svg>
         </div>
      </ScrollReveal>
   )
}

export default function Home() {
   const [heroAvatarLoaded, setHeroAvatarLoaded] = useState(false)
   const skills = [
      {
         category: 'Языки программирования',
         icon: '🔮',
         badge: 'Core',
         colorAccent: 'violet',
         description:
            'Надежный фундамент. Пишу чистый, строго типизированный и оптимизированный код.',
         items: [
            {
               name: 'TypeScript',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#3178C6'
                        d='M1.5 1.5h125v125H1.5z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#FFF'
                        d='M70.3 71.3h10.9v35.8H70.3V71.3zm-32.9 0h21.1v9.3H48.3v26.5H37.4V80.6H27.2v-9.3h10.2zM75.8 71.3h10.9v9.3H75.8v-9.3zm0 13.3h10.9v22.5H75.8V84.6z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'JavaScript',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#F7DF1E'
                        d='M1.5 1.5h125v125H1.5z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#000'
                        d='M66.4 107.1c-5.8 4.2-13 6.8-21.2 6.8-13 0-21.8-6.1-26.6-15.3l12.7-7.8c3.1 5.7 7.7 9.1 13.7 9.1 6 0 10.3-3.2 10.3-7.5 0-4.7-4.1-6.8-14-10.4-13.8-5-22.1-12.7-22.1-26.3 0-14 11.2-24.1 27.5-24.1 10.6 0 19.4 3.9 25 12l-12 8.6c-2.9-5-7.3-7.6-12.7-7.6-5 0-8.8 3-8.8 6.8 0 4.1 3.5 6 12.9 9.3 14.4 5 23.3 12.7 23.3 27 0 14.8-11.9 25.1-28 25.1zM116.1 106c-4.9 5.3-12.5 8-21.5 8-16 0-26.7-10.8-26.7-30.8V33.6h15.1v56.8c0 11.3 5.4 16.5 13.1 16.5 6.4 0 11.9-3.5 15.1-8.5l14.9 7.6z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'SQL',
               icon: (
                  <svg
                     viewBox='0 0 24 24'
                     width='18'
                     height='18'
                     fill='none'
                     stroke='#00B4D8'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     <ellipse cx='12' cy='5' rx='9' ry='3' />
                     <path d='M21 12c0 1.66-4 3-9 3s-9-1.34-9-3' />
                     <path d='M3 5v14c0 1.66 4 3 9 3s-9-1.34 9-3V5' />
                  </svg>
               ),
            },
            {
               name: 'HTML5',
               icon: (
                  <svg viewBox='0 0 384 512' width='18' height='18'>
                     <motion.path
                        fill='#E34F26'
                        d='M0 32l34.9 395.5L191.5 480l157.6-52.5L384 32H0zm308.2 127.9H128.5l4.3 47.7h171.4l-11.8 132.8-100.9 27.2-101.3-27.3-6.3-70.5h47.4l3.5 31 56.7 15.3 56.1-15.1 5.7-64H86.2l-14.3-159.9h240.7l-4.4 83z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'CSS3',
               icon: (
                  <svg viewBox='0 0 384 512' width='18' height='18'>
                     <motion.path
                        fill='#1572B6'
                        d='M0 32l34.9 395.5L191.5 480l157.6-52.5L384 32H0zm308.2 127.9H128.5l4.3 47.7h171.4l-11.8 132.8-100.9 27.2-101.3-27.3-6.3-70.5h47.4l3.5 31 56.7 15.3 56.1-15.1 5.7-64H86.2l-14.3-159.9h240.7l-4.4 83z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
         ],
      },
      {
         category: 'Frontend разработка',
         icon: '🦇',
         badge: 'Pro',
         colorAccent: 'amethyst',
         description:
            'Создание интерактивных, отзывчивых и эстетичных интерфейсов с передовыми фреймворками.',
         items: [
            {
               name: 'React',
               icon: (
                  <svg viewBox='0 0 100 100' width='18' height='18'>
                     <motion.circle
                        cx='50'
                        cy='50'
                        r='11'
                        fill='#61DAFB'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                     />
                     <ellipse
                        cx='50'
                        cy='50'
                        rx='42'
                        ry='17'
                        fill='none'
                        stroke='#61DAFB'
                        strokeWidth='4'
                     />
                     <ellipse
                        cx='50'
                        cy='50'
                        rx='42'
                        ry='17'
                        fill='none'
                        stroke='#61DAFB'
                        strokeWidth='4'
                        transform='rotate(60 50 50)'
                     />
                     <ellipse
                        cx='50'
                        cy='50'
                        rx='42'
                        ry='17'
                        fill='none'
                        stroke='#61DAFB'
                        strokeWidth='4'
                        transform='rotate(120 50 50)'
                     />
                  </svg>
               ),
            },
            {
               name: 'Next.js',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18' fill='#FFF'>
                     <path d='M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm35.8 91L70.4 51.5v39.5H59.2V37.9h11.2l32.5 42.4-3.1 10.7z' />
                  </svg>
               ),
            },
            {
               name: 'Vue 3',
               icon: (
                  <svg viewBox='0 0 256 222' width='18' height='18'>
                     <motion.path
                        fill='#41B883'
                        d='M204.8 0H256L128 221.9 0 0h51.2L128 133z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#35495E'
                        d='M204.8 0L128 133 51.2 0H0l128 221.9L256 0h-51.2z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'MobX',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#FF9955'
                        d='M64 2L10 33.2v61.6L64 126l54-31.2V33.2L64 2zm0 15.6l39.5 22.8-39.5 22.8L24.5 40.4 64 17.6zM21.5 47v34l39.5 22.8V70L21.5 47zm85 34L67 103.8V70l39.5-23v34z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'TailwindCSS',
               icon: (
                  <svg
                     viewBox='0 0 64 64'
                     width='18'
                     height='18'
                     fill='#38BDF8'
                  >
                     <path d='M32 14.2c-5.8 0-10.4 3.7-12 11.2 2.7-3.6 5.8-4.7 9.4-3.4 2 .8 3.5 2.3 5.3 4.1 3 3.1 6.8 7 15.3 7 5.8 0 10.4-3.7 12-11.2-2.7 3.6-5.8 4.7-9.4 3.4-2-.8-3.5-2.3-5.3-4.1-3-3.1-6.8-7-15.3-7zm-16 18.9c-5.8 0-10.4 3.7-12 11.2 2.7-3.6 5.8-4.7 9.4-3.4 2 .8 3.5 2.3 5.3 4.1 3 3.1 6.8 7 15.3 7 5.8 0 10.4-3.7 12-11.2-2.7 3.6-5.8 4.7-9.4 3.4-2-.8-3.5-2.3-5.3-4.1-3-3.1-6.8-7-15.3-7z' />
                  </svg>
               ),
            },
         ],
      },
      {
         category: 'Backend & Базы данных',
         icon: '🗝️',
         badge: 'Expert',
         colorAccent: 'silver',
         description:
            'Проектирование надежных REST/GraphQL API, сложной бизнес-логики и эффективных баз данных.',
         items: [
            {
               name: 'NestJS',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#EA2845'
                        d='M64 2L9 33.7v60.6L64 126l55-31.7V33.7L64 2zm34 81.3L64 103.5l-34-20.2V44.7L64 24.5l34 20.2v38.6z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#FFF'
                        d='M64 36.3L40 50.5v27l24 14.2 24-14.2v-27L64 36.3z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'Node.js',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#539E43'
                        d='M64 5.3L12 35.3v57.4L64 122.7l52-30V35.3L64 5.3zm42.7 77.2L64 107.2l-42.7-24.7V45.5L64 20.8l42.7 24.7v37z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'Express',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18' fill='#FFF'>
                     <path d='M64 11.4c-29 0-52.6 23.6-52.6 52.6s23.6 52.6 52.6 52.6 52.6-23.6 52.6-52.6S93 11.4 64 11.4zm23.8 68.2c-5.2 7-14.8 10.4-25.2 8.7-10.4-1.7-18.4-10-19.7-20.4-.6-4.9.4-9.9 2.9-14.2 5.2-7 14.8-10.4 25.2-8.7 10.4 1.7 18.4 10 19.7 20.4.5 5-.5 10-2.9 14.2z' />
                  </svg>
               ),
            },
            {
               name: 'PrismaORM',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#5A67D8'
                        d='M64 4L14 116h100L64 4z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#C3DAFE'
                        d='M64 4L28 116h72L64 4z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'Sequelize',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#52B0E7'
                        d='M64 6L11 36.6v54.8L64 122l53-30.6V36.6L64 6zm42.4 78L64 109.8 21.6 84V44L64 18.2 106.4 44v40z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.circle
                        cx='64'
                        cy='64'
                        r='22'
                        fill='#3B6C97'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                     />
                  </svg>
               ),
            },
            {
               name: 'PostgreSQL',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#336791'
                        d='M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm28 85.5c-7.3 6.1-17.1 9.7-28 9.7-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 11.2-4.6 21.3-12 28.5z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
         ],
      },
      {
         category: 'DevOps & Инструменты',
         icon: '🛡️',
         badge: 'CI/CD & Tools',
         colorAccent: 'crimson',
         description:
            'Контейнеризация, автоматизация деплоя и поддержка надежных веб-систем в продакшн.',
         items: [
            {
               name: 'Docker',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#2496ED'
                        d='M120 73.2c-2.7-5.1-7.8-8.5-13.8-8.9-.4-7.2-6.4-12.9-13.6-12.9H32.4C17.8 51.4 6 63.2 6 77.8c0 12.3 8.4 22.7 19.9 25.6 4.3 1.1 8.8 1.4 13.3 1.4 17.5 0 34.2-5.4 48.3-15.3 13-9.1 22.8-21.7 28.4-36.3 1.7-4.4 2.9-9 4-13.7.2-1.3-.4-2.6-1.5-3.3v-3z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'Nginx',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#009639'
                        d='M64 4L12 34v60l52 30 52-30V34L64 4zm42 84L64 112.5 22 88V40L64 15.5 106 40v48z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#FFF'
                        d='M38 46h16l20 23.5V46h14v36H72L52 58.5V82H38V46z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'Git',
               icon: (
                  <svg viewBox='0 0 128 128' width='18' height='18'>
                     <motion.path
                        fill='#F05032'
                        d='M64 4L4 64l60 60 60-60L64 4zm26 67.2L75.2 86 61.3 72.1 47.4 86 32.6 71.2 46.5 57.3 32.6 43.4 47.4 28.6 61.3 42.5 75.2 28.6 90 43.4 76.1 57.3 90 71.2z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </svg>
               ),
            },
            {
               name: 'REST API',
               icon: (
                  <svg
                     viewBox='0 0 24 24'
                     width='18'
                     height='18'
                     fill='none'
                     stroke='#A78BFA'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
                     <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
                  </svg>
               ),
            },
            {
               name: 'GraphQL',
               icon: (
                  <svg
                     viewBox='0 0 400 400'
                     width='18'
                     height='18'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'
                     style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                     }}
                  >
                     <motion.path
                        fill='#E10098'
                        d='M40 280l160 92.4L360 280V120L200 27.6 40 120v160zM200 66.8L320 136v127L200 332.2 80 263V136l120-69.2z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#E10098'
                        d='M190.6 312.3h18.8v55h-18.8z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#E10098'
                        transform='rotate(-60 297.8 250.4)'
                        d='M288.4 223h18.8v55h-18.8z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#E10098'
                        transform='rotate(-120 297.8 149.6)'
                        d='M288.4 122h18.8v55h-18.8z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#E10098'
                        transform='rotate(-180 200 87.7)'
                        d='M190.6 60.2h18.8v55h-18.8z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#E10098'
                        transform='rotate(-240 102.2 149.6)'
                        d='M92.8 122h18.8v55h-18.8z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.path
                        fill='#E10098'
                        transform='rotate(-300 102.2 250.4)'
                        d='M92.8 223h18.8v55h-18.8z'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                     <motion.circle
                        fill='#E10098'
                        cx='200'
                        cy='62'
                        r='28'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                     />
                     <motion.circle
                        fill='#E10098'
                        cx='320'
                        cy='131'
                        r='28'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                     />
                     <motion.circle
                        fill='#E10098'
                        cx='320'
                        cy='269'
                        r='28'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                     />
                     <motion.circle
                        fill='#E10098'
                        cx='200'
                        cy='338'
                        r='28'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                     />
                     <motion.circle
                        fill='#E10098'
                        cx='80'
                        cy='269'
                        r='28'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                     />
                     <motion.circle
                        fill='#E10098'
                        cx='80'
                        cy='131'
                        r='28'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                     />
                  </svg>
               ),
            },
            {
               name: 'CI/CD',
               icon: (
                  <svg
                     viewBox='0 0 24 24'
                     width='18'
                     height='18'
                     fill='none'
                     stroke='#34D399'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     <path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
                     <path d='M12 12v9' />
                     <path d='m8 17 4 4 4-4' />
                  </svg>
               ),
            },
         ],
      },
   ]

   const projects = [
      {
         title: 'Diary of Emotions',
         badge: 'Psychology Tech',
         desc: 'Инновационный цифровой дневник и трекер психологического состояния. Концепция — трансформация абстрактных эмоций в наглядную инфографику: пользователь ежедневно фиксирует переживания, выявляет эмоциональные триггеры и развивает осознанность.',
         tech: ['TypeScript', 'React', 'Node.js', 'REST API'],
         url: 'https://github.com/Diary-of-Emotions',
      },
      {
         title: 'Areal',
         badge: 'Corporate HRM',
         desc: 'Корпоративный HRM-сервис для цифровизации работы HR-отдела. Объединяет управление базой кандидатов, процесс онбординга и карточки сотрудников в единую прозрачную экосистему.',
         tech: [
            'Vue 3',
            'Vite',
            'PostgreSQL',
            'Sequelize ORM',
            'Docker',
            'Nginx',
         ],
         url: 'https://github.com/Sa1Ko-inv/areal-hr_ext-test',
      },
      {
         title: 'QR-site',
         badge: 'Fullstack EdTech',
         desc: 'Fullstack-система цифрового учета посещаемости для учебных заведений через динамические QR-коды. Преподаватель генерирует QR-код занятия, студенты сканируют его для мгновенной отметки.',
         tech: ['React', 'MobX', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
         url: 'https://github.com/Sa1Ko-inv/QR-site',
      },
      {
         title: 'Papessa',
         badge: 'Creative UI/UX',
         desc: 'Эстетичный веб-ресурс премиальной тату-студии «Папесса». Интерактивные карточки мастеров, каталог авторских эскизов, портфолио работ и фирменный мерч.',
         tech: ['Vue 3', 'Vite', 'SFC', 'UI/UX', 'CSS3'],
         url: 'https://github.com/Sa1Ko-inv/Papessa',
      },
   ]

   const contacts = [
      {
         platform: 'VK',
         handle: 'sa1ko_inv',
         url: 'https://vk.com/sa1ko_inv',
         svg: (
            <svg className={styles.contactIcon} viewBox='0 0 24 24'>
               <path d='M15.077 2h-6.154C4.615 2 2 4.615 2 8.923v6.154C2 19.385 4.615 22 8.923 22h6.154C19.385 22 22 19.385 22 15.077V8.923C22 4.615 19.385 2 15.077 2zm2.663 14.163c.313.327.64.64.945.977.306.334.61.676.88 1.039.227.306.398.647.234 1.034-.141.341-.497.45-.853.457-.74-.007-1.482-.006-2.221 0-.399.006-.725-.133-.993-.432-.301-.334-.588-.679-.877-1.022-.19-.226-.381-.453-.591-.659-.214-.207-.447-.234-.672-.095-.313.199-.446.5-.473.847-.04.479-.026.96-.034 1.442-.007.365-.2.573-.566.586-1.58.053-3.08-.346-4.426-1.306-1.446-1.031-2.527-2.38-3.414-3.899-1.326-2.269-2.314-4.707-3.04-7.243-.113-.4-.019-.693.385-.706.772-.027 1.545-.02 2.319-.007.339.007.579.193.685.519.574 1.745 1.286 3.4 2.22 4.912.226.372.472.727.758 1.053.187.213.393.226.547.04.146-.179.227-.406.26-.62.106-.713.119-1.426.066-2.14-.073-.979-.499-1.639-1.4-1.926-.299-.093-.266-.239-.146-.353.28-.273.666-.36 1.04-.372 1.406-.053 2.812-.053 4.22-.007.579.02 1.012.26 1.139.84.08.36.066.733.066 1.1-.007 1.253-.007 2.506 0 3.759.007.306.186.513.433.566.252.053.466-.067.665-.246.546-.493 1.012-1.053 1.439-1.639.852-1.173 1.518-2.453 2.051-3.793.133-.339.387-.512.753-.506.812.013 1.626.007 2.438.013.359.007.593.173.646.513.067.433-.087.826-.26 1.2-.613 1.332-1.353 2.585-2.166 3.792-.387.573-.773 1.146-1.146 1.72-.253.387-.226.68.04.999z' />
            </svg>
         ),
      },
      {
         platform: 'Telegram',
         handle: 'Sa1Ko_inv',
         url: 'https://t.me/Sa1Ko_inv',
         svg: (
            <svg className={styles.contactIcon} viewBox='0 0 24 24'>
               <path d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.846 7.493l-1.725 8.12c-.131.597-.487.746-.988.465l-2.735-2.018-1.319 1.27c-.146.146-.269.269-.55.269l.195-2.793 5.083-4.59c.221-.196-.048-.305-.343-.109l-6.284 3.955-2.707-.846c-.588-.184-.6-.588.123-.872l10.574-4.076c.489-.181.92.112.676.225z' />
            </svg>
         ),
      },
      {
         platform: 'GitHub',
         handle: 'Sa1Ko-inv',
         url: 'https://github.com/Sa1Ko-inv',
         svg: (
            <svg className={styles.contactIcon} viewBox='0 0 24 24'>
               <path d='M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z' />
            </svg>
         ),
      },
   ]

   return (
      <main className={styles.mainContainer}>
         {/* ── GOTHIC SITE BACKGROUND & AMBIENCE ── */}
         <GothicBackground />

         {/* ── 3D VRM AVATAR WAS HERE, NOW MOVED TO SECTIONS ── */}

         {/* ── NAVBAR ── */}
         <header className={styles.navbar}>
            <div className={styles.navBrand}>
               <span className={styles.navBrandText}>Sa1Ko-inv</span>
               <span className={styles.navBrandDot} />
            </div>
            <div className={styles.navEmail}>dmitriyblinow@mail.ru</div>
            <nav className={styles.navLinks}>
               <a href='#about' className={styles.navLink}>
                  ABOUT
               </a>
               <a href='#projects' className={styles.navLink}>
                  WORK
               </a>
               <a href='#contacts' className={styles.navLink}>
                  CONTACT
               </a>
            </nav>
         </header>

         {/* ── HERO ── */}
         {/* ── HERO (GLASSMORPHISM CYBER-HUD & 3D HEX GRID) ── */}
         <section id='hero' className={styles.heroSection}>
            {/* Glowing Ambient Backlights & 3D Hexagonal Grid Overlay */}
            <div className={styles.hexGlowCyan} />
            <div className={styles.hexGlowPurple} />
            <HexagonGrid />

            {/* Left: HUD Card (greeting + name + socials) */}
            <div className={styles.heroLeftHUD}>
               <ScrollReveal variant='fadeRight' delay={0.3}>
                  <div className={styles.hudCardLeft}>
                     <GothicCardFrame />
                     <div className={styles.hudHeader}>
                        <div className={styles.hudBlink} />
                        <p className={styles.heroGreeting}>Hello! I&apos;m</p>
                     </div>
                     <h1 className={styles.heroName}>
                        DMITRIY BLINOV
                        <br />
                        SA1KO-INV
                     </h1>
                     <div className={styles.hudDivider} />
                     <div className={styles.hudSocialBar}>
                        {contacts.map((c, i) => (
                           <a
                              key={i}
                              href={c.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className={styles.hudSocialIcon}
                           >
                              {c.svg}
                           </a>
                        ))}
                     </div>
                  </div>
               </ScrollReveal>
            </div>

            {/* Center: Placeholder box for the standing 3D VRM Avatar */}
            <div className={styles.heroCenter} style={{ position: 'relative' }}>
               <DepthScroll>
                  {heroAvatarLoaded && <GothicCathedralPortal />}
               </DepthScroll>
               <VRMCharacter
                  mode='hero'
                  onLoad={() => setHeroAvatarLoaded(true)}
               />
            </div>

            {/* Right: HUD Card (role + cta) */}
            <div className={styles.heroRightHUD}>
               <ScrollReveal variant='fadeLeft' delay={0.3}>
                  <div className={styles.hudCardRight}>
                     <GothicCardFrame />
                     <div className={styles.heroRoleBlock}>
                        <p className={styles.heroRoleHighlight}>
                           FRONTEND & BACKEND
                        </p>
                        <h2 className={styles.heroRole}>
                           FULLSTACK
                           <br />
                           DEVELOPER
                        </h2>
                     </div>
                     <div className={styles.hudDivider} />
                     <div className={styles.hudStatusWidget}>
                        <div className={styles.radarContainer}>
                           <div className={styles.radarDot} />
                           <div className={styles.radarWave} />
                        </div>
                        <span>OPEN TO WORK</span>
                     </div>
                     <a
                        href='https://t.me/Sa1Ko_inv'
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.hudResumeBtn}
                     >
                        <span>РЕЗЮМЕ</span>
                        <span className={styles.hudResumeArrow}>↗</span>
                     </a>
                  </div>
               </ScrollReveal>
            </div>
         </section>

         {/* ── GOTHIC WOW SECTION DIVIDER ── */}
         <GothicSectionDivider />

         {/* ── ABOUT ── */}
         <section id='about' className={styles.sectionContainer}>
            <ScrollReveal variant='fadeDown'>
               <div className={styles.sectionTitleWrapper}>
                  <h2 className={styles.sectionTitle}>
                     <span className={styles.sectionTitleIcon}>💡</span> О себе
                  </h2>
                  <div className={styles.sectionTitleLine} />
               </div>
            </ScrollReveal>
            <DepthScroll>
               <div className={styles.aboutCard}>
                  <GothicCardFrame />
                  {/* Left column: Biography & highlights */}
                  <div className={styles.aboutContent}>
                     <h3 className={styles.aboutHeading}>
                        Разработка, ориентированная на результат
                     </h3>
                     <p className={styles.aboutText}>
                        Создаю масштабируемые веб-приложения и корпоративные
                        системы с элегантной архитектурой и безупречным
                        визуальным стилем. Работая над сложными продуктами
                        (HRM-системы), фокусируюсь на отказоустойчивости и
                        создании безупречного пользовательского опыта.
                     </p>
                     <div className={styles.aboutHighlights}>
                        <div className={styles.highlightItem}>
                           <span className={styles.highlightIcon}>⚡</span>
                           <span className={styles.highlightText}>
                              React, Vue 3, NestJS, Docker
                           </span>
                        </div>
                        <div className={styles.highlightItem}>
                           <span className={styles.highlightIcon}>🛡️</span>
                           <span className={styles.highlightText}>
                              Чистая архитектура и строгая типизация
                              (TypeScript)
                           </span>
                        </div>
                        <div className={styles.highlightItem}>
                           <span className={styles.highlightIcon}>🔗</span>
                           <span className={styles.highlightText}>
                              REST/GraphQL API
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Middle column: Big impressive stats */}
                  <div className={styles.aboutStatsRow}>
                     <div className={styles.statBig}>
                        <span className={styles.statNum}>1.5+</span>
                        <span className={styles.statLbl}>Лет опыта</span>
                     </div>
                     <div className={styles.statBig}>
                        <span className={styles.statNum}>10+</span>
                        <span className={styles.statLbl}>Проектов</span>
                     </div>
                     <div className={styles.statBig}>
                        <span className={styles.statNum}>100%</span>
                        <span className={styles.statLbl}>Fullstack</span>
                     </div>
                  </div>

                  {/* Right column: Glowing backdrop box for the seated 3D VRM Avatar */}
                  <div
                     className={styles.aboutAvatarContainer}
                     style={{ position: 'relative', zIndex: 50 }}
                  >
                     <VRMCharacter mode='about' />
                  </div>
               </div>
            </DepthScroll>
         </section>

         {/* ── GOTHIC WOW SECTION DIVIDER ── */}
         <GothicSectionDivider />

         {/* ── PROJECTS ── */}
         <section id='projects' className={styles.sectionContainer}>
            <ScrollReveal variant='fadeDown'>
               <div className={styles.sectionTitleWrapper}>
                  <h2 className={styles.sectionTitle}>
                     <span className={styles.sectionTitleIcon}>📁</span> Проекты
                  </h2>
                  <div className={styles.sectionTitleLine} />
               </div>
            </ScrollReveal>
            <div className={styles.projectsGrid}>
               {projects.map((proj, idx) => (
                  <DepthScroll key={idx}>
                     <a
                        href={proj.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.projectCard}
                     >
                        <GothicCardFrame />
                        <div className={styles.projectHeader}>
                           <div className={styles.projectTitleWrapper}>
                              <h3 className={styles.projectItemTitle}>
                                 {proj.title}
                              </h3>
                              <div className={styles.liveIndicator}>
                                 <div className={styles.liveDot} />
                                 <span>Live</span>
                              </div>
                           </div>
                           <div className={styles.projectLinksWrapper}>
                              <span className={styles.projectBadge}>
                                 {proj.badge}
                              </span>
                              <span className={styles.projectIcon}>🔗</span>
                           </div>
                        </div>
                        <p className={styles.projectItemDesc}>{proj.desc}</p>
                        <div className={styles.projectItemTech}>
                           {proj.tech.map((t, tIdx) => (
                              <span key={tIdx} className={styles.techTag}>
                                 {t}
                              </span>
                           ))}
                        </div>
                     </a>
                  </DepthScroll>
               ))}
            </div>
         </section>

         {/* ── GOTHIC WOW SECTION DIVIDER ── */}
         <GothicSectionDivider />

         {/* ── SKILLS ── */}
         <section id='skills' className={styles.sectionContainer}>
            <ScrollReveal variant='fadeDown'>
               <div className={styles.sectionTitleWrapper}>
                  <h2 className={styles.sectionTitle}>
                     <span className={styles.sectionTitleIcon}>⚡</span>{' '}
                     Технологии
                  </h2>
                  <div className={styles.sectionTitleLine} />
               </div>
            </ScrollReveal>
            <div className={styles.skillsGrid}>
               {skills.map((group, idx) => (
                  <DepthScroll key={idx}>
                     <div
                        className={`${styles.skillCard} ${
                           group.colorAccent === 'violet'
                              ? styles.accentViolet
                              : group.colorAccent === 'amethyst'
                                ? styles.accentAmethyst
                                : group.colorAccent === 'silver'
                                  ? styles.accentSilver
                                  : styles.accentCrimson
                        }`}
                     >
                        <GothicCardFrame />
                        <div className={styles.skillCardHeader}>
                           <h3 className={styles.skillCardTitle}>
                              <span className={styles.skillCardIcon}>
                                 {group.icon}
                              </span>{' '}
                              {group.category}
                           </h3>
                           <span className={styles.skillCardBadge}>
                              {group.badge}
                           </span>
                        </div>
                        <p className={styles.skillCardDescription}>
                           {group.description}
                        </p>
                        <div className={styles.skillCardTagList}>
                           {group.items.map((skill, sIdx) => (
                              <div key={sIdx} className={styles.skillPill}>
                                 <div className={styles.skillPillInner}>
                                    <span className={styles.skillPillIcon}>
                                       {skill.icon}
                                    </span>
                                    <span className={styles.skillPillName}>
                                       {skill.name}
                                    </span>
                                 </div>
                                 {/* Floating Magic Neon Particles */}
                                 <div className={styles.skillParticles}>
                                    <div
                                       className={`${styles.skillParticle} ${styles.p1}`}
                                    />
                                    <div
                                       className={`${styles.skillParticle} ${styles.p2}`}
                                    />
                                    <div
                                       className={`${styles.skillParticle} ${styles.p3}`}
                                    />
                                    <div
                                       className={`${styles.skillParticle} ${styles.p4}`}
                                    />
                                 </div>
                              </div>
                           ))}
                        </div>
                        <div className={styles.gothicOrnament}>
                           <div className={styles.gothicSymbols}>✦ ✧ ✦</div>
                           <span className={styles.gothicOrnamentText}>
                              {' '}
                              ACTIVE
                           </span>
                        </div>
                     </div>
                  </DepthScroll>
               ))}
            </div>
         </section>

         {/* ── GOTHIC WOW SECTION DIVIDER ── */}
         <GothicSectionDivider />

         {/* ── CONTACTS ── */}
         <section id='contacts' className={styles.sectionContainer}>
            <ScrollReveal variant='fadeDown'>
               <div className={styles.sectionTitleWrapper}>
                  <h2 className={styles.sectionTitle}>
                     <span className={styles.sectionTitleIcon}>🚀</span>{' '}
                     Связаться
                  </h2>
                  <div className={styles.sectionTitleLine} />
               </div>
            </ScrollReveal>
            <DepthScroll>
               <div className={styles.contactsCard}>
                  <GothicCardFrame />
                  <div className={styles.contactsCardHeader}>
                     <div className={styles.contactsTitleArea}>
                        <h3 className={styles.contactsMainTitle}>
                           Готов к сотрудничеству
                        </h3>
                        <p className={styles.contactsSubtitle}>
                           Открыт для предложений от HR, CTO и стартапов
                        </p>
                     </div>
                     <div className={styles.onlineBadge}>
                        <div className={styles.onlineDot} />
                        <span>Fast Response</span>
                     </div>
                  </div>
                  <div className={styles.contactsLinksGrid}>
                     {contacts.map((c, idx) => (
                        <a
                           key={idx}
                           href={c.url}
                           target='_blank'
                           rel='noopener noreferrer'
                           className={styles.contactBtn}
                        >
                           <div className={styles.contactIconWrapper}>
                              {c.svg}
                           </div>
                           <div className={styles.contactInfo}>
                              <span className={styles.contactPlatform}>
                                 {c.platform}
                              </span>
                              <span className={styles.contactHandle}>
                                 {c.handle}
                              </span>
                           </div>
                           <div className={styles.contactArrow}>➔</div>
                        </a>
                     ))}
                  </div>
               </div>
            </DepthScroll>
         </section>

         <footer className={styles.footer}>
            <p className={styles.footerText}>
               © {new Date().getFullYear()} Dmitriy / Sa1Ko-inv · Built with
               Next.js & Three.js
            </p>
         </footer>
      </main>
   )
}
