"use client"

import React, { useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { useGSAP } from "@gsap/react"
import { usePathname } from "next/navigation"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    useGSAP(
        () => {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.5, // softness of the smoothing (seconds)
                effects: true, // look for data-speed and data-lag attributes on elements
                smoothTouch: 0.1, // much shorter smoothing time on touch devices (optional)
            })
        },
        {
            dependencies: [pathname], // recreate/refresh on route change? 
            // Actually, standard ScrollSmoother persists. But refreshing might be needed.
            // If we recreate, it might duplicate. 
            // ScrollSmoother.create returns an instance. We should probably clean it up if we re-run, or only run once.
            // But passing [pathname] to useGSAP implies it runs on change.
            // Safest is to run ONCE and rely on observer, or revert on change.
            revertOnUpdate: true
        }
    )

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                {children}
            </div>
        </div>
    )
}
