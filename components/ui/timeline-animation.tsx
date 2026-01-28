"use client"

import { motion, useInView, Variants } from "framer-motion"
import React, { useRef, RefObject, ElementType, ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  title: string
  description: string
  icon?: React.ReactNode
}

interface TimelineAnimationProps {
  items: TimelineItem[]
  className?: string
}

export function TimelineAnimation({ items, className }: TimelineAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Timeline line */}
      <motion.div
        className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50"
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : { height: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex items-start gap-6 pl-16"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + index * 0.2,
              ease: "easeOut",
            }}
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-4 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + index * 0.2,
                ease: "easeOut",
              }}
            />

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {item.icon && (
                  <div className="text-primary">{item.icon}</div>
                )}
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// TimelineContent - Scroll-triggered animation wrapper component
type TimelineContentProps<T extends ElementType = "div"> = {
  as?: T
  animationNum: number
  timelineRef: RefObject<HTMLElement | null>
  customVariants?: Variants
  className?: string
  children?: React.ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "as" | "animationNum" | "timelineRef" | "customVariants">

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

export function TimelineContent<T extends ElementType = "div">({
  as,
  animationNum,
  timelineRef,
  customVariants = defaultVariants,
  className,
  children,
  ...props
}: TimelineContentProps<T>) {
  const Component = as || "div"
  const isInView = useInView(timelineRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      className={className}
      {...(props as object)}
      // @ts-expect-error - Dynamic component type
      as={Component !== "div" ? undefined : undefined}
    >
      {Component === "div" ? (
        children
      ) : (
        // @ts-expect-error - Dynamic component rendering
        <Component {...props} className="">
          {children}
        </Component>
      )}
    </motion.div>
  )
}

// Alternative simpler implementation that works better with different element types
export const TimelineContentWrapper = motion.create("div")
export const TimelineContentSpan = motion.create("span")
export const TimelineContentFigure = motion.create("figure")
export const TimelineContentButton = motion.create("button")
export const TimelineContentAnchor = motion.create("a")
