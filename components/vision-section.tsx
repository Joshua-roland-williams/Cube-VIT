"use client"

import { motion } from "framer-motion"

export default function VisionSection() {
  return (
    <section className="py-20 px-6" id="vision">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl p-12 backdrop-blur-sm border border-cyan-400/20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
            OUR VISION
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8" />
          <p className="text-xl text-gray-300 leading-relaxed">
            To revolutionize cubing through technology and community. We envision a world where every cuber, from
            beginner to speedcuber, has access to cutting-edge tools, supportive community, and endless opportunities to
            grow. Our vision extends beyond just solving cubes – we're building a space-age platform that connects
            minds, challenges limits, and celebrates the art of cubing.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
