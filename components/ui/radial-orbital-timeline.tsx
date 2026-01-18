"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb, Code, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const processSteps = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Planning",
    description:
      "We start by understanding your vision, goals, and requirements. Our team conducts thorough research and creates a detailed project roadmap.",
    details: [
      "Requirements gathering",
      "Market research",
      "Project scoping",
      "Timeline planning",
    ],
  },
  {
    id: 2,
    icon: Code,
    title: "Development",
    description:
      "Our expert team brings your vision to life using cutting-edge technologies and best practices. Regular updates keep you informed throughout.",
    details: [
      "Agile development",
      "Code reviews",
      "Quality assurance",
      "Progress tracking",
    ],
  },
  {
    id: 3,
    icon: Rocket,
    title: "Release",
    description:
      "We ensure a smooth deployment and provide ongoing support. Your success is our success, and we're here for the long term.",
    details: [
      "Deployment",
      "Performance optimization",
      "Documentation",
      "Ongoing support",
    ],
  },
]

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="process" className="py-24">
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
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A streamlined approach to delivering exceptional results, from
              concept to launch.
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Central line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 origin-left"
            />

            {/* Timeline nodes */}
            <div className="relative flex justify-between items-center py-16">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  className="relative flex flex-col items-center w-1/3"
                >
                  {/* Node circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.2 }}
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center",
                      "bg-primary text-primary-foreground shadow-lg",
                      "ring-4 ring-background"
                    )}
                  >
                    <step.icon className="h-8 w-8" />
                  </motion.div>

                  {/* Content card */}
                  <div
                    className={cn(
                      "absolute w-72 p-6 rounded-xl bg-background border border-border/50",
                      "hover:border-primary/50 hover:shadow-lg transition-all duration-300",
                      index % 2 === 0 ? "top-full mt-8" : "bottom-full mb-8"
                    )}
                  >
                    <div className="text-sm font-medium text-primary mb-1">
                      Step {step.id}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-1">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="relative pl-16"
              >
                {/* Vertical line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary to-primary/20" />
                )}

                {/* Node circle */}
                <div
                  className={cn(
                    "absolute left-0 w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-primary text-primary-foreground shadow-lg"
                  )}
                >
                  <step.icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="p-6 rounded-xl bg-background border border-border/50">
                  <div className="text-sm font-medium text-primary mb-1">
                    Step {step.id}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-1">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
