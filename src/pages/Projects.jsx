import ProjectsHero from "@/sections/projects/ProjectsHero"
import ProjectsArchiveSection from "@/sections/projects/ProjectsArchiveSection"

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <ProjectsHero />
      <ProjectsArchiveSection />
    </main>
  )
}