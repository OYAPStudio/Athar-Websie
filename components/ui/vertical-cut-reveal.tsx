"use client"

import { motion, Variants, Transition } from "framer-motion"
import React from "react"

interface VerticalCutRevealProps {
  children: string
  className?: string
  splitBy?: "characters" | "words" | "lines"
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | "random"
  reverse?: boolean
  transition?: Transition
  variants?: {
    hidden: Variants["hidden"]
    visible: Variants["visible"]
  }
}

const defaultVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
}

const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.33, 1, 0.68, 1],
}

function VerticalCutReveal({
  children,
  className = "",
  splitBy = "characters",
  staggerDuration = 0.025,
  staggerFrom = "first",
  reverse = false,
  transition = defaultTransition,
  variants = defaultVariants,
}: VerticalCutRevealProps) {
  const splitText = (text: string): string[] => {
    switch (splitBy) {
      case "words":
        return text.split(" ")
      case "lines":
        return text.split("\n")
      case "characters":
      default:
        return text.split("")
    }
  }

  const elements = splitText(children)
  const totalElements = elements.length

  const getStaggerDelay = (index: number): number => {
    switch (staggerFrom) {
      case "last":
        return (totalElements - 1 - index) * staggerDuration
      case "center": {
        const center = (totalElements - 1) / 2
        return Math.abs(center - index) * staggerDuration
      }
      case "random":
        return Math.random() * staggerDuration * totalElements
      case "first":
      default:
        return index * staggerDuration
    }
  }

  return (
    <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      {elements.map((element, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={reverse ? "visible" : "hidden"}
            animate={reverse ? "hidden" : "visible"}
            variants={variants}
            transition={{
              ...transition,
              delay: getStaggerDelay(index),
            }}
          >
            {element === " " ? "\u00A0" : element}
            {splitBy === "words" && index < totalElements - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export { VerticalCutReveal }
