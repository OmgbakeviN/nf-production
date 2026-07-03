import HeroSection from "@/sections/HeroSection"
import PresentationSection from "@/sections/PresentationSection"
import ServicesShowcaseSection from "@/sections/ServicesShowcaseSection"
import PortfolioShowcaseSection from "@/sections/PortfolioShowcaseSection"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PresentationSection />
      <ServicesShowcaseSection />
      <PortfolioShowcaseSection />
    </main>
  )
}