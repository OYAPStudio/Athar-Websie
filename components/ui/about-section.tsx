"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Lightbulb, Users, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We are committed to delivering exceptional digital solutions that empower businesses to thrive in the modern world.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We stay at the forefront of technology, constantly exploring new ways to solve complex challenges.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description:
      "Your success is our priority. We work closely with you to understand your needs and exceed expectations.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we do, from code quality to customer service.",
  },
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-muted/30">
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
              About Athar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are a multi-agency company dedicated to providing comprehensive
              digital solutions. Our team of experts combines creativity with
              technical expertise to deliver results that matter.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
              <p className="text-muted-foreground mb-4">
                Founded with a vision to bridge the gap between technology and
                business success, Athar has grown into a trusted partner for
                companies worldwide. We believe that great digital experiences
                are built on a foundation of innovation, quality, and genuine
                partnership.
              </p>
              <p className="text-muted-foreground">
                Our diverse team brings together expertise across software
                development, design, marketing, and cybersecurity. This unique
                combination allows us to offer end-to-end solutions that address
                every aspect of your digital presence.
              </p>
            </motion.div>

            {/* Right - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div
                    className="text-6xl sm:text-8xl font-bold text-primary/20 mb-4"
                    style={{ fontFamily: "Displace, sans-serif" }}
                  >
                    Athar
                  </div>
                  <p className="text-muted-foreground">
                    Building Digital Excellence Since Day One
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={cn(
                  "p-6 rounded-xl bg-background border border-border/50",
                  "hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                )}
              >
                <value.icon className="h-10 w-10 text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
