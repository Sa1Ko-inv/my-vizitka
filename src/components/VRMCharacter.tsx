'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { VRMLoaderPlugin, VRM, VRMHumanBoneName } from '@pixiv/three-vrm'

export default function VRMCharacter() {
   const wrapperRef = useRef<HTMLDivElement | null>(null)
   const containerRef = useRef<HTMLDivElement | null>(null)
   const [progress, setProgress] = useState(0)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      if (!containerRef.current) return
      const container = containerRef.current

      const width = container.clientWidth
      const height = container.clientHeight

      // ── 1. RENDERER ──
      const renderer = new THREE.WebGLRenderer({
         alpha: true,
         antialias: true,
         powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFShadowMap
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      container.appendChild(renderer.domElement)
      renderer.domElement.style.cssText =
         'width:100%;height:100%;display:block;'

      // ── 2. SCENE & CAMERA ──
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100)
      camera.position.set(0, 1.0, 1.6)
      camera.lookAt(0, 0.75, 0)

      // ── 3. PBR STUDIO ENVIRONMENT ──
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

      // ── 4. СТУДИЙНЫЙ СВЕТ (ГОТИЧЕСКАЯ АТМОСФЕРА) ──
      scene.add(new THREE.AmbientLight(0xffffff, 0.85))

      const key = new THREE.DirectionalLight(0xe0d8ee, 2.2) // Серебряный лунный свет
      key.position.set(2, 5, 4)
      key.castShadow = true
      key.shadow.mapSize.setScalar(2048)
      key.shadow.bias = -0.0001
      scene.add(key)

      const fill = new THREE.DirectionalLight(0x7b2cbf, 2.5) // Глубокий готический фиолетовый
      fill.position.set(-4, 2, -1)
      scene.add(fill)

      const backlight = new THREE.DirectionalLight(0xb100e8, 2.0) // Мистический аметистовый контур
      backlight.position.set(0, 3, -4)
      scene.add(backlight)

      // ── 5. ГРУППЫ СЦЕНЫ ──
      const rootGroup = new THREE.Group()
      scene.add(rootGroup)
      const interactGroup = new THREE.Group()
      rootGroup.add(interactGroup)

      // ── 5.1 ПРОЦЕДУРНОЕ КИБЕР-ПРОСТРАНСТВО (СТОЛ, СТУЛ, НОУТБУК) ──
      const furnitureGroup = new THREE.Group()
      furnitureGroup.scale.setScalar(0)
      interactGroup.add(furnitureGroup)

      // МАТЕРИАЛЫ ДЛЯ МЕБЕЛИ (ТЕМНЫЙ ОБСИДИАН И АМЕТИСТ)
      const deskMaterial = new THREE.MeshPhysicalMaterial({
         color: 0x090710,
         roughness: 0.12,
         transmission: 0.85,
         thickness: 0.2,
         clearcoat: 1.0,
      })
      const metalMaterial = new THREE.MeshStandardMaterial({
         color: 0x110f18,
         roughness: 0.35,
         metalness: 0.9,
      })
      const neonPurple = new THREE.MeshStandardMaterial({
         color: 0xb100e8,
         emissive: 0xb100e8,
         emissiveIntensity: 3.0,
      })
      const neonViolet = new THREE.MeshStandardMaterial({
         color: 0x7b2cbf,
         emissive: 0x7b2cbf,
         emissiveIntensity: 2.5,
      })
      const leatherMaterial = new THREE.MeshStandardMaterial({
         color: 0x0c0a12,
         roughness: 0.45,
      })

      // --- КИБЕР-СТОЛ ---
      const deskGroup = new THREE.Group()
      deskGroup.position.set(0, -0.3, 0.42)
      furnitureGroup.add(deskGroup)

      // Столешница
      const topMesh = new THREE.Mesh(
         new THREE.BoxGeometry(1.1, 0.03, 0.6),
         deskMaterial
      )
      topMesh.castShadow = true
      topMesh.receiveShadow = true
      deskGroup.add(topMesh)

      // Неоновая окантовка стола
      const neonTrim = new THREE.Mesh(
         new THREE.BoxGeometry(1.12, 0.008, 0.62),
         neonPurple
      )
      deskGroup.add(neonTrim)

      // Ножки стола
      const legL = new THREE.Mesh(
         new THREE.BoxGeometry(0.05, 0.8, 0.5),
         metalMaterial
      )
      legL.position.set(-0.5, -0.4, 0)
      legL.castShadow = true
      deskGroup.add(legL)

      const legR = new THREE.Mesh(
         new THREE.BoxGeometry(0.05, 0.8, 0.5),
         metalMaterial
      )
      legR.position.set(0.5, -0.4, 0)
      legR.castShadow = true
      deskGroup.add(legR)

      // --- НОУТБУК РАЗРАБОТЧИКА ---
      const laptopGroup = new THREE.Group()
      laptopGroup.position.set(0, 0.015, -0.12)
      laptopGroup.rotation.y = Math.PI
      deskGroup.add(laptopGroup)

      // Нижняя база (клавиатура)
      const laptopBase = new THREE.Mesh(
         new THREE.BoxGeometry(0.32, 0.012, 0.22),
         metalMaterial
      )
      laptopBase.position.set(0, 0.006, -0.05)
      laptopBase.castShadow = true
      laptopGroup.add(laptopBase)

      // Светящаяся клавиатура
      const kbMesh = new THREE.Mesh(
         new THREE.BoxGeometry(0.29, 0.004, 0.13),
         neonPurple
      )
      kbMesh.position.set(0, 0.012, -0.05)
      laptopGroup.add(kbMesh)

      // Открытый экран ноутбука
      const laptopScreenGroup = new THREE.Group()
      laptopScreenGroup.position.set(0, 0.012, -0.15)
      laptopScreenGroup.rotation.x = -0.25
      laptopGroup.add(laptopScreenGroup)

      const screenCover = new THREE.Mesh(
         new THREE.BoxGeometry(0.32, 0.22, 0.01),
         metalMaterial
      )
      screenCover.position.set(0, 0.11, 0)
      laptopScreenGroup.add(screenCover)

      const screenGlow = new THREE.Mesh(
         new THREE.BoxGeometry(0.3, 0.2, 0.004),
         neonViolet
      )
      screenGlow.position.set(0, 0.11, 0.005)
      laptopScreenGroup.add(screenGlow)

      const outerLogo = new THREE.Mesh(
         new THREE.BoxGeometry(0.08, 0.08, 0.004),
         neonPurple
      )
      outerLogo.position.set(0, 0.11, -0.005)
      laptopScreenGroup.add(outerLogo)

      // --- ОФИСНОЕ КРЕСЛО ---
      const chairGroup = new THREE.Group()
      chairGroup.position.set(0, -0.48, -0.22)
      furnitureGroup.add(chairGroup)

      // Сиденье
      const seat = new THREE.Mesh(
         new THREE.BoxGeometry(0.45, 0.06, 0.45),
         leatherMaterial
      )
      seat.castShadow = true
      seat.receiveShadow = true
      chairGroup.add(seat)

      // Спинка
      const backrest = new THREE.Mesh(
         new THREE.BoxGeometry(0.4, 0.58, 0.05),
         leatherMaterial
      )
      backrest.position.set(0, 0.32, -0.2)
      backrest.rotation.x = -0.08
      backrest.castShadow = true
      chairGroup.add(backrest)

      // Стойка кресла
      const cylinder = new THREE.Mesh(
         new THREE.CylinderGeometry(0.03, 0.03, 0.35),
         metalMaterial
      )
      cylinder.position.set(0, -0.18, 0)
      cylinder.castShadow = true
      chairGroup.add(cylinder)

      // ── 6. ЗАГРУЗКА VRM ──
      let vrm: VRM | null = null

      const loader = new GLTFLoader()
      loader.register((parser) => new VRMLoaderPlugin(parser))

      loader.load(
         '/Sa1Ko.vrm',
         (gltf) => {
            vrm = gltf.userData.vrm as VRM

            vrm.scene.traverse((obj) => {
               obj.frustumCulled = false
               if ((obj as THREE.Mesh).isMesh) {
                  const mesh = obj as THREE.Mesh
                  mesh.castShadow = true
                  mesh.receiveShadow = true
               }
            })

            interactGroup.add(vrm.scene)
            setLoading(false)
         },
         (xhr) => {
            if (xhr.total > 0) {
               setProgress(Math.round((xhr.loaded / xhr.total) * 100))
            }
         },
         (err) => {
            console.error('VRM load error:', err)
            setError('Не удалось загрузить Sa1Ko.vrm')
            setLoading(false)
         }
      )

      // ── 7. ОТСЛЕЖИВАНИЕ МЫШИ ──
      let targetRotY = 0
      let targetNeckX = 0
      let targetNeckY = 0

      const onMouseMove = (e: MouseEvent) => {
         const nx = (e.clientX / window.innerWidth) * 2 - 1
         const ny = (e.clientY / window.innerHeight) * 2 - 1
         targetRotY = nx * 0.3
         targetNeckY = nx * 0.5
         targetNeckX = ny * 0.25
      }
      window.addEventListener('mousemove', onMouseMove)

      // ── 8. ОТСЛЕЖИВАНИЕ СКРОЛЛА (БЕЗУПРЕЧНАЯ ПРИВЯЗКА К DOM СЕКЦИИ "ОБО МНЕ") ──
      let scrollProgress = 0

      const onScroll = () => {
         const aboutEl = document.getElementById('about')
         if (!aboutEl) return

         const aboutTop = aboutEl.offsetTop
         const targetTop = aboutTop > 0 ? aboutTop : window.innerHeight

         if (window.scrollY <= targetTop) {
            // ЭКРАН 1 -> 2: Плавный переход от Hero к секции Обо мне
            scrollProgress = window.scrollY / targetTop // от 0.0 до 1.0
            if (wrapperRef.current) {
               wrapperRef.current.style.top = '0px'
            }
         } else {
            // ЭКРАН 2+: Мы скроллим ниже секции Обо мне.
            // Персонаж фиксируется в позе сидения (scrollProgress = 1.0)
            // А сам контейнер сдвигается вверх ровно на столько пикселей, на сколько уехала секция Обо мне!
            scrollProgress = 1.0
            if (wrapperRef.current) {
               const overScroll = window.scrollY - targetTop
               wrapperRef.current.style.top = `-${overScroll}px`
            }
         }
      }
      window.addEventListener('scroll', onScroll)
      // Вызовем сразу для корректной инициализации
      onScroll()

      // ── 9. РЕСАЙЗ ──
      const onResize = () => {
         if (!container) return
         const w = container.clientWidth
         const h = container.clientHeight
         camera.aspect = w / h
         camera.updateProjectionMatrix()
         renderer.setSize(w, h)
         onScroll()
      }
      window.addEventListener('resize', onResize)

      // ── 10. ЦИКЛ АНИМАЦИИ ──
      let rafId: number
      let lastTime = performance.now()

      let targetPosX = 0
      let targetPosY = 0.15
      let targetPosZ = 0
      let targetBaseRotY = 0
      let targetFurnitureScale = 0

      const targetBones = {
         leftUpperArmZ: -1.25,
         rightUpperArmZ: 1.25,
         leftUpperArmX: 0,
         rightUpperArmX: 0,
         leftUpperArmY: 0,
         rightUpperArmY: 0,
         leftLowerArmX: -0.15,
         rightLowerArmX: -0.15,
         leftLowerArmY: 0,
         rightLowerArmY: 0,
         leftLowerArmZ: 0,
         rightLowerArmZ: 0,
         leftUpperLegX: 0,
         rightUpperLegX: 0,
         leftLowerLegX: 0,
         rightLowerLegX: 0,
         spineX: 0,
         hipsY: 0,
      }

      const tick = () => {
         rafId = requestAnimationFrame(tick)
         const now = performance.now()
         const delta = (now - lastTime) / 1000
         lastTime = now
         const t = now / 1000

         // ── РАСЧЕТ ПОЗИЦИИ И ПОЗЫ НА ОСНОВЕ SCROLLPROGRESS (0.0 - 1.0) ──
         // Hero (0.0): targetPosY = 0.15
         // About (1.0): targetPosX = 1.25 (сдвинули еще левее для идеального центра в светящейся рамке), targetPosY = 0.88
         targetPosX = THREE.MathUtils.lerp(0, 1.3, scrollProgress)
         targetPosY = THREE.MathUtils.lerp(0.15, 0.88, scrollProgress)
         targetPosZ = THREE.MathUtils.lerp(0, -5.5, scrollProgress)
         targetBaseRotY = THREE.MathUtils.lerp(0, -0.35, scrollProgress)
         targetFurnitureScale =
            scrollProgress > 0.5 ? (scrollProgress - 0.5) * 2.0 : 0

         if (scrollProgress < 0.5) {
            // СТОЯЧАЯ ПОЗА (HERO)
            targetBones.leftUpperArmZ = -1.25
            targetBones.rightUpperArmZ = 1.25
            targetBones.leftUpperArmX = 0.05
            targetBones.rightUpperArmX = 0.05
            targetBones.leftUpperArmY = 0
            targetBones.rightUpperArmY = 0
            targetBones.leftLowerArmX = -0.15
            targetBones.rightLowerArmX = -0.15
            targetBones.leftLowerArmY = 0
            targetBones.rightLowerArmY = 0
            targetBones.leftLowerArmZ = 0
            targetBones.rightLowerArmZ = 0
            targetBones.leftUpperLegX = 0.05
            targetBones.rightUpperLegX = 0.05
            targetBones.leftLowerLegX = -0.05
            targetBones.rightLowerLegX = -0.05
            targetBones.spineX = 0
            targetBones.hipsY = 0
         } else {
            // ПОЗА СИДЕНИЯ ЗА СТОЛОМ (ABOUT)
            targetBones.leftUpperLegX = -1.3
            targetBones.rightUpperLegX = -1.3
            targetBones.leftLowerLegX = 1.2
            targetBones.rightLowerLegX = 1.2

            targetBones.leftUpperArmZ = -1.2
            targetBones.rightUpperArmZ = 1.2
            targetBones.leftUpperArmX = -0.2
            targetBones.rightUpperArmX = -0.2
            targetBones.leftUpperArmY = -0.3
            targetBones.rightUpperArmY = 0.3

            targetBones.leftLowerArmX = -1.4
            targetBones.rightLowerArmX = -1.4
            targetBones.leftLowerArmY = 0
            targetBones.rightLowerArmY = 0
            targetBones.leftLowerArmZ = 0
            targetBones.rightLowerArmZ = 0

            targetBones.spineX = 0.15
            targetBones.hipsY = -0.35
         }

         rootGroup.position.x += (targetPosX - rootGroup.position.x) * 0.05
         rootGroup.position.y += (targetPosY - rootGroup.position.y) * 0.05
         rootGroup.position.z += (targetPosZ - rootGroup.position.z) * 0.05
         rootGroup.rotation.y += (targetBaseRotY - rootGroup.rotation.y) * 0.05

         // Плавное появление/исчезновение мебели
         const currentFScale = furnitureGroup.scale.x
         const nextFScale =
            currentFScale + (targetFurnitureScale - currentFScale) * 0.08
         furnitureGroup.scale.setScalar(nextFScale)
         if (nextFScale < 0.01) {
            furnitureGroup.visible = false
         } else {
            furnitureGroup.visible = true
         }

         if (vrm) {
            vrm.update(delta)

            interactGroup.rotation.y +=
               (targetRotY - interactGroup.rotation.y) * 0.08

            const h = vrm.humanoid

            const neck = h.getNormalizedBoneNode(VRMHumanBoneName.Neck)
            if (neck) {
               neck.rotation.x += (targetNeckX * 0.5 - neck.rotation.x) * 0.1
               neck.rotation.y += (targetNeckY * 0.5 - neck.rotation.y) * 0.1
            }
            const head = h.getNormalizedBoneNode(VRMHumanBoneName.Head)
            if (head) {
               head.rotation.x += (targetNeckX * 0.5 - head.rotation.x) * 0.1
               head.rotation.y += (targetNeckY * 0.5 - head.rotation.y) * 0.1
            }

            const leftUpperArm = h.getNormalizedBoneNode(
               VRMHumanBoneName.LeftUpperArm
            )
            const rightUpperArm = h.getNormalizedBoneNode(
               VRMHumanBoneName.RightUpperArm
            )
            const leftLowerArm = h.getNormalizedBoneNode(
               VRMHumanBoneName.LeftLowerArm
            )
            const rightLowerArm = h.getNormalizedBoneNode(
               VRMHumanBoneName.RightLowerArm
            )
            const leftUpperLeg = h.getNormalizedBoneNode(
               VRMHumanBoneName.LeftUpperLeg
            )
            const rightUpperLeg = h.getNormalizedBoneNode(
               VRMHumanBoneName.RightUpperLeg
            )
            const leftLowerLeg = h.getNormalizedBoneNode(
               VRMHumanBoneName.LeftLowerLeg
            )
            const rightLowerLeg = h.getNormalizedBoneNode(
               VRMHumanBoneName.RightLowerLeg
            )
            const spine = h.getNormalizedBoneNode(VRMHumanBoneName.Spine)
            const hips = h.getNormalizedBoneNode(VRMHumanBoneName.Hips)

            if (leftUpperArm) {
               leftUpperArm.rotation.z +=
                  (targetBones.leftUpperArmZ - leftUpperArm.rotation.z) * 0.06
               leftUpperArm.rotation.x +=
                  (targetBones.leftUpperArmX - leftUpperArm.rotation.x) * 0.06
               leftUpperArm.rotation.y +=
                  (targetBones.leftUpperArmY - leftUpperArm.rotation.y) * 0.06
            }
            if (rightUpperArm) {
               rightUpperArm.rotation.z +=
                  (targetBones.rightUpperArmZ - rightUpperArm.rotation.z) * 0.06
               rightUpperArm.rotation.x +=
                  (targetBones.rightUpperArmX - rightUpperArm.rotation.x) * 0.06
               rightUpperArm.rotation.y +=
                  (targetBones.rightUpperArmY - rightUpperArm.rotation.y) * 0.06
            }

            // ПРИМЕНЕНИЕ БАЗОВЫХ УГЛОВ И ЭЛЕГАНТНОЙ АНИМАЦИИ ПЕЧАТАНИЯ
            if (leftLowerArm) {
               leftLowerArm.rotation.x +=
                  (targetBones.leftLowerArmX - leftLowerArm.rotation.x) * 0.15
               leftLowerArm.rotation.y +=
                  (targetBones.leftLowerArmY - leftLowerArm.rotation.y) * 0.15
               leftLowerArm.rotation.z +=
                  (targetBones.leftLowerArmZ - leftLowerArm.rotation.z) * 0.15

               if (scrollProgress >= 0.5) {
                  leftLowerArm.rotation.x =
                     targetBones.leftLowerArmX + Math.sin(t * 15) * 0.04
               }
            }
            if (rightLowerArm) {
               rightLowerArm.rotation.x +=
                  (targetBones.rightLowerArmX - rightLowerArm.rotation.x) * 0.15
               rightLowerArm.rotation.y +=
                  (targetBones.rightLowerArmY - rightLowerArm.rotation.y) * 0.15
               rightLowerArm.rotation.z +=
                  (targetBones.rightLowerArmZ - rightLowerArm.rotation.z) * 0.15

               if (scrollProgress >= 0.5) {
                  rightLowerArm.rotation.x =
                     targetBones.rightLowerArmX + Math.cos(t * 18) * 0.04
               }
            }

            if (leftUpperLeg)
               leftUpperLeg.rotation.x +=
                  (targetBones.leftUpperLegX - leftUpperLeg.rotation.x) * 0.06
            if (rightUpperLeg)
               rightUpperLeg.rotation.x +=
                  (targetBones.rightUpperLegX - rightUpperLeg.rotation.x) * 0.06
            if (leftLowerLeg)
               leftLowerLeg.rotation.x +=
                  (targetBones.leftLowerLegX - leftLowerLeg.rotation.x) * 0.06
            if (rightLowerLeg)
               rightLowerLeg.rotation.x +=
                  (targetBones.rightLowerLegX - rightLowerLeg.rotation.x) * 0.06

            if (spine)
               spine.rotation.x +=
                  (targetBones.spineX - spine.rotation.x) * 0.06
            if (hips)
               hips.position.y += (targetBones.hipsY - hips.position.y) * 0.06

            const chest = h.getNormalizedBoneNode(VRMHumanBoneName.Chest)
            if (chest) chest.rotation.x = Math.sin(t * 1.6) * 0.015

            if (vrm.expressionManager) {
               const blinkT = t % 4.5
               const blink =
                  blinkT < 0.1
                     ? Math.min(blinkT / 0.08, 1)
                     : blinkT < 0.2
                       ? Math.max((0.2 - blinkT) / 0.1, 0)
                       : 0
               vrm.expressionManager.setValue('blink', blink)
            }
         }

         renderer.render(scene, camera)
      }
      tick()

      return () => {
         window.removeEventListener('mousemove', onMouseMove)
         window.removeEventListener('scroll', onScroll)
         window.removeEventListener('resize', onResize)
         cancelAnimationFrame(rafId)
         pmrem.dispose()
         renderer.dispose()
         if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
         }
      }
   }, [])

   return (
      <div
         ref={wrapperRef}
         style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 10,
         }}
      >
         <div
            ref={containerRef}
            style={{
               width: '100%',
               height: '100%',
               position: 'absolute',
               inset: 0,
            }}
         />

         {loading && !error && (
            <div
               style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  zIndex: 20,
                  background: 'rgba(12,9,22,0.85)',
                  padding: '2rem 3rem',
                  borderRadius: '24px',
                  border: '1px solid rgba(157,78,221,0.35)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 35px rgba(157,78,221,0.25)',
               }}
            >
               <div
                  style={{
                     width: 48,
                     height: 48,
                     borderRadius: '50%',
                     border: '3px solid rgba(255,255,255,0.1)',
                     borderTopColor: 'var(--purple-bright)',
                     borderBottomColor: 'var(--violet-mystic)',
                     animation: 'spinRing 1s linear infinite',
                  }}
               />
               <span
                  style={{
                     fontWeight: 800,
                     color: '#fff',
                     letterSpacing: 2,
                     fontSize: '0.9rem',
                  }}
               >
                  LOADING 3D AVATAR... {progress}%
               </span>
            </div>
         )}
      </div>
   )
}
