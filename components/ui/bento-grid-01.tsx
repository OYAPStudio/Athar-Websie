"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code,
  Globe,
  Smartphone,
  Palette,
  Megaphone,
  MessageSquare,
  Shield,
  Cloud,
} from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Code,
    title: "Software Development",
    description:
      "Custom software solutions tailored to your business needs. From enterprise applications to specialized tools.",
    color: "from-blue-500/20 to-blue-600/20",
    span: "lg:col-span-2",
  },
  {
    icon: Globe,
    title: "Web Design & Development",
    description:
      "Beautiful, responsive websites that convert visitors into customers.",
    color: "from-purple-500/20 to-purple-600/20",
    span: "",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    color: "from-green-500/20 to-green-600/20",
    span: "",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that creates intuitive and engaging experiences.",
    color: "from-pink-500/20 to-pink-600/20",
    span: "lg:col-span-2",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description:
      "Strategic social media campaigns that build brand awareness and engagement.",
    color: "from-orange-500/20 to-orange-600/20",
    span: "",
  },
  {
    icon: MessageSquare,
    title: "OTP & SMS Services",
    description:
      "Reliable OTP and SMS solutions for authentication and communication.",
    color: "from-cyan-500/20 to-cyan-600/20",
    span: "",
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description:
      "Comprehensive security services to protect your digital assets.",
    color: "from-red-500/20 to-red-600/20",
    span: "",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and migration services for modern businesses.",
    color: "from-indigo-500/20 to-indigo-600/20",
    span: "",
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "Displace, sans-serif" }}
            >
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions to help your business thrive in the
              modern world.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border/50 p-6",
                  "bg-gradient-to-br",
                  service.color,
                  "hover:border-primary/50 hover:shadow-xl transition-all duration-300",
                  service.span
                )}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10">
                  <service.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
