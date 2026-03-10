import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WireframeSphere() {
  const meshRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // Create wireframe geometry
  const geometry = useMemo(() => {
    const sphereGeometry = new THREE.SphereGeometry(1.8, 24, 24)
    const wireframe = new THREE.WireframeGeometry(sphereGeometry)
    return wireframe
  }, [])

  // Animate rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main wireframe sphere */}
      <lineSegments ref={linesRef} geometry={geometry}>
        <lineBasicMaterial 
          color="#c4b5fd" 
          transparent 
          opacity={0.4}
          linewidth={1}
        />
      </lineSegments>
      
      {/* Inner sphere for depth */}
      <mesh>
        <sphereGeometry args={[1.78, 32, 32]} />
        <meshBasicMaterial 
          color="#ddd6fe" 
          transparent 
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.15} />
      </mesh>
      
      {/* Horizontal ring */}
      <mesh>
        <torusGeometry args={[2.0, 0.015, 16, 100]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

export default function Globe() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <WireframeSphere />
      </Canvas>
    </div>
  )
}
