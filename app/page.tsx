import Image from "next/image";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { SnowfallEffect } from "@/components/ui/snowfall-effect";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <ShaderAnimation />
      <SnowfallEffect />

      {/* Glassmorphism Container */}
      <div className="relative z-10 mx-4 px-12 py-16 md:px-24 md:py-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo with glow effect */}
          <div className="relative mb-8">
            <div className="absolute inset-0 blur-3xl bg-blue-500/30 rounded-full scale-150" />
            <Image
              src="/logo.png"
              alt="Athar Logo"
              width={140}
              height={140}
              priority
              className="relative drop-shadow-2xl"
            />
          </div>

          {/* Brand Name - Using Displace Font */}
          <h1
            className="mb-4 text-white text-[6rem] md:text-[10rem] leading-none font-black tracking-tight"
            style={{ fontFamily: "Displace, sans-serif" }}
          >
            Athar
          </h1>

          {/* Coming Soon */}
          <p
            className="text-white/60 text-2xl md:text-4xl tracking-[0.2em] uppercase"
            style={{ fontFamily: "Displace, sans-serif", fontWeight: 300 }}
          >
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
