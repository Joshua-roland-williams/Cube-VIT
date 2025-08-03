"use client"

import { motion } from "framer-motion"

const contactItems = [
  {
    icon: "🌐",
    title: "LinkedIn",
    info: "The Cubing Club VIT",
    link: "https://www.linkedin.com/company/the-cubing-club-vit-vellore",
  },
  { icon: "📱", title: "Instagram", info: "@cube_vit", link: "https://instagram.com/cube_vit" },
  { icon: "📧", title: "Email", info: "cubevit@vit.ac.in", link: "mailto:cubevit@vit.ac.in" },
  { icon: "📍", title: "Location", info: "VIT Vellore, Tamil Nadu, India", link: null },
]

export default function ContactSection() {
  return (
    <section className="py-20 px-6" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-mono">
            GET IN TOUCH
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">{item.title}</h3>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {item.info}
                </a>
              ) : (
                <p className="text-gray-300">{item.info}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
