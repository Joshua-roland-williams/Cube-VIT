"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import * as THREE from "three"

const NebulaShaderMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color("#1e40af"),
    color2: new THREE.Color("#7c3aed"),
    color3: new THREE.Color("#0891b2"),
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    float noise(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 54.53))) * 43758.5453);
    }
    
    void main() {
      vec3 pos = vPosition * 0.1 + time * 0.1;
      
      float n1 = noise(pos);
      float n2 = noise(pos * 2.0 + time * 0.2);
      float n3 = noise(pos * 4.0 + time * 0.3);
      
      float pattern = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
      
      vec3 color = mix(color1, color2, pattern);
      color = mix(color, color3, sin(time + pattern * 10.0) * 0.5 + 0.5);
      
      float alpha = pattern * 0.3;
      
      gl_FragColor = vec4(color, alpha);
    }
  `,
)

extend({ NebulaShaderMaterial })

export default function SpaceEnvironment() {
  const nebulaRef = useRef<any>(null)

  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.time = state.clock.elapsedTime
    }
  })

  return (
    <>
      {/* Nebula Background */}
      <Sphere args={[50, 32, 32]} position={[0, 0, -30]}>
        <nebulaShaderMaterial ref={nebulaRef} transparent side={THREE.BackSide} />
      </Sphere>

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} color="#4338ca" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7c3aed" />
    </>
  )
}
