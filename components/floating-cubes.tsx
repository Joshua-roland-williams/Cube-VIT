"use client"

import { useEffect } from "react"

export default function FloatingCubes() {
  useEffect(() => {
    const createFloatingCubes = () => {
      const container = document.getElementById("floating-cubes-container")
      if (!container) return

      const cubeCount = 15

      for (let i = 0; i < cubeCount; i++) {
        const cube = document.createElement("div")
        cube.className = "floating-cube"
        cube.style.cssText = `
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #FFD600, #ff9ff3, #54a0ff);
          border-radius: 8px;
          opacity: 0.1;
          left: ${Math.random() * 100}%;
          animation: float-and-rotate ${Math.random() * 10 + 15}s infinite linear;
          animation-delay: ${Math.random() * 20}s;
          transform-style: preserve-3d;
        `

        const innerCube = document.createElement("div")
        innerCube.style.cssText = `
          position: absolute;
          top: -5px;
          left: -5px;
          width: 20px;
          height: 20px;
          background: #fdcb6e;
          border-radius: 4px;
          opacity: 0.7;
          animation: pulse 3s ease-in-out infinite alternate;
        `

        cube.appendChild(innerCube)
        container.appendChild(cube)
      }
    }

    const style = document.createElement("style")
    style.textContent = `
      @keyframes float-and-rotate {
        0% {
          transform: translateY(100vh) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.3;
        }
        90% {
          opacity: 0.1;
        }
        100% {
          transform: translateY(-100vh) rotateX(360deg) rotateY(360deg) rotateZ(360deg);
          opacity: 0;
        }
      }

      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.3; }
        100% { transform: scale(1.5); opacity: 0.8; }
      }
    `
    document.head.appendChild(style)

    createFloatingCubes()

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return <div id="floating-cubes-container" className="fixed inset-0 z-0 overflow-hidden pointer-events-none" />
}
