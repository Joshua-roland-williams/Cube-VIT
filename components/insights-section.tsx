"use client"

import { motion } from "framer-motion"

const insights = [
  {
    quote: "CUBE VIT transformed my cubing journey completely. The community here is incredible!",
    author: "Arjun, 3rd Year CSE",
  },
  {
    quote: "The events and competitions organized by CUBE VIT are world-class. Amazing experience!",
    author: "Priya, 2nd Year ECE",
  },
  {
    quote: "From a beginner to sub-20 solver, CUBE VIT guided me every step of the way.",
    author: "Rishi, 4th Year MECH",
  },
  {
    quote: "The Aurora Solve platform is revolutionary. It's like having a personal cubing coach!",
    author: "Zara, 1st Year IT",
  },
  {
    quote: "CUBE VIT isn't just a club, it's a family of passionate cubers pushing boundaries.",
    author: "Karthik, Alumni",
  },
  { quote: "The space-themed approach makes cubing feel futuristic and exciting!", author: "Meera, 3rd Year BT" },
]

export default function InsightsSection() {
  return (
    <section className="py-20 px-6" id="insights">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
            COMMUNITY INSIGHTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300"
            >
              <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-4" />
              <p className="text-gray-300 text-lg italic mb-4 leading-relaxed">"{insight.quote}"</p>
              <p className="text-cyan-400 font-semibold">- {insight.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
