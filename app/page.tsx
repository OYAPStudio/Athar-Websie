import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner"
import { AboutSection } from "@/components/ui/about-section"
import { ClientsSection } from "@/components/ui/clients-section"
import { ServicesSection } from "@/components/ui/bento-grid-01"
import { PortfolioSection } from "@/components/ui/project-showcase"
import { ProcessSection } from "@/components/ui/radial-orbital-timeline"
import { ContactSection } from "@/components/ui/contact-sections"
import { Footer } from "@/components/ui/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <main>
        <ResponsiveHeroBanner
          logoUrl="/logo.png"
          navLinks={[
            { label: "Home", href: "#home", isActive: true },
            { label: "About", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Portfolio", href: "#portfolio" },
            { label: "Contact", href: "#contact" }
          ]}
          ctaButtonText="Get Started"
          ctaButtonHref="#contact"
          badgeLabel="Global Agency"
          badgeText="Multi-Agency Solutions for Modern World"
          title="We Build Digital"
          titleLine2="Excellence"
          description="From software development to cybersecurity, we deliver comprehensive digital solutions that drive your business forward. Transform your ideas into powerful digital experiences."
          primaryButtonText="Our Services"
          primaryButtonHref="#services"
          secondaryButtonText="Contact Us"
          secondaryButtonHref="#contact"
          partnersTitle=""
          partners={[]}
        />
        <AboutSection />
        <ClientsSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
