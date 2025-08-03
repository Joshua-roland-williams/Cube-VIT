"use client"

import { motion } from "framer-motion"
import SpaceshipNavbar from "@/components/spaceship-navbar"
import FloatingCubes from "@/components/floating-cubes"

const teamData = {
  coordinator: {
    title: "Club Coordinator",
    subtitle: "The visionary leader guiding CUBE VIT towards excellence",
    members: [
      { name: "Aarthy SL", role: "Club Coordinator", image: "/placeholder.svg?height=400&width=300&text=Aarthy+SL" },
    ],
  },
  leadership: {
    title: "Leadership",
    subtitle: "Strategic leaders driving our club's growth and innovation",
    members: [
      {
        name: "Ketan Chouhan",
        role: "Chair",
        image: "/placeholder.svg?height=400&width=300&text=Ketan+Chouhan",
        linkedin: "https://www.linkedin.com/in/ketan-chouhan-47020826b",
      },
      {
        name: "Tharun Shankar",
        role: "Vice Chair",
        image: "/placeholder.svg?height=400&width=300&text=Tharun+Shankar",
        linkedin: "https://www.linkedin.com/in/tharun-shanks-45a9a1328",
      },
    ],
  },
  secretaries: {
    title: "Secretaries",
    subtitle: "Dedicated organizers ensuring smooth operations and coordination",
    members: [
      {
        name: "Sujai Shakthivel",
        role: "Secretary",
        image: "/placeholder.svg?height=400&width=300&text=Sujai+Shakthivel",
        linkedin: "https://www.linkedin.com/in/sujai-shakthivel-729020275",
      },
      {
        name: "Shruti Sinha",
        role: "Co Secretary",
        image: "/placeholder.svg?height=400&width=300&text=Shruti+Sinha",
        linkedin: "https://www.linkedin.com/in/shruti-sinha-8a8856369",
      },
    ],
  },
  cubing: {
    title: "Head of Cubing",
    subtitle: "Expert cubers leading technical excellence and competitive spirit",
    members: [
      {
        name: "Shreyas Shetty",
        role: "Head of Cubing",
        image: "/placeholder.svg?height=400&width=300&text=Shreyas+Shetty",
      },
      {
        name: "Trivikram Sai Krovi",
        role: "Head of Cubing",
        image: "/placeholder.svg?height=400&width=300&text=Trivikram+Sai+Krovi",
      },
    ],
  },
  departments: {
    title: "Department Heads",
    subtitle: "Specialized leaders managing various aspects of our vibrant community",
    members: [
      {
        name: "Shreya Agarwal",
        role: "Design, Creativity and Editorial Head",
        image: "/placeholder.svg?height=400&width=300&text=Shreya+Agarwal",
        linkedin: "https://www.linkedin.com/in/shreya-agarwal-276bb6276",
      },
      {
        name: "Rudra Shrivastava",
        role: "Events Head",
        image: "/placeholder.svg?height=400&width=300&text=Rudra+Shrivastava",
      },
      {
        name: "Shawn SJ",
        role: "Marketing Head",
        image: "/placeholder.svg?height=400&width=300&text=Shawn+SJ",
        linkedin: "https://www.linkedin.com/in/shawn-sj-8039912aa",
      },
      {
        name: "Joshua Roland Williams",
        role: "Tech Head",
        image: "/placeholder.svg?height=400&width=300&text=Joshua+Roland+Williams",
        linkedin: "https://www.linkedin.com/in/joshuarolandwilliams",
      },
      {
        name: "Vrisha Parikh",
        role: "Outreach Head",
        image: "/placeholder.svg?height=400&width=300&text=Vrisha+Parikh",
        linkedin: "https://www.linkedin.com/in/vrisha-parikh-7241b726b",
      },
      {
        name: "Ishaan Mishra",
        role: "Finance Head",
        image: "/placeholder.svg?height=400&width=300&text=Ishaan+Mishra",
        linkedin: "https://www.linkedin.com/in/ishaan-mishra-93646b275",
      },
    ],
  },
}

function TeamMember({ member, index, sectionType }: { member: any; index: number; sectionType: string }) {
  const getRoleColor = (sectionType: string) => {
    switch (sectionType) {
      case "coordinator":
        return "from-yellow-400 to-orange-400"
      case "leadership":
        return "from-blue-400 to-cyan-400"
      case "secretaries":
        return "from-green-400 to-teal-400"
      case "cubing":
        return "from-purple-400 to-pink-400"
      case "departments":
        return "from-orange-400 to-red-400"
      default:
        return "from-cyan-400 to-blue-400"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group relative w-80 h-96 mx-auto"
    >
      <div className="relative w-full h-full bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-3xl overflow-hidden border-2 border-cyan-400/20 group-hover:border-cyan-400/60 transition-all duration-500 backdrop-blur-sm">
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

        {/* Member image */}
        <div className="absolute inset-0">
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        {/* Member info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div
            className={`inline-block px-4 py-2 rounded-full text-xs font-bold mb-3 bg-gradient-to-r ${getRoleColor(sectionType)} text-black`}
          >
            {member.role}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 font-mono">{member.name}</h3>

          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block text-blue-400 hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100 duration-500"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function TeamSection({ section, sectionKey }: { section: any; sectionKey: string }) {
  const getGridClass = () => {
    if (sectionKey === "coordinator") return "flex justify-center"
    if (sectionKey === "departments") return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
    return "grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
          {section.title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-6" />
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">{section.subtitle}</p>
      </div>

      <div className={getGridClass()}>
        {section.members.map((member: any, index: number) => (
          <TeamMember key={index} member={member} index={index} sectionType={sectionKey} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TeamPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0f2c] overflow-hidden">
      <FloatingCubes />

      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-cyan-400/40 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-cyan-400/40 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-cyan-400/40 rounded-br-xl" />
      </div>

      <div className="relative z-20">
        <SpaceshipNavbar />

        {/* Header */}
        <div className="pt-32 pb-16 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 font-mono"
          >
            MEET OUR TEAM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            The brilliant minds behind CUBE VIT, dedicated to fostering a passionate cubing community at VIT.
          </motion.p>
        </div>

        {/* Team Sections */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {Object.entries(teamData).map(([key, section]) => (
            <TeamSection key={key} section={section} sectionKey={key} />
          ))}
        </div>
      </div>
    </div>
  )
}
