import HeroSection from "@/sections/HeroSection"
import PresentationSection from "@/sections/PresentationSection"
import ServicesShowcaseSection from "@/sections/ServicesShowcaseSection"
import PortfolioShowcaseSection from "@/sections/PortfolioShowcaseSection"
import WhyChooseUsSection from "@/sections/WhyChooseUsSection"
import ContactSection from "@/sections/ContactSection"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PresentationSection />
      <ServicesShowcaseSection />
      <PortfolioShowcaseSection />
      <WhyChooseUsSection />
      <ContactSection />
    </main>
  )
}