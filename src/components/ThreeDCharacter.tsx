'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export default function ThreeDCharacter() {
   const containerRef = useRef<HTMLDivElement | null>(null)
   const [progress, setProgress] = useState<number>(0)
   const [loading, setLoading] = useState<boolean>(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      if (!containerRef.current) return

      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // ── 1. Renderer Setup (Hollywood Cinematic Quality) ──
      const renderer = new THREE.WebGLRenderer({
         alpha: true,
         antialias: true,
         powerPreference: 'high-performance',
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.25

      while (container.firstChild) container.removeChild(container.firstChild)
      container.appendChild(renderer.domElement)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.domElement.style.display = 'block'

      // ── 2. Scene & Camera ──
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      camera.position.set(0, 0.5, 6.5)

      // ── 3. PBR Studio Environment (Realistic Reflections) ──
      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      scene.environment = pmremGenerator.fromScene(
         new RoomEnvironment(),
         0.04
      ).texture

      // ── 4. Cinematic Lighting ──
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0)
      keyLight.position.set(5, 5, 5)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 2048
      keyLight.shadow.mapSize.height = 2048
      keyLight.shadow.camera.near = 0.5
      keyLight.shadow.camera.far = 25
      keyLight.shadow.bias = -0.0001
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0x9d4edd, 1.5) // Purple rim light
      fillLight.position.set(-5, 3, -2)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0x00e676, 1.2) // Emerald rim light
      rimLight.position.set(0, -3, 3)
      scene.add(rimLight)

      // ── 5. Master Model Group ──
      const modelGroup = new THREE.Group()
      scene.add(modelGroup)

      // Sub-group for tilt & levitation
      const interactiveGroup = new THREE.Group()
      modelGroup.add(interactiveGroup)

      // ── 6. Load Model with Auto-Fit & Scaling ──
      let mixer: THREE.AnimationMixer | null = null

      const gltfLoader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath(
         'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
      )
      gltfLoader.setDRACOLoader(dracoLoader)

      gltfLoader.load(
         '/my-vizitka/cnogami.glb',
         (gltf) => {
            const model = gltf.scene

            // Auto-center and perfectly scale any arbitrary model
            const box = new THREE.Box3().setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())

            const maxDim = Math.max(size.x, size.y, size.z)
            const targetSize = 4.0 // Fit perfectly into camera view
            const scale = targetSize / maxDim
            model.scale.setScalar(scale)

            // Center model at origin inside a wrapper group for perfect rotation
            const meshWrapper = new THREE.Group()
            meshWrapper.add(model)
            model.position.set(
               -center.x * scale,
               -center.y * scale,
               -center.z * scale
            )

            // Поворачиваем модель на 90 градусов (Math.PI / 2), чтобы она смотрела лицом на камеру
            // (Если вдруг она повернется спиной, просто поменяйте на -Math.PI / 2)
            meshWrapper.rotation.y = -Math.PI / 2

            // Enable shadows and enhance materials
            model.traverse((child) => {
               if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh
                  mesh.castShadow = true
                  mesh.receiveShadow = true
                  if (mesh.material) {
                     // Fix potential transparency/depth issues in glb
                     ;(mesh.material as THREE.Material).depthWrite = true
                  }
               }
            })

            interactiveGroup.add(meshWrapper)

            // Setup built-in animations if present
            if (gltf.animations && gltf.animations.length > 0) {
               mixer = new THREE.AnimationMixer(model)
               const action = mixer.clipAction(gltf.animations[0])
               action.play()
            }

            setLoading(false)
         },
         (xhr) => {
            if (xhr.total > 0) {
               const percent = Math.round((xhr.loaded / xhr.total) * 100)
               setProgress(percent)
            }
         },
         (err) => {
            console.error('Error loading cnogami.glb:', err)
            setError(
               'Не удалось загрузить cnogami.glb. Проверьте, что файл находится в папке public/'
            )
            setLoading(false)
         }
      )

      // ── 7. Mouse Tracking Setup ──
      let targetRotX = 0
      let targetRotY = 0

      const handleMouseMove = (e: MouseEvent) => {
         // Normalizing between -1 and 1
         targetRotY = (e.clientX / window.innerWidth - 0.5) * 1.0
         targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.5
      }
      window.addEventListener('mousemove', handleMouseMove)

      // ── 8. Resize Logic ──
      const handleResize = () => {
         if (!container) return
         const w = container.clientWidth
         const h = container.clientHeight
         camera.aspect = w / h
         camera.updateProjectionMatrix()
         renderer.setSize(w, h)
      }
      window.addEventListener('resize', handleResize)

      // ── 9. Animation Loop ──
      let frameId: number
      const clock = new THREE.Clock()

      const animate = () => {
         frameId = requestAnimationFrame(animate)
         const delta = clock.getDelta()
         const time = clock.getElapsedTime()

         // Update GLTF animations
         if (mixer) mixer.update(delta)

         // Smooth mouse tilt (lerp)
         interactiveGroup.rotation.y +=
            (targetRotY - interactiveGroup.rotation.y) * 0.05
         interactiveGroup.rotation.x +=
            (targetRotX - interactiveGroup.rotation.x) * 0.05

         // Subtle levitation / breathing effect
         modelGroup.position.y = Math.sin(time * 2.0) * 0.08

         renderer.render(scene, camera)
      }
      animate()

      // ── 10. Cleanup ──
      return () => {
         window.removeEventListener('mousemove', handleMouseMove)
         window.removeEventListener('resize', handleResize)
         cancelAnimationFrame(frameId)
         pmremGenerator.dispose()
         renderer.dispose()
         if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
         }
      }
   }, [])

   return (
      <div
         style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         }}
      >
         {/* ── THREE.JS CANVAS CONTAINER (Isolated from React DOM) ── */}
         <div
            ref={containerRef}
            style={{
               width: '100%',
               height: '100%',
               position: 'absolute',
               inset: 0,
            }}
         />

         {/* ── LOADING SPINNER UI ── */}
         {loading && (
            <div
               style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'rgba(12,9,22,0.85)',
                  padding: '2rem 3rem',
                  borderRadius: '24px',
                  border: '1px solid rgba(157,78,221,0.3)',
                  boxShadow: '0 0 30px rgba(157,78,221,0.2)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10,
               }}
            >
               <div
                  style={{
                     width: '48px',
                     height: '48px',
                     borderRadius: '50%',
                     border: '3px solid rgba(255,255,255,0.1)',
                     borderTopColor: 'var(--purple-bright)',
                     borderBottomColor: 'var(--emerald)',
                     animation: 'spinRing 1s linear infinite',
                  }}
               />
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     gap: '0.2rem',
                  }}
               >
                  <span
                     style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '2px',
                     }}
                  >
                     LOADING 3D ASSET
                  </span>
                  <span
                     style={{
                        fontSize: '0.85rem',
                        color: 'var(--purple-bright)',
                        fontWeight: 700,
                     }}
                  >
                     {progress}%
                  </span>
               </div>
            </div>
         )}

         {/* ── ERROR STATE UI ── */}
         {error && (
            <div
               style={{
                  position: 'absolute',
                  background: 'rgba(255,0,50,0.15)',
                  border: '1px solid rgba(255,0,50,0.4)',
                  padding: '1.5rem 2rem',
                  borderRadius: '20px',
                  color: '#ffffff',
                  maxWidth: '400px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10,
               }}
            >
               <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                  ⚠️ Ошибка загрузки 3D
               </p>
               <p
                  style={{
                     fontSize: '0.85rem',
                     color: 'rgba(255,255,255,0.7)',
                  }}
               >
                  {error}
               </p>
            </div>
         )}
      </div>
   )
}
