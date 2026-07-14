import { useEffect } from "react"
import { Link, useParams } from "react-router"

import projectsData from "@/data/projects.json"

export default function ProjectDetails() {
  const { slug } = useParams()

  const project = projectsData.projectsSection.projects.find(
    (item) => item.slug === slug
  )

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
  }, [slug])

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-5 text-center text-white">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-orange-400">
            404
          </p>

          <h1 className="mt-5 text-4xl font-black uppercase">
            Project not found
          </h1>

          <Link
            to="/projects"
            className="mt-8 inline-flex rounded-full bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-black"
          >
            Back to projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <section className="relative min-h-[100svh] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: project.imagePosition || "center",
          }}
        />

        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/45" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24">
          <div>
            <Link
              to="/projects"
              className="mb-10 inline-flex text-xs font-black uppercase tracking-[0.3em] text-orange-400"
            >
              ← Back to projects
            </Link>

            <p className="text-xs font-black uppercase tracking-[0.4em] text-orange-400">
              {project.category} / {project.year}
            </p>

            <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] sm:text-7xl lg:text-9xl">
              {project.title}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-200 sm:text-lg">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">
          The complete project gallery will be added in the next step.
        </p>
      </section>
    </main>
  )
}