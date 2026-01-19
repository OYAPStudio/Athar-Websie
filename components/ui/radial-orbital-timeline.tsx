"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Code, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: number;
  title: string;
  phase: string;
  description: string;
  icon: React.ElementType;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Planning & Strategy",
    phase: "Phase 01",
    description: "We start by diving deep into your vision. detailed research, strategic roadmapping, and requirement gathering ensure we build exactly what you need to succeed.",
    icon: Lightbulb,
  },
  {
    id: 2,
    title: "Design & Development",
    phase: "Phase 02",
    description: "Our expert team brings the vision to life. using cutting-edge technologies and pixel-perfect design practices, we craft robust, scalable solutions.",
    icon: Code,
  },
  {
    id: 3,
    title: "Launch & Scale",
    phase: "Phase 03",
    description: "Rigorous testing ensures a flawless deployment. post-launch, we provide ongoing support and optimization to help your digital product grow.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !orbitalRef.current || !triggerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=3000", // Scroll distance
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Initial state: Phase 1 active
    // We want 3 phases. 
    // Phase 1: 0% scroll
    // Phase 2: 50% scroll
    // Phase 3: 100% scroll

    // Rotation logic:
    // With 3 items, they are at 0, 120, 240 degrees.
    // Assume Item 1 is at -90deg (top) or 0deg (right).
    // Let's place them: 
    // Item 1: -90deg (Top)
    // Item 2: 30deg (Bottom Right)
    // Item 3: 150deg (Bottom Left)

    // We want to rotate so each item comes to the Top (-90deg).
    // Start: Item 1 at Top (Rot = 0)
    // Step 2: Item 2 at Top. Item 2 is at 30deg originally (relative to 0). 
    // To get 30 to -90, we rotate -120deg.
    // Step 3: Item 3 at Top. Item 3 is at 150deg originally.
    // To get 150 to -90, we rotate -240deg.

    // Animations

    // Transition to Phase 2
    tl.to(orbitalRef.current, {
      rotation: -120,
      duration: 1,
      ease: "power2.inOut"
    }, "phase1-to-2")
      .to(".process-text-1", { opacity: 0, scale: 0.8, duration: 0.5 }, "phase1-to-2")
      .fromTo(".process-text-2", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.2")
      .to(".node-1", { scale: 1, borderColor: "rgba(6,182,212,0.3)", color: "rgba(6,182,212,0.5)" }, "phase1-to-2") // dim 1
      .to(".node-2", { scale: 1.5, borderColor: "#22d3ee", color: "#000", backgroundColor: "#22d3ee" }, "phase1-to-2") // highlight 2

      // Transition to Phase 3
      .to(orbitalRef.current, {
        rotation: -240,
        duration: 1,
        ease: "power2.inOut"
      }, "phase2-to-3")
      .to(".process-text-2", { opacity: 0, scale: 0.8, duration: 0.5 }, "phase2-to-3")
      .fromTo(".process-text-3", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.2")
      .to(".node-2", { scale: 1, borderColor: "rgba(6,182,212,0.3)", color: "rgba(6,182,212,0.5)", backgroundColor: "#0f2847" }, "phase2-to-3") // dim 2
      .to(".node-3", { scale: 1.5, borderColor: "#22d3ee", color: "#000", backgroundColor: "#22d3ee" }, "phase2-to-3"); // highlight 3

  }, { scope: triggerRef });

  return (
    <section ref={triggerRef} className="relative bg-[#0a1628]">
      <div ref={sectionRef} className="h-screen w-full overflow-hidden sticky top-0 flex flex-col items-center justify-center">

        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#0a1628] to-[#0a1628]" />

        {/* Header */}
        <div className="absolute top-12 left-0 w-full text-center z-20 px-4">
          <p className="text-cyan-400 text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-displace">
            Our Process
          </h2>
        </div>

        {/* Central System */}
        <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] flex items-center justify-center mb-12 sm:mb-0">

          {/* Static Central Logo */}
          <div className="absolute z-10 w-32 h-32 bg-[#0a1628] rounded-full flex items-center justify-center border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
            <Image
              src="/logo.png"
              alt="Athar Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Orbit Rings (Static Visuals) */}
          <div className="absolute border border-cyan-500/10 rounded-full w-[80%] h-[80%] animate-pulse" />
          <div className="absolute border border-dashed border-cyan-500/20 rounded-full w-[100%] h-[100%] spin-slow opacity-30" />

          {/* Rotating Orbital Container */}
          <div ref={orbitalRef} className="absolute w-full h-full flex items-center justify-center">
            {timelineData.map((item, index) => {
              // Calculate position for even distribution
              // Offset by -90deg so index 0 is at top
              const angleDeg = (index * 120) - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              // Radius is 50% of container width
              const radiusPercent = 50;

              return (
                <div
                  key={item.id}
                  className={`node-${item.id} absolute flex items-center justify-center w-16 h-16 rounded-full border-2 transition-colors duration-300 z-20 transform -translate-x-1/2 -translate-y-1/2
                    ${index === 0
                      ? "bg-cyan-400 border-cyan-400 text-black scale-150"
                      : "bg-[#0f2847] border-cyan-900/50 text-cyan-400"
                    }`}
                  style={{
                    left: `${50 + radiusPercent * Math.cos(angleRad)}%`,
                    top: `${50 + radiusPercent * Math.sin(angleRad)}%`,
                    // Counter-rotate the icon so it stays upright? 
                    // Or let it rotate with the orbit? 
                    // Let's keep it simple first. The container rotates, so these children rotate with it.
                    // If we want icons to stay upright, we need to counter-rotate them dynamically or via CSS.
                    transform: `translate(-50%, -50%) rotate(${-(angleDeg)}deg)` // Initial counter rotation
                  }}
                >
                  <div className="counter-rotate" style={{ transform: `rotate(${angleDeg}deg)` }}>
                    {/* We might need to counter-rotate dynamically in GSAP if we want them perfectly upright always.
                       For now, let's just place the icon. */}
                    <item.icon size={24} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Text Cards Container (Fixed Position) */}
        <div className="absolute bottom-12 sm:bottom-0 sm:top-1/2 sm:right-0 sm:w-1/3 sm:h-full flex items-center justify-center sm:justify-start px-6 pointer-events-none z-30">
          <div className="relative w-full max-w-md h-[200px]">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`process-text-${item.id} absolute inset-0 flex flex-col justify-center
                  ${index === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-mono w-fit mb-4">
                  {item.phase}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-displace">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProcessSection;
