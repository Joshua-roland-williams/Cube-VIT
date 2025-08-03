"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import SpaceshipNavbar from "@/components/spaceship-navbar"
import HeroSection from "@/components/hero-section"
import VisionSection from "@/components/vision-section"
import MissionSection from "@/components/mission-section"
import InsightsSection from "@/components/insights-section"
import ContactSection from "@/components/contact-section"
import FloatingCubes from "@/components/floating-cubes"
import PortalIntro from "@/components/portal-intro"

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('portal-intro-seen')
    if (!hasSeenIntro) {
      setShowIntro(true)
    } else {
      // For returning visitors, show everything immediately
      setShowBackground(true)
      setShowNavbar(true)
      setIntroComplete(true)
    }
  }, [])

  const handleBackgroundReady = () => {
    setShowBackground(true)
  }

  const handleNavbarReady = () => {
    setShowNavbar(true)
  }

  const handleIntroComplete = () => {
    localStorage.setItem('portal-intro-seen', 'true')
    setShowIntro(false)
    setIntroComplete(true)
  }
  return (
    <>
      {/* Portal Intro for first-time visitors */}
      {showIntro && (
        <PortalIntro 
          onComplete={handleIntroComplete}
          onBackgroundReady={handleBackgroundReady}
          onNavbarReady={handleNavbarReady}
        />
      )}
      
      {/* Main content with progressive reveal */}
      {(introComplete || showBackground) && (
        <div className="relative min-h-screen bg-[#0a0f2c] overflow-hidden">
          <FloatingCubes />

          {/* Spaceship Window Frame Overlay */}
          <div className="fixed inset-0 z-10 pointer-events-none">
            <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-xl" />
            <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-cyan-400/40 rounded-tr-xl" />
            <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-cyan-400/40 rounded-bl-xl" />
            <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-cyan-400/40 rounded-br-xl" />
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900/30 to-transparent" />
          </div>

          <div className="relative z-20">
            {/* Progressive reveal of navbar */}
            {(introComplete || showNavbar) && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <SpaceshipNavbar />
              </motion.div>
            )}
            
            {/* Progressive reveal of hero section */}
            {(introComplete || showNavbar) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              >
                <HeroSection delayed={!introComplete} />
              </motion.div>
            )}
            
            {/* Other sections appear after hero */}
            {introComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <VisionSection />
                <MissionSection />
                <InsightsSection />
                <ContactSection />
              </motion.div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
