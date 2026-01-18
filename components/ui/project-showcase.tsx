"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce solution with real-time inventory, payment processing, and analytics dashboard.",
    image: "/projects/ecommerce.png",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    category: "Web Development",
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Healthcare Mobile App",
    description:
      "Patient management app with appointment scheduling, telemedicine, and health tracking features.",
    image: "/projects/healthcare.png",
    tags: ["React Native", "Firebase", "HIPAA Compliant"],
    category: "Mobile Development",
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Brand Identity System",
    description:
      "Complete brand identity package including logo, guidelines, and marketing materials for a tech startup.",
    image: "/projects/branding.png",
    tags: ["Figma", "Illustrator", "Brand Strategy"],
    category: "UI/UX Design",
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Security Audit Platform",
    description:
      "Automated security scanning and vulnerability assessment tool for enterprise applications.",
    image: "/projects/security.png",
    tags: ["Python", "Docker", "AWS", "Security"],
    category: "Cybersecurity",
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Marketing Campaign Dashboard",
    description:
      "Real-time analytics dashboard for tracking social media campaigns across multiple platforms.",
    image: "/projects/marketing.png",
    tags: ["React", "D3.js", "API Integration"],
    category: "Marketing",
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Cloud Migration Project",
    description:
      "Enterprise-scale migration from on-premise infrastructure to AWS cloud with zero downtime.",
    image: "/projects/cloud.png",
    tags: ["AWS", "Terraform", "Docker", "Kubernetes"],
    category: "Cloud Solutions",
    link: "#",
    github: "#",
  },
]

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Cybersecurity",
  "Marketing",
  "Cloud Solutions",
]

export function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "Displace, sans-serif" }}
            >
              Our Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our recent projects and see how we&apos;ve helped businesses
              achieve their digital goals.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                layout
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border/50 bg-background",
                  "hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                )}
              >
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary/20">
                    {project.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
