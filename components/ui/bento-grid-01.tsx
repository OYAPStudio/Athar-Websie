"use client"

import React, { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import {
  Code2,
  ShieldCheck,
  Smartphone,
  Globe2,
  Palette,
  TrendingUp,
  Server,
  Database,
  Layout
} from "lucide-react"

import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ServiceCard = ({
  className,
  children,
  title,
  description,
  delay = 0
}: {
  className?: string
  children: React.ReactNode
  title: string
  description: string
  delay?: number
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Initial entry animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
        }
      }
    )
  }, { scope: containerRef })

  const { contextSafe } = useGSAP({ scope: containerRef })

  const onMouseEnter = contextSafe(() => {
    gsap.to(containerRef.current, {
      scale: 0.98,
      borderColor: "rgba(6, 182, 212, 0.5)", // cyan-500/50
      duration: 0.3,
      ease: "power2.out"
    })
    gsap.to(contentRef.current, {
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    })
  })

  const onMouseLeave = contextSafe(() => {
    gsap.to(containerRef.current, {
      scale: 1,
      borderColor: "rgba(22, 78, 99, 0.3)", // cyan-900/30
      duration: 0.3,
      ease: "power2.out"
    })
    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    })
  })

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#0f2847] border border-cyan-900/30 rounded-2xl overflow-hidden cursor-pointer backdrop-blur-sm ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />

      <div className="h-full flex flex-col p-6 sm:p-8">
        <div className="flex-1 w-full min-h-[160px] flex items-center justify-center relative overflow-hidden rounded-xl bg-[#0a1628]/50 border border-cyan-900/20 mb-6">
          {children}
        </div>

        <div ref={contentRef} className="relative z-10 bg-[#0a1628]/80 backdrop-blur-md rounded-xl p-4 border border-cyan-900/20">
          <h3 className="text-xl font-semibold text-white mb-2 font-displace flex items-center gap-2">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

// 1. Software Engineering Animation
function SoftwareCode() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })
    const lines = ".code-line"

    tl.fromTo(lines,
      { width: 0, opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "none"
      }
    )
      .to(lines, { opacity: 0.5, duration: 0.5 }, "+=1")
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full max-w-[200px] p-4 flex flex-col gap-2 font-mono text-xs text-cyan-400">
      <div className="flex gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/20" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
        <div className="w-3 h-3 rounded-full bg-green-500/20" />
      </div>
      <div className="code-line h-2 bg-purple-400/20 rounded w-3/4" />
      <div className="code-line h-2 bg-blue-400/20 rounded w-1/2 ml-4" />
      <div className="code-line h-2 bg-cyan-400/20 rounded w-2/3 ml-4" />
      <div className="code-line h-2 bg-green-400/20 rounded w-1/2" />
    </div>
  )
}

// 2. UI/UX Animation
function UiUxDesign() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.to(".floating-card", {
      y: -10,
      duration: 2,
      stagger: {
        each: 0.5,
        from: "random",
        yoyo: true,
        repeat: -1
      },
      ease: "sine.inOut"
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <div className="floating-card absolute w-24 h-16 bg-white/5 border border-white/10 rounded-lg -rotate-12 transform -translate-x-8 backdrop-blur-sm" />
      <div className="floating-card absolute w-24 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-lg rotate-6 transform translate-x-4 z-10 backdrop-blur-sm flex items-center justify-center">
        <Palette className="w-6 h-6 text-cyan-400" />
      </div>
      <div className="floating-card absolute w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-full blur-xl -z-10" />
    </div>
  )
}

// 3. Cloud/Global
function CloudInfra() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.to(".orbit-dot", {
      rotation: 360,
      duration: 10,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center" // depends on container structure
    })

    gsap.to(".pulse-core", {
      scale: 1.2,
      opacity: 0.5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full h-full">
      <Globe2 className="w-16 h-16 text-slate-700 absolute opacity-20" />
      <div className="pulse-core w-12 h-12 bg-cyan-500/20 rounded-full blur-md absolute" />
      <Server className="w-8 h-8 text-cyan-400 relative z-10" />

      {/* Orbital dots */}
      <div className="orbit-dot absolute w-32 h-32 border border-cyan-500/10 rounded-full" />
      <div className="orbit-dot absolute w-48 h-48 border border-dashed border-cyan-500/10 rounded-full" style={{ animationDirection: 'reverse' }} />
    </div>
  )
}

// 4. Cybersecurity
function SecurityScanner() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(".scan-line", {
      top: "100%",
      duration: 2,
      ease: "power1.inOut"
    })
      .to(".scan-line", {
        top: "0%",
        duration: 0,
        delay: 0.5
      })

    gsap.to(".shield-icon", {
      filter: "drop-shadow(0 0 8px rgba(6,182,212,0.5))",
      duration: 1,
      yoyo: true,
      repeat: -1
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative w-24 h-28 flex items-center justify-center overflow-hidden rounded-lg bg-slate-900/50 border border-slate-700/30">
      <ShieldCheck className="shield-icon w-12 h-12 text-cyan-400 relative z-10" />
      <div className="scan-line absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)] z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(90deg,rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:16px_16px]" />
    </div>
  )
}

// 5. Mobile
function MobileDev() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(".app-screen",
      { y: "100%" },
      {
        y: "0%",
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        repeat: -1,
        repeatDelay: 2
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative w-20 h-32 border-4 border-slate-700 rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center">
      <div className="absolute top-1 w-8 h-1 bg-slate-800 rounded-full z-20" />
      <div className="w-full h-full p-2 flex flex-col gap-2">
        <div className="app-screen w-full h-8 bg-cyan-500/20 rounded" />
        <div className="app-screen w-full h-12 bg-purple-500/20 rounded" />
        <div className="app-screen w-full h-6 bg-blue-500/20 rounded" />
      </div>
    </div>
  )
}

// 6. Growth
function GrowthChart() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(".chart-bar",
      { height: "10%" },
      {
        height: "var(--target-height)",
        duration: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: containerRef.current,
        }
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="flex items-end gap-2 h-24 w-32 pb-4 border-b border-l border-slate-700/50 pl-2">
      <div className="chart-bar w-4 bg-cyan-900/50 rounded-t" style={{ "--target-height": "40%" } as React.CSSProperties} />
      <div className="chart-bar w-4 bg-cyan-800/50 rounded-t" style={{ "--target-height": "60%" } as React.CSSProperties} />
      <div className="chart-bar w-4 bg-cyan-600/50 rounded-t" style={{ "--target-height": "45%" } as React.CSSProperties} />
      <div className="chart-bar w-4 bg-cyan-400 rounded-t shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ "--target-height": "80%" } as React.CSSProperties} />
    </div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(".section-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="services" className="bg-[#0a1628] px-6 py-24 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center md:text-left mb-16">
          <p className="section-title text-cyan-400 text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
            Our Expertise
          </p>
          <h2 className="section-title text-4xl sm:text-5xl md:text-6xl font-bold text-white font-displace leading-tight">
            Comprehensive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              Digital Solutions
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(280px,auto)]">

          {/* 1. Software Engineering (Large) */}
          <ServiceCard
            className="md:col-span-4"
            title="Custom Software Engineering"
            description="Scalable, robust, and high-performance applications tailored to your business needs using cutting-edge technologies."
            delay={0.1}
          >
            <div className="flex items-center gap-8 px-8">
              <SoftwareCode />
              <div className="hidden sm:block">
                <div className="text-2xl text-white font-mono mb-2">{`{ code: "clean" }`}</div>
                <div className="text-slate-500 text-sm">Full-Stack Development</div>
              </div>
            </div>
          </ServiceCard>

          {/* 2. Mobile (Standard) */}
          <ServiceCard
            className="md:col-span-2"
            title="Mobile Applications"
            description="Native and cross-platform mobile experiences that engage users on iOS and Android."
            delay={0.2}
          >
            <MobileDev />
          </ServiceCard>

          {/* 3. UI/UX (Standard) */}
          <ServiceCard
            className="md:col-span-2"
            title="UI/UX Design"
            description="User-centric interfaces designed for clarity, beauty, and conversion."
            delay={0.3}
          >
            <UiUxDesign />
          </ServiceCard>

          {/* 4. Cybersecurity (Wide) */}
          <ServiceCard
            className="md:col-span-2"
            title="Cybersecurity"
            description="Protecting your digital assets with enterprise-grade security auditing and implementation."
            delay={0.4}
          >
            <SecurityScanner />
          </ServiceCard>

          {/* 5. Cloud (Standard) */}
          <ServiceCard
            className="md:col-span-2"
            title="Cloud Infrastructure"
            description="Secure, scalable cloud architecture and DevOps solutions."
            delay={0.5}
          >
            <CloudInfra />
          </ServiceCard>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
