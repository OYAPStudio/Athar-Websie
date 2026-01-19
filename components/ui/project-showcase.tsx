"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  icon: React.ReactNode
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-COMMERCE",
    subtitle: "PLATFORM",
    description: "A full-featured e-commerce solution with real-time inventory, payment processing, and analytics dashboard for modern businesses.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    icon: (
      <svg width="28px" height="28px" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "HEALTHCARE",
    subtitle: "MOBILE APP",
    description: "Patient management app with appointment scheduling, telemedicine, and health tracking features for seamless healthcare delivery.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    icon: (
      <svg width="28px" height="28px" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3v2H6v4l-2 2v9h16v-9l-2-2V5h-2V3H8zm-3 9.41l2-2V5h6v5.41l2 2V19H5v-6.59zM11 11h2v3h3v2h-3v3h-2v-3H8v-2h3v-3z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "BRAND",
    subtitle: "IDENTITY",
    description: "Complete brand identity package including logo, guidelines, and marketing materials for tech startups ready to make an impact.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    icon: (
      <svg width="28px" height="28px" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "SECURITY",
    subtitle: "PLATFORM",
    description: "Automated security scanning and vulnerability assessment tool for enterprise applications with real-time threat detection.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    icon: (
      <svg width="28px" height="28px" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "MARKETING",
    subtitle: "DASHBOARD",
    description: "Real-time analytics dashboard for tracking social media campaigns across multiple platforms with actionable insights.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    icon: (
      <svg width="28px" height="28px" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h2v10H7V7zm4 4h2v6h-2v-6zm4-2h2v8h-2V9z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "CLOUD",
    subtitle: "MIGRATION",
    description: "Enterprise-scale migration from on-premise infrastructure to AWS cloud with zero downtime and enhanced scalability.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    icon: (
      <svg width="28px" height="28px" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 7h-4V2H9v5H5l6 6 6-6zm-12 8v2h14v-2H5zm0 4v2h14v-2H5z" />
      </svg>
    ),
  },
]

function ShowcaseCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="min-h-[380px] w-full max-w-[300px] bg-[#181818]/80 backdrop-blur-sm rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col p-2 gap-1 overflow-hidden border border-cyan-500/20 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 35px 60px -15px rgba(0,212,255,0.2)",
        borderColor: "rgba(0,212,255,0.5)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="flex justify-between p-2 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      >
        <motion.div
          className="text-cyan-400"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {project.icon}
        </motion.div>
        <motion.div
          className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#22d3ee",
            boxShadow: "0 0 15px rgba(0, 212, 255, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="#181818"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </motion.div>
      </motion.div>
      <div className="flex flex-col gap-2">
        <motion.div
          className="title text-2xl text-center font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-displace"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
        >
          {project.title}
          <br />
          {project.subtitle}
        </motion.div>
        <motion.div
          className="image relative px-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
        >
          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ ease: "easeInOut" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover shadow-lg"
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="desc text-xs text-center max-w-64 mx-auto text-gray-400 font-light px-2 pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 + index * 0.1, duration: 0.7 }}
        >
          {project.description}
        </motion.div>
      </div>
    </motion.div>
  )
}

export function PortfolioSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 3
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const visibleProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  )

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  return (
    <section id="portfolio" className="py-24 bg-[#181818]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-cyan-400 text-sm uppercase tracking-widest mb-4">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white font-displace">
              Our Portfolio
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Explore our recent projects and see how we&apos;ve helped businesses
              achieve their digital goals.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence mode="wait">
              {visibleProjects.map((project, index) => (
                <ShowcaseCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-6"
          >
            {/* Left Arrow */}
            <Button
              onClick={goToPrevious}
              size="icon"
              className="w-12 h-12 rounded-full bg-transparent border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Page Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === index
                    ? "w-8 bg-cyan-500"
                    : "bg-cyan-500/30 hover:bg-cyan-500/50"
                    }`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <Button
              onClick={goToNext}
              size="icon"
              className="w-12 h-12 rounded-full bg-transparent border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
