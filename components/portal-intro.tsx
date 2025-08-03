"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PortalIntroProps {
  onComplete: () => void
  onBackgroundReady: () => void
  onNavbarReady: () => void
}

export default function PortalIntro({ onComplete, onBackgroundReady, onNavbarReady }: PortalIntroProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [showTransition, setShowTransition] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState(0) // 0: video, 1: fading, 2: complete
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Auto play the video
    video.play().catch(console.error)

    const handleTimeUpdate = () => {
      // Stop at 12 seconds and start layered transition
      if (video.currentTime >= 11) {
        video.pause()
        setTransitionPhase(1)
        setShowTransition(true)
        
        // Phase 1: Start background fade-in (500ms delay)
        setTimeout(() => {
          onBackgroundReady()
        }, 500)
        
        // Phase 2: Show navbar (1500ms delay)
        setTimeout(() => {
          onNavbarReady()
        }, 1500)
        
        // Phase 3: Complete transition (2500ms delay)
        setTimeout(() => {
          setTransitionPhase(2)
          setIsPlaying(false)
          setTimeout(onComplete, 800)
        }, 2500)
      }
    }

    const handleEnded = () => {
      // Fallback if video ends naturally
      setTransitionPhase(1)
      setShowTransition(true)
      setTimeout(() => {
        onBackgroundReady()
        setTimeout(() => {
          onNavbarReady()
          setTimeout(() => {
            setTransitionPhase(2)
            setIsPlaying(false)
            setTimeout(onComplete, 800)
          }, 1000)
        }, 1000)
      }, 500)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onComplete, onBackgroundReady, onNavbarReady])

  const handleSkip = () => {
    setTransitionPhase(1)
    setShowTransition(true)
    onBackgroundReady()
    setTimeout(() => {
      onNavbarReady()
      setTimeout(() => {
        setTransitionPhase(2)
        setIsPlaying(false)
        setTimeout(onComplete, 300)
      }, 500)
    }, 500)
  }

  if (!isPlaying && !showTransition) return null

  return (
    <AnimatePresence>
      {(isPlaying || showTransition) && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Portal Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          >
            <source src="/hd.mp4" type="video/mp4" />
          </video>

          {/* Skip Button */}
          <motion.button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip Intro
          </motion.button>

          {/* Loading indicator for video */}
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            Entering the CUBE dimension...
          </motion.div>

          {/* Transition overlay with phases */}
          <AnimatePresence>
            {showTransition && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: transitionPhase >= 1 ? 1 : 0, 
                  scale: transitionPhase >= 1 ? 1 : 0.8 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: transitionPhase >= 1 ? 1 : 0, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                  >
                    <motion.h2 
                      className="text-3xl md:text-5xl font-bold text-white mb-4 font-mono"
                      animate={{ 
                        opacity: transitionPhase >= 2 ? 0 : 1,
                        y: transitionPhase >= 2 ? -30 : 0 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      Entering the dimension...
                    </motion.h2>
                    <motion.h1 
                      className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-mono"
                      animate={{ 
                        opacity: transitionPhase >= 2 ? 0 : 1,
                        scale: transitionPhase >= 2 ? 1.2 : 1,
                        y: transitionPhase >= 2 ? -50 : 0 
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      CUBE VIT
                    </motion.h1>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particle effects during transition */}
          {showTransition && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 200],
                    y: [0, (Math.random() - 0.5) * 200],
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
