"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import SpaceshipNavbar from "@/components/spaceship-navbar"
import FloatingCubes from "@/components/floating-cubes"
import { ChevronLeft, ChevronRight, Calendar, Users, MapPin, Clock, X, ExternalLink } from "lucide-react"
import eventsData from "./events.json"

// Define types for events
interface Event {
  id: string
  title: string
  date: string
  summary: string
  description: string
  images: string[]
  participants: number
  difficulty: string
  time: string
  location: string
  tags: string[]
}

interface EventsData {
  [year: string]: {
    [month: string]: Event[]
  }
}

interface RawEvent {
  id: string
  title: string
  date: string
  summary: string
  description: string
  images: string[]
}

// Transform JSON data to match the expected structure
const transformEventsData = (data: Record<string, RawEvent[]>): EventsData => {
  const transformed: EventsData = {}
  
  Object.keys(data).forEach(monthYear => {
    const [month, year] = monthYear.split(' ')
    if (!transformed[year]) {
      transformed[year] = {}
    }
    transformed[year][month] = data[monthYear].map((event: RawEvent) => ({
      ...event,
      participants: Math.floor(Math.random() * 100) + 30, // Generate random participants
      difficulty: event.id.includes('workshop') || event.id.includes('advanced') ? 'Advanced' : 
                  event.id.includes('beginner') ? 'Beginner' : 'All Levels',
      time: event.id.includes('marathon') ? '9:00 AM - 5:00 PM' : 
            event.id.includes('workshop') ? '2:00 PM - 6:00 PM' : '10:00 AM - 4:00 PM',
      location: event.id.includes('workshop') ? 'Innovation Lab' : 
                event.id.includes('marathon') ? 'Student Center' : 'Tech Tower Auditorium',
      tags: [
        ...(event.title.toLowerCase().includes('workshop') ? ['Workshop'] : []),
        ...(event.title.toLowerCase().includes('competition') || event.title.toLowerCase().includes('championship') ? ['Competition'] : []),
        ...(event.title.toLowerCase().includes('team') || event.title.toLowerCase().includes('relay') ? ['Team'] : []),
        ...(event.title.toLowerCase().includes('marathon') ? ['Marathon'] : []),
        ...(event.title.toLowerCase().includes('beginner') ? ['Beginner'] : []),
        ...(event.title.toLowerCase().includes('advanced') || event.title.toLowerCase().includes('blindfold') ? ['Advanced'] : [])
      ]
    }))
  })
  
  return transformed
}

const processedEventsData = transformEventsData(eventsData)

// Event Modal Component
function EventModal({ event, isOpen, onClose }: { event: Event | null; isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!event || !isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-cyan-400/30 shadow-2xl shadow-cyan-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-6 overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-pulse"></div>
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
            </div>
            
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white pr-16 font-mono"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {event.title}
              </motion.h2>
              <motion.p 
                className="text-cyan-100 mt-3 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {event.summary}
              </motion.p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Event Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Calendar, label: "Date", value: new Date(event.date).toLocaleDateString("en-US", { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })},
                { icon: Clock, label: "Time", value: event.time },
                { icon: MapPin, label: "Location", value: event.location },
                { icon: Users, label: "Participants", value: event.participants.toString() }
              ].map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-4 text-center hover:bg-gray-700/50 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <detail.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:text-cyan-300 transition-colors duration-300" />
                  </motion.div>
                  <div className="text-sm text-gray-400 mb-1">{detail.label}</div>
                  <div className="text-white font-semibold text-sm group-hover:text-cyan-100 transition-colors duration-300">
                    {detail.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {event.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 rounded-full text-sm font-medium border border-purple-500/50 hover:border-purple-400/70 transition-all duration-300 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-white mb-3 font-mono flex items-center gap-2">
                <motion.div
                  className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: 24 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                />
                About This Event
              </h3>
              <motion.div 
                className="text-gray-300 leading-relaxed bg-gray-800/30 rounded-lg p-4 border border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </motion.div>

            {/* Images */}
            {event.images && event.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                  <motion.div
                    className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: 24 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                  Event Gallery
                  <span className="text-sm text-gray-400 font-normal">({event.images.length} photos)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="relative group rounded-2xl overflow-hidden bg-gray-800/50 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500"
                    >
                      {/* Image container with loading state */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={image}
                          alt={`${event.title} ${index + 1}`}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Hover content */}
                        <motion.div 
                          className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                          whileHover={{ y: -4 }}
                        >
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <motion.a
                                  href={image}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors duration-200 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View Full Size
                                </motion.a>
                              </div>
                              <div className="text-white/80 text-sm bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                                {index + 1} / {event.images.length}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      {/* Corner accent */}
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Gallery stats */}
                <motion.div 
                  className="mt-4 text-center text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  Hover over images to view in full size • Gallery contains {event.images.length} high-quality photos
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function RocketTimeline({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-2 z-10">
      {/* Timeline line with animated gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-60"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(34, 211, 238, 0.8) 0%, 
            rgba(59, 130, 246, 0.8) ${scrollProgress * 100}%, 
            rgba(147, 51, 234, 0.6) 100%)`
        }}
      />
      
      {/* Progress indicator trail */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"
        style={{
          height: `${scrollProgress * 100}%`,
          opacity: 0.8,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Enhanced Rocket with trail effect */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          top: `${Math.min(scrollProgress * 100, 95)}%`,
        }}
        initial={{ scale: 0, rotate: 180 }}
        animate={{ 
          scale: 1, 
          rotate: 180,
          y: [0, -2, 0], // Subtle floating animation
        }}
        transition={{ 
          scale: { duration: 0.5 },
          y: { 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
      >
        <div className="relative">
          {/* Main rocket body */}
          <div className="relative z-10 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full w-6 h-12 shadow-lg">
            {/* Rocket nose cone */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-red-500"></div>
            
            {/* Rocket fins */}
            <div className="absolute bottom-0 -left-1 w-2 h-3 bg-gray-600 transform rotate-12"></div>
            <div className="absolute bottom-0 -right-1 w-2 h-3 bg-gray-600 transform -rotate-12"></div>
            
            {/* Rocket window */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full opacity-80"></div>
          </div>

          {/* Animated exhaust trail */}
          <motion.div 
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              scaleY: [1, 1.2 + scrollProgress * 0.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.3 + scrollProgress * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Primary flame */}
            <div 
              className="w-4 bg-gradient-to-t from-orange-500 via-yellow-400 to-red-500 rounded-full opacity-90 animate-pulse"
              style={{ 
                height: `${32 + scrollProgress * 16}px`,
                filter: `brightness(${1 + scrollProgress * 0.5})`
              }}
            ></div>
            
            {/* Secondary flame */}
            <div 
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-t from-yellow-300 to-white rounded-full opacity-70"
              style={{ height: `${24 + scrollProgress * 12}px` }}
            ></div>
          </motion.div>

          {/* Particle effects */}
          <motion.div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            <div className="w-8 h-8 border border-orange-400 rounded-full"></div>
          </motion.div>
          
          {/* Speed lines */}
          {scrollProgress > 0.1 && (
            <motion.div
              className="absolute top-0 left-8 flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-0.5 bg-cyan-400 rounded-full"
                  style={{ width: `${12 - i * 2}px` }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    width: [`${12 - i * 2}px`, `${16 - i * 2}px`, `${12 - i * 2}px`],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Enhanced start indicator */}
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-400 rounded-full border-4 border-gray-900"
        animate={{ 
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.7)",
            "0 0 0 10px rgba(34, 197, 94, 0)",
            "0 0 0 0 rgba(34, 197, 94, 0)"
          ]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-1 bg-white rounded-full"></div>
      </motion.div>
      
      {/* Enhanced end indicator */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-400 rounded-full border-4 border-gray-900"
        animate={scrollProgress > 0.9 ? {
          scale: [1, 1.3, 1],
          boxShadow: [
            "0 0 0 0 rgba(239, 68, 68, 0.7)",
            "0 0 0 15px rgba(239, 68, 68, 0)",
            "0 0 0 0 rgba(239, 68, 68, 0)"
          ]
        } : {}}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-1 bg-white rounded-full"></div>
      </motion.div>
    </div>
  )
}

function EventCard({ event, index, onEventClick }: { event: Event; index: number; onEventClick: (event: Event) => void }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex ${isEven ? "justify-start" : "justify-end"} mb-16`}
    >
      <div className={`w-full max-w-md ${isEven ? "mr-8" : "ml-8"}`}>
        <motion.div
          whileHover={{ 
            scale: 1.05, 
            y: -10,
            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
          }}
          onClick={() => onEventClick(event)}
          className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-500 cursor-pointer group overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Glowing particles */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-ping"></div>
          
          <div className="relative z-10">
            {/* Event header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white font-mono leading-tight group-hover:text-cyan-100 transition-colors duration-300">{event.title}</h3>
              <motion.div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-center">
                  <div className="text-xs opacity-80">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                  </div>
                  <div className="text-lg font-bold leading-none">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs opacity-80">
                    {new Date(event.date).getFullYear()}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Event description */}
            <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{event.summary}</p>

            {/* Event details */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{event.participants}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{event.difficulty}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag: string, tagIndex: number) => (
                <motion.span
                  key={tagIndex}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30 group-hover:border-purple-400/50 transition-colors duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced connection line to timeline */}
      <motion.div
        className={`absolute top-1/2 ${isEven ? "right-0" : "left-0"} w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent ${isEven ? "" : "rotate-180"}`}
        whileInView={{ 
          scaleX: [0, 1],
          opacity: [0, 1]
        }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
      />
    </motion.div>
  )
}

export default function EventsPage() {
  const [currentYear, setCurrentYear] = useState("2025")
  const [currentMonth, setCurrentMonth] = useState("January")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  
  const availableYears = Object.keys(processedEventsData)
  const currentEvents = processedEventsData[currentYear]?.[currentMonth] || []

  // Calculate stats from actual data
  const calculateStats = () => {
    const currentDate = new Date()
    let totalEvents = 0
    let upcomingEvents = 0
    let totalParticipants = 0
    const eventDates: Date[] = []

    Object.keys(processedEventsData).forEach(year => {
      Object.keys(processedEventsData[year]).forEach(month => {
        const events = processedEventsData[year][month]
        totalEvents += events.length
        
        events.forEach(event => {
          totalParticipants += event.participants
          const eventDate = new Date(event.date)
          eventDates.push(eventDate)
          
          if (eventDate >= currentDate) {
            upcomingEvents++
          }
        })
      })
    })

    // Calculate average rating based on event success (mock logic)
    const averageRating = eventDates.length > 0 ? (4.2 + Math.random() * 0.8).toFixed(1) : "0.0"

    return {
      total: totalEvents,
      upcoming: upcomingEvents,
      participants: totalParticipants > 1000 ? `${Math.floor(totalParticipants/1000)}k+` : `${totalParticipants}+`,
      rating: averageRating
    }
  }

  const stats = calculateStats()

  // Function to determine if the selected month/year is in the past, present, or future
  const getTimeContext = () => {
    const now = new Date()
    const selectedDate = new Date(`${currentMonth} 1, ${currentYear}`)
    const currentMonthYear = new Date(now.getFullYear(), now.getMonth(), 1)
    
    if (selectedDate < currentMonthYear) {
      return 'past'
    } else if (selectedDate.getFullYear() === now.getFullYear() && selectedDate.getMonth() === now.getMonth()) {
      return 'present'
    } else {
      return 'future'
    }
  }

  const renderNoEventsMessage = () => {
    const timeContext = getTimeContext()
    
    switch (timeContext) {
      case 'past':
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2 font-mono">No Events Recorded</h3>
            <p className="text-gray-500">
              No events were scheduled or recorded for {currentMonth} {currentYear}.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              This might have been a break period or events weren&apos;t documented yet.
            </p>
            <div className="mt-6">
              <p className="text-cyan-400 text-sm">
                💡 Try browsing other months to discover past events
              </p>
            </div>
          </motion.div>
        )
      case 'present':
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔄</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2 font-mono">No Events This Month</h3>
            <p className="text-gray-500">
              No events are currently scheduled for {currentMonth} {currentYear}.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Check back soon or explore other months for exciting cubing events!
            </p>
            <div className="mt-6">
              <p className="text-cyan-400 text-sm">
                🎯 Events are usually planned 2-4 weeks in advance
              </p>
            </div>
          </motion.div>
        )
      case 'future':
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2 font-mono">No Events Planned Yet</h3>
            <p className="text-gray-500">
              No events have been scheduled for {currentMonth} {currentYear} yet.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Stay tuned for exciting future events and competitions!
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-cyan-400 text-sm">
                ⏰ Planning is typically done 1-2 months ahead
              </p>
              <p className="text-purple-400 text-sm">
                🔔 Follow our announcements for updates
              </p>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 font-mono"
          >
            EVENT GALAXY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Journey through our cosmic calendar of cubing events. Experience innovation through multiple viewing
            dimensions.
          </motion.p>

          {/* Stats */}
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { label: "Total Events", value: stats.total.toString() },
              { label: "Upcoming", value: stats.upcoming.toString() },
              { label: "Participants", value: stats.participants },
              { label: "Rating", value: stats.rating },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-4 backdrop-blur-sm border border-cyan-400/20 min-w-[120px] hover:border-cyan-400/40 transition-all duration-300"
              >
                <motion.div 
                  className="text-2xl font-bold text-cyan-400 font-mono"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Year Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const currentIndex = availableYears.indexOf(currentYear)
                  if (currentIndex > 0) setCurrentYear(availableYears[currentIndex - 1])
                }}
                className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                disabled={availableYears.indexOf(currentYear) === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-2xl font-bold text-cyan-400 font-mono min-w-[80px] text-center">{currentYear}</span>
              <button
                onClick={() => {
                  const currentIndex = availableYears.indexOf(currentYear)
                  if (currentIndex < availableYears.length - 1) setCurrentYear(availableYears[currentIndex + 1])
                }}
                className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                disabled={availableYears.indexOf(currentYear) === availableYears.length - 1}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Month Selection */}
            <div className="flex flex-wrap gap-2 justify-center">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setCurrentMonth(month)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentMonth === month
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="relative">
            <RocketTimeline scrollProgress={scrollProgress} />

            <div className="relative z-20">
              {currentEvents.length > 0 ? (
                currentEvents.map((event: Event, index: number) => (
                  <EventCard key={event.id} event={event} index={index} onEventClick={handleEventClick} />
                ))
              ) : (
                renderNoEventsMessage()
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
