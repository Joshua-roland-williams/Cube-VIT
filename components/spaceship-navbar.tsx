"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Eye, Target, Users, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Vision", icon: Eye, href: "#vision" },
  { name: "Mission", icon: Target, href: "#mission" },
  { name: "Team", icon: Users, href: "/team" },
  { name: "Events", icon: Calendar, href: "/events" },
  { name: "Contact", icon: MessageSquare, href: "#contact" },
]

export default function SpaceshipNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-gray-900/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      {/* Control Panel Frame */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/10 to-purple-500/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mission Control Logo - Simplified */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white tracking-wider font-mono">CUBE VIT</h1>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-cyan-400 tracking-widest font-mono">SYSTEM ONLINE</span>
                </div>
              </div>
              <div className="sm:hidden">
                <h1 className="text-xl font-bold text-white tracking-wider font-mono">CUBE VIT</h1>
              </div>
            </motion.div>

            {/* Enhanced Control Panel Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <Link href={item.href}>
                    {/* Control Panel Button */}
                    <div className="relative px-4 py-3 rounded-lg bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-cyan-400/30 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/80 group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:to-blue-500/20">
                      {/* Inner control elements */}
                      <div className="absolute top-1 right-1 w-2 h-2 bg-green-400/60 rounded-full group-hover:bg-green-400 group-hover:animate-pulse transition-all duration-300" />
                      <div className="absolute bottom-1 left-1 w-1 h-1 bg-blue-400/60 rounded-full group-hover:bg-blue-400 transition-all duration-300" />

                      {/* Button content */}
                      <div className="relative flex items-center space-x-2">
                        <item.icon className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                        <span className="text-gray-300 group-hover:text-white font-medium tracking-wide transition-colors text-sm font-mono">
                          {item.name}
                        </span>
                      </div>

                      {/* Scanning line effect */}
                      <div className="absolute inset-0 rounded-lg overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/30 transition-all duration-700 transform -skew-x-12 animate-pulse" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Control Interface */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-3 rounded-lg bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-cyan-400/30 backdrop-blur-sm"
            >
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-cyan-400 relative z-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-cyan-400 relative z-10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Command Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-cyan-400/20"
          >
            <div className="container mx-auto px-6 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center relative">
                      <item.icon className="w-4 h-4 text-cyan-400" />
                      <div className="absolute top-0 right-0 w-2 h-2 bg-green-400/60 rounded-full" />
                    </div>
                    <span className="text-white font-medium font-mono">{item.name}</span>
                    <div className="ml-auto w-2 h-2 bg-cyan-400/60 rounded-full" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
