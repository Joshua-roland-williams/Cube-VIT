"use client"

import { motion } from "framer-motion"

interface HeroSectionProps {
  delayed?: boolean
}

export default function HeroSection({ delayed = false }: HeroSectionProps) {
  const baseDelay = delayed ? 1.5 : 0

  return (
    <section className="relative min-h-screen flex items-center justify-center" id="home">
      {/* Shader Background with entrance animation */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: baseDelay, ease: "easeOut" }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.shadertoy.com/embed/W3fXz8?gui=false&t=10&paused=false&muted=true&autoplay=1"
          frameBorder="0"
          allowFullScreen
          className="w-full h-full object-cover pointer-events-none scale-110"
          style={{
            filter: 'brightness(0.8)',
            transform: 'scale(1.1)',
          }}
        />
        {/* Complete overlay to block all iframe interactions */}
        <div className="absolute inset-0 z-10 pointer-events-auto bg-transparent">
        </div>
        {/* Bottom gradient to hide controls */}
        <div className="absolute inset-0 pointer-events-none z-20" 
             style={{
               background: 'linear-gradient(transparent 85%, rgba(0,0,0,0.8) 95%, rgba(0,0,0,1) 100%)'
             }}>
        </div>
      </motion.div>

      {/* Content with staggered animations */}
      <div className="relative z-30 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: baseDelay + 0.8,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="text-6xl md:text-8xl font-black mb-6 font-mono"
          style={{
            background:
              "linear-gradient(135deg, #ff0080 0%, #7928ca 20%, #0070f3 40%, #00dfd8 60%, #ff4081 80%, #ffd700 100%)",
            backgroundSize: "600% 600%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientMove 5s ease-in-out infinite, glow 2s ease-in-out infinite alternate",
          }}
        >
          WELCOME TO CUBE VIT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: baseDelay + 1.3,
            ease: "easeOut"
          }}
          className="text-2xl md:text-4xl font-bold mb-8 text-white font-mono tracking-wider"
          style={{
            textShadow: "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)",
            animation: "neonPulse 3s ease-in-out infinite",
          }}
        >
          Just CUBE it Macha!!
        </motion.p>

        <motion.a
          initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ 
            duration: 1, 
            delay: baseDelay + 1.8,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          href="#vision"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-mono tracking-wide"
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)",
            rotate: [0, -2, 2, 0]
          }}
          whileTap={{ scale: 0.95 }}
        >
          EXPLORE OUR WORLD
        </motion.a>
      </div>

      <style jsx>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        @keyframes glow {
          0% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)); }
          100% { filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.6)); }
        }

        @keyframes neonPulse {
          0%, 100% { 
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3);
            opacity: 0.95;
          }
          50% { 
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(0, 255, 255, 0.6);
            opacity: 1;
          }
        }

        /* Hide Shadertoy UI elements */
        iframe {
          pointer-events: none !important;
        }
        
        /* Hide any tooltips or overlays from Shadertoy */
        iframe:hover {
          cursor: default !important;
        }
        
        /* Additional protection against any visible UI */
        iframe::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(transparent, rgba(0,0,0,0.9));
          pointer-events: none;
        }

        /* Ensure no selection or interaction */
        section {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      `}</style>
    </section>
  )
}
