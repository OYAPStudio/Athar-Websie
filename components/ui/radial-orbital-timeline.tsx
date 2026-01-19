"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lightbulb,
  Code,
  Rocket,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming a utility exists, or I will replace with standard string

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Discovery & Strategy",
    subtitle: "Phase 01",
    description: "We begin by immersing ourselves in your business goals. Through collaborative workshops and deep research, we define a clear roadmap for success.",
    icon: Lightbulb,
    details: ["Market Analysis", "User Persona Research", "Technical Feasibility", "Strategic Roadmap"]
  },
  {
    id: 2,
    title: "Design & Development",
    subtitle: "Phase 02",
    description: "Where creativity meets engineering. We craft pixel-perfect interfaces and robust backend systems using the latest agile methodologies.",
    icon: Code,
    details: ["UI/UX System Design", "Interactive Prototypes", "Full-Stack Development", "Regular Sprints"]
  },
  {
    id: 3,
    title: "Launch & Growth",
    subtitle: "Phase 03",
    description: "Deployment is just the beginning. We ensure a flawless launch and provide data-driven optimization to scale your product.",
    icon: Rocket,
    details: ["quality Assurance", "Cloud Deployment", "Performance Tuning", "Analytics & Iteration"]
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!triggerRef.current || !orbitalRef.current) return;

    // Total scroll duration (pixels)
    const scrollDistance = 2500;

    // Create a master timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update active index state for non-GSAP visual updates if needed
          // 3 items -> 0-0.33 (1), 0.33-0.66 (2), 0.66-1.0 (3)
          const progress = self.progress;
          if (progress < 0.33) setActiveIndex(0);
          else if (progress < 0.66) setActiveIndex(1);
          else setActiveIndex(2);
        }
      }
    });

    // ----------------------------------------------------
    // Animation Logic
    // ----------------------------------------------------
    // We have 3 items distributed on a circle.
    // Item 1: starts at Top (-90deg or 270deg)
    // Item 2: starts at Bottom Right (30deg)
    // Item 3: starts at Bottom Left (150deg)

    // We want to ROTATE the container so the "active" item is always at the TOP (-90deg).
    // Transition 1 -> 2: Rotate container by -120deg.
    // Transition 2 -> 3: Rotate container by another -120deg (total -240).

    // --- Phase 1 to 2 ---
    tl.to(orbitalRef.current, {
      rotation: -120,
      duration: 1,
      ease: "power2.inOut"
    }, "step1")

      // Counter-rotate icons
      .to(".node-content", {
        rotation: 120,
        duration: 1,
        ease: "power2.inOut"
      }, "step1")

      // Text Transitions 1 -> 2
      .to(".text-content-1", { opacity: 0, y: -20, duration: 0.5 }, "step1")
      .fromTo(".text-content-2",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 },
        "step1+=0.3"
      )

      // Highlight Node 2, Dim Node 1
      .to(".node-visual-1", { scale: 1, borderColor: "rgba(6,182,212,0.2)", backgroundColor: "#0f172a", duration: 0.5 }, "step1")
      .to(".node-icon-1", { color: "#22d3ee", scale: 1, duration: 0.5 }, "step1")
      .to(".node-visual-2", { scale: 1.3, borderColor: "#22d3ee", backgroundColor: "#0891b2", duration: 0.5 }, "step1")
      .to(".node-icon-2", { color: "#ffffff", scale: 1.2, duration: 0.5 }, "step1")

      // --- Phase 2 to 3 ---
      .to(orbitalRef.current, {
        rotation: -240,
        duration: 1,
        ease: "power2.inOut"
      }, "step2")

      // Counter-rotate icons
      .to(".node-content", {
        rotation: 240,
        duration: 1,
        ease: "power2.inOut"
      }, "step2")

      // Text Transitions 2 -> 3
      .to(".text-content-2", { opacity: 0, y: -20, duration: 0.5 }, "step2")
      .fromTo(".text-content-3",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 },
        "step2+=0.3"
      )

      // Highlight Node 3, Dim Node 2
      .to(".node-visual-2", { scale: 1, borderColor: "rgba(6,182,212,0.2)", backgroundColor: "#0f172a", duration: 0.5 }, "step2")
      .to(".node-icon-2", { color: "#22d3ee", scale: 1, duration: 0.5 }, "step2")
      .to(".node-visual-3", { scale: 1.3, borderColor: "#22d3ee", backgroundColor: "#0891b2", duration: 0.5 }, "step2")
      .to(".node-icon-3", { color: "#ffffff", scale: 1.2, duration: 0.5 }, "step2");

  }, { scope: containerRef });

  return (
    <section ref={triggerRef} id="process" className="relative bg-[#181818] text-white">
      {/* Container for the sticky content */}
      <div ref={containerRef} className="h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/5 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">

          {/* LEFT: Orbital Visual */}
          <div className="relative flex items-center justify-center order-2 lg:order-1 h-[400px] lg:h-auto">

            {/* Center Logo/Core */}
            <div className="absolute z-20 w-32 h-32 lg:w-40 lg:h-40 bg-[#181818] rounded-full flex items-center justify-center border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.15)] glow-center">
              <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-pulse" />
              <div className="relative w-2/3 h-2/3">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>

            {/* Orbit Tracks */}
            <div className="absolute w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] border border-cyan-500/10 rounded-full" />
            <div className="absolute w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] border border-dashed border-cyan-500/20 rounded-full opacity-50 spin-slow-reverse" />

            {/* Rotating Container for Nodes */}
            <div
              ref={orbitalRef}
              className="absolute w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] rounded-full"
            >
              {timelineData.map((item, index) => {
                // Calculate position: 3 items spread evenly (120 deg apart)
                // We want item 1 at -90deg (top).
                // Index 0: -90
                // Index 1: -90 + 120 = 30
                // Index 2: -90 + 240 = 150
                const degrees = -90 + (index * 120);
                const isActive = index === 0; // Default state before animation

                return (
                  <div
                    key={item.id}
                    className="absolute top-1/2 left-1/2 w-0 h-0"
                    style={{
                      transform: `rotate(${degrees}deg) translate(clamp(140px, 50%, 225px)) rotate(${-degrees}deg)`
                    }}
                  >
                    {/* Visual Node Bubble */}
                    <div
                      className={`node-visual-${item.id} flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 transition-all duration-300 shadow-xl -translate-x-1/2 -translate-y-1/2
                      ${isActive
                          ? "bg-[#0891b2] border-[#22d3ee] scale-125 lg:scale-110"
                          : "bg-[#0f172a] border-cyan-900/30"
                        }`}
                      style={{ transformOrigin: "center" }}
                    >
                      <div className="node-content">
                        <item.icon
                          className={`node-icon-${item.id} w-6 h-6 lg:w-8 lg:h-8 transition-colors duration-300
                            ${isActive ? "text-white" : "text-[#22d3ee]"}`}
                        />
                      </div>
                    </div>

                    {/* Connecting Line to Center (Optional styling touch) */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-full h-[2px] w-[50px] lg:w-[100px] bg-gradient-to-r from-transparent to-cyan-500/20 -z-10 origin-right"
                      style={{
                        transform: `rotate(${degrees}deg) translateX(-40px)`,
                        display: 'none' // Hidden for now, cleaner look without spokes
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>


          {/* RIGHT: Text Content */}
          <div className="relative order-1 lg:order-2 flex items-center h-[300px] lg:h-auto z-30">
            {/* Header always visible */}
            <div className="absolute top-0 left-0 lg:-top-32 lg:left-0 mb-8 w-full text-center lg:text-left">
              <p className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium mb-2">Our Process</p>
              <h2 className="text-4xl lg:text-6xl font-bold font-displace text-white">How We Work</h2>
            </div>

            {/* Staggered Cards Area */}
            <div className="relative w-full h-[300px] lg:h-[400px] flex items-center">
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  className={`text-content-${item.id} absolute top-0 left-0 w-full flex flex-col justify-center
                    ${index === 0 ? "opacity-100" : "opacity-0 translate-y-[50px]"}
                  `}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl lg:text-8xl font-black text-white/5 font-displace select-none absolute -top-10 -left-6 lg:-left-10 z-[-1]">
                      0{item.id}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                      {item.subtitle}
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-displace leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                        {detail}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm uppercase tracking-wider font-medium group">
                      Learn More
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
