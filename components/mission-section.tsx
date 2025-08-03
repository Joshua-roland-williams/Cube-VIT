"use client"

import { motion } from "framer-motion"

export default function MissionSection() {
  return (
    <section className="py-20 px-6" id="mission">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl p-12 backdrop-blur-sm border border-cyan-400/20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-mono">
            OUR MISSION
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8" />
          <p className="text-xl text-gray-300 leading-relaxed">
            To create a comprehensive platform for cubers to learn, grow, and compete. We provide innovative tools,
            organize exciting events, and foster a community where passion meets technology. Our mission is to make
            cubing accessible to everyone while pushing the boundaries of what's possible in the cubing world through
            advanced algorithms, AI-powered training, and immersive experiences.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
