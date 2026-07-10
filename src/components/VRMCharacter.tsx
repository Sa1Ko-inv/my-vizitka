'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { VRMLoaderPlugin, VRM, VRMHumanBoneName } from '@pixiv/three-vrm'

export default function VRMCharacter({
   mode = 'hero',
   onLoad,
}: {
   mode?: 'hero' | 'about'
   onLoad?: () => void
}) {
   const wrapperRef = useRef<HTMLDivElement | null>(null)
   const containerRef = useRef<HTMLDivElement | null>(null)
   const [progress, setProgress] = useState(0)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      if (mode === 'hero') {
         document.body.style.overflow = loading ? 'hidden' : ''
      }
      return () => {
         if (mode === 'hero') {
            document.body.style.overflow = ''
         }
      }
   }, [loading, mode])

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
      // Инициализируем стартовую позицию rootGroup сразу, чтобы избежать пролета
      rootGroup.position.x = mode === 'about' ? 0.4 : 0
      rootGroup.position.y = mode === 'about' ? 0.75 : 0.15
      rootGroup.rotation.y = mode === 'about' ? -0.7 : 0
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
      const screenFrameMaterial = new THREE.MeshStandardMaterial({
         color: 0x1a1a2e,
         roughness: 0.8,
      })
      const screenMaterial = new THREE.MeshBasicMaterial({
         color: 0x050510,
      })

      // --- ШИРОКИЙ РАБОЧИЙ СТОЛ (как на референсе) ---
      const deskGroup = new THREE.Group()
      deskGroup.position.set(-0.15, -0.28, 0.55)
      furnitureGroup.add(deskGroup)

      const deskTop = new THREE.Mesh(
         new THREE.BoxGeometry(1.4, 0.04, 0.6),
         deskMaterial
      )
      deskTop.position.set(0, 0, 0)
      deskTop.castShadow = true
      deskTop.receiveShadow = true
      deskGroup.add(deskTop)

      const deskLegL = new THREE.Mesh(
         new THREE.BoxGeometry(0.05, 0.75, 0.5),
         deskMaterial
      )
      deskLegL.position.set(-0.65, -0.375, 0)
      deskLegL.castShadow = true
      deskGroup.add(deskLegL)

      const deskLegR = new THREE.Mesh(
         new THREE.BoxGeometry(0.05, 0.75, 0.5),
         deskMaterial
      )
      deskLegR.position.set(0.65, -0.375, 0)
      deskLegR.castShadow = true
      deskGroup.add(deskLegR)

      // --- БОЛЬШОЙ ДЕСКТОПНЫЙ МОНИТОР ---
      const monitorGroup = new THREE.Group()
      monitorGroup.position.set(0.1, 0.04, 0.1)
      // Разворачиваем монитор экраном к персонажу (на 180 градусов)
      monitorGroup.rotation.y = Math.PI - 0.1 // Немного повернут к центру
      deskGroup.add(monitorGroup)

      const monitorBase = new THREE.Mesh(
         new THREE.BoxGeometry(0.25, 0.02, 0.2),
         metalMaterial
      )
      monitorBase.position.set(0, 0, -0.05)
      monitorBase.castShadow = true
      monitorGroup.add(monitorBase)

      const monitorStand = new THREE.Mesh(
         new THREE.BoxGeometry(0.04, 0.25, 0.04),
         metalMaterial
      )
      monitorStand.position.set(0, 0.125, -0.05)
      monitorStand.castShadow = true
      monitorGroup.add(monitorStand)

      const monitorScreen = new THREE.Mesh(
         new THREE.BoxGeometry(0.65, 0.4, 0.02),
         screenFrameMaterial
      )
      monitorScreen.position.set(0, 0.3, 0)
      monitorScreen.rotation.x = -0.05
      monitorScreen.castShadow = true
      monitorGroup.add(monitorScreen)

      const screenGlass = new THREE.Mesh(
         new THREE.PlaneGeometry(0.61, 0.36),
         screenMaterial
      )
      screenGlass.position.set(0, 0, 0.011)
      monitorScreen.add(screenGlass)

      // --- МИНИМАЛИСТИЧНАЯ КЛАВИАТУРА ---
      const keyboardMaterial = new THREE.MeshStandardMaterial({
         color: 0x8a2be2,
         emissive: 0x8a2be2,
         emissiveIntensity: 0.3,
      })
      const keyboard = new THREE.Mesh(
         new THREE.BoxGeometry(0.45, 0.015, 0.14),
         keyboardMaterial
      )
      // Ставим ближе к краю стола со стороны персонажа
      keyboard.position.set(0.15, 0.027, -0.15)
      // Наклон клавишами к персонажу
      keyboard.rotation.x = -0.05
      keyboard.castShadow = true
      deskGroup.add(keyboard)

      // --- СТИЛЬНОЕ ИГРОВОЕ КРЕСЛО ---
      const chairGroup = new THREE.Group()
      chairGroup.position.set(0, -0.4, 0)
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
         '/my-vizitka/Sa1Ko.vrm',
         (gltf) => {
            vrm = gltf.userData.vrm as VRM

            // Мгновенно инициализируем кости в нужную позицию, чтобы убрать скачок из T-pose
            const h = vrm.humanoid
            if (h) {
               const setRot = (name: VRMHumanBoneName, x: number, y: number, z: number) => {
                  const bone = h.getNormalizedBoneNode(name)
                  if (bone) bone.rotation.set(x, y, z)
               }
               const isAbout = mode === 'about'
               setRot(VRMHumanBoneName.LeftUpperArm, isAbout ? -0.5 : 0.05, isAbout ? -0.3 : 0, isAbout ? -1.2 : -1.25)
               setRot(VRMHumanBoneName.RightUpperArm, isAbout ? -0.5 : 0.05, isAbout ? 0.3 : 0, isAbout ? 1.2 : 1.25)
               setRot(VRMHumanBoneName.LeftLowerArm, isAbout ? -0.8 : -0.15, 0, 0)
               setRot(VRMHumanBoneName.RightLowerArm, isAbout ? -0.8 : -0.15, 0, 0)
               setRot(VRMHumanBoneName.LeftUpperLeg, isAbout ? -1.35 : 0.05, 0, 0)
               setRot(VRMHumanBoneName.RightUpperLeg, isAbout ? -1.35 : 0.05, 0, 0)
               setRot(VRMHumanBoneName.LeftLowerLeg, isAbout ? 1.25 : -0.05, 0, 0)
               setRot(VRMHumanBoneName.RightLowerLeg, isAbout ? 1.25 : -0.05, 0, 0)
               
               const spine = h.getNormalizedBoneNode(VRMHumanBoneName.Spine)
               if (spine) spine.rotation.x = isAbout ? 0.15 : 0
               const hips = h.getNormalizedBoneNode(VRMHumanBoneName.Hips)
               if (hips) hips.position.y = isAbout ? -0.38 : 0
            }

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
            if (onLoad) onLoad()
         },
         (xhr) => {
            if (xhr.total > 0) {
               setProgress(Math.min(100, Math.round((xhr.loaded / xhr.total) * 100)))
            }
         },
         (err) => {
            console.error('VRM load error:', err)
            setError('Не удалось загрузить Sa1Ko.vrm')
            setLoading(false)
            if (onLoad) onLoad()
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

      // Скроллинг больше не отслеживаем, так как используются статические режимы (hero/about)

      // ── 9. РЕСАЙЗ ──
      const onResize = () => {
         if (!container) return
         const w = container.clientWidth
         const h = container.clientHeight
         camera.aspect = w / h
         
         // Увеличиваем FOV на узких экранах, чтобы модель не обрезалась
         if (camera.aspect < 1) {
            camera.fov = 32 + (1 - camera.aspect) * 35
         } else {
            camera.fov = 32
         }
         
         camera.updateProjectionMatrix()
         renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)
      onResize() // Инициализируем камеру правильным fov сразу

      // ── 10. ЦИКЛ АНИМАЦИИ ──
      let rafId: number
      let lastTime = performance.now()

      let targetPosX = 0
      let targetPosY = 0.15
      let targetPosZ = 0
      let targetBaseRotY = 0
      let targetFurnitureScale = 0

      // Камера: стартовые и конечные позиции (zoom-out эффект)
      const camStartPos = new THREE.Vector3(0, 1.15, 1.8)
      const camEndPos = new THREE.Vector3(
         0,
         mode === 'about' ? 1.1 : 1.15,
         mode === 'about' ? 3.0 : 1.8
      )
      const camStartLook = new THREE.Vector3(0, 0.7, 0)
      const camEndLook = new THREE.Vector3(0, mode === 'about' ? 0.3 : 0.7, 0)

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
         // ── КАМЕРА ──
         camera.position.copy(mode === 'about' ? camEndPos : camStartPos)
         camera.lookAt(mode === 'about' ? camEndLook : camStartLook)

         // Hero: по центру, стоит
         // About: правее, выше, сидит
         targetPosX = mode === 'about' ? 0.4 : 0
         targetPosY = mode === 'about' ? 0.75 : 0.15
         targetPosZ = 0
         targetBaseRotY = mode === 'about' ? -0.7 : 0

         targetFurnitureScale = mode === 'about' ? 1 : 0

         const isAbout = mode === 'about'
         const sitBlend = mode === 'about' ? 1 : 0

         targetBones.leftUpperArmZ = isAbout ? -1.2 : -1.25
         targetBones.rightUpperArmZ = isAbout ? 1.2 : 1.25
         targetBones.leftUpperArmX = isAbout ? -0.5 : 0.05
         targetBones.rightUpperArmX = isAbout ? -0.5 : 0.05
         targetBones.leftUpperArmY = isAbout ? -0.3 : 0
         targetBones.rightUpperArmY = isAbout ? 0.3 : 0

         targetBones.leftLowerArmX = isAbout ? -0.8 : -0.15
         targetBones.rightLowerArmX = isAbout ? -0.8 : -0.15
         targetBones.leftLowerArmY = 0
         targetBones.rightLowerArmY = 0
         targetBones.leftLowerArmZ = 0
         targetBones.rightLowerArmZ = 0

         targetBones.leftUpperLegX = isAbout ? -1.35 : 0.05
         targetBones.rightUpperLegX = isAbout ? -1.35 : 0.05
         targetBones.leftLowerLegX = isAbout ? 1.25 : -0.05
         targetBones.rightLowerLegX = isAbout ? 1.25 : -0.05

         targetBones.spineX = isAbout ? 0.15 : 0
         targetBones.hipsY = isAbout ? -0.38 : 0

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

               if (mode === 'about') {
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

               if (mode === 'about') {
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
            position: 'absolute',
            top: 0,
            left: mode === 'hero' ? '-50%' : 0,
            width: mode === 'hero' ? '200%' : '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10,
         }}
      >
         <style>
            {`
               @keyframes smokeReveal {
                  0% {
                     opacity: 0;
                     filter: blur(25px) brightness(1.5) contrast(0.8);
                     transform: scale(0.95) translateY(30px);
                  }
                  100% {
                     opacity: 1;
                     filter: blur(0px) brightness(1) contrast(1);
                     transform: scale(1) translateY(0);
                  }
               }
               .smoke-reveal-active {
                  animation: smokeReveal 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
               }
            `}
         </style>
         <div
            ref={containerRef}
            className={!loading ? 'smoke-reveal-active' : ''}
            style={{
               width: '100%',
               height: '100%',
               position: 'absolute',
               inset: 0,
               opacity: loading ? 0 : 1,
            }}
         />

         {loading && !error && (
            <div
               style={{
                  position: mode === 'hero' ? 'fixed' : 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 9999,
                  background: 'rgba(9, 7, 16, 0.95)',
                  backdropFilter: 'blur(20px)',
                  pointerEvents: 'all',
               }}
            >
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     gap: '2.5rem',
                  }}
               >
                  {/* Готическая статичная пентаграмма загрузки */}
                  <svg width="250" height="250" viewBox="0 0 100 100" fill="none" style={{ filter: 'drop-shadow(0 0 10px rgba(177,0,232,0.4))' }}>
                     {/* Внешние статичные круги */}
                     <circle cx="50" cy="50" r="48" stroke="rgba(123, 44, 191, 0.3)" strokeWidth="1" />
                     <circle cx="50" cy="50" r="42" stroke="rgba(123, 44, 191, 0.2)" strokeWidth="1" strokeDasharray="2 4" />
                     
                     {/* Пентаграмма на фоне */}
                     <polygon 
                        points="50,10 73.5,82.3 12,37.7 88,37.7 26.5,82.3" 
                        fill="none" 
                        stroke="rgba(177, 0, 232, 0.2)" 
                        strokeWidth="1" 
                     />
                     
                     {/* Заполнение пентаграммы по прогрессу */}
                     <polygon 
                        points="50,10 73.5,82.3 12,37.7 88,37.7 26.5,82.3" 
                        fill="rgba(177, 0, 232, 0.05)" 
                        stroke="#b100e8" 
                        strokeWidth="1.5"
                        strokeDasharray="380" // Периметр пентаграммы (5 * ~76)
                        strokeDashoffset={380 - (380 * progress) / 100}
                        style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
                     />
                     
                     {/* Внутренний круг в центре пентаграммы */}
                     <circle 
                        cx="50" 
                        cy="50" 
                        r="12" 
                        fill={progress >= 99 ? "rgba(177, 0, 232, 0.4)" : "transparent"} 
                        stroke="#b100e8" 
                        strokeWidth="1" 
                        style={{ transition: 'fill 0.3s ease' }}
                     />
                     
                     {/* Текст процента внутри */}
                     <text 
                        x="50" 
                        y="54" 
                        textAnchor="middle" 
                        fill="#fff" 
                        fontSize="12" 
                        fontWeight="bold"
                        letterSpacing="1"
                     >
                        {progress}
                     </text>
                  </svg>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                     <span
                        style={{
                           fontWeight: 600,
                           color: 'rgba(255,255,255,0.9)',
                           letterSpacing: '8px',
                           fontSize: '1.2rem',
                           textTransform: 'uppercase',
                           textShadow: '0 0 15px rgba(177, 0, 232, 0.6)'
                        }}
                     >
                        Awakening Avatar
                     </span>
                     
                     {/* Статичная полоса прогресса, заполняется от центра */}
                     <div 
                        style={{ 
                           width: '280px', 
                           height: '3px', 
                           background: 'rgba(255,255,255,0.1)', 
                           marginTop: '0.5rem',
                           position: 'relative',
                           borderRadius: '2px',
                           overflow: 'hidden'
                        }}
                     >
                        <div 
                           style={{ 
                              position: 'absolute', 
                              left: '50%', 
                              top: 0, 
                              height: '100%', 
                              width: `${progress}%`, 
                              background: '#b100e8', 
                              transform: 'translateX(-50%)',
                              boxShadow: '0 0 15px #b100e8',
                              transition: 'width 0.2s ease-out'
                           }} 
                        />
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
