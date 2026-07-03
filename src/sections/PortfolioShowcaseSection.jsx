import { useEffect, useMemo, useRef, useState } from "react"
import homeData from "@/data/home.json"

function getYoutubeId(url) {
  if (!url) return ""

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/

  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : ""
}

function getYoutubeEmbedUrl(url, autoplay = false) {
  const videoId = getYoutubeId(url)

  if (!videoId) return ""

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  })

  if (autoplay) {
    params.set("autoplay", "1")
    params.set("mute", "1")
    params.set("loop", "1")
    params.set("playlist", videoId)
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

function YoutubeFrame({ project, autoplay = false, fullHeight = false }) {
  const embedUrl = getYoutubeEmbedUrl(project.trailerUrl, autoplay)

  return (
    <div
      className={
        fullHeight
          ? "relative h-full w-full overflow-hidden bg-black"
          : "relative aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl shadow-black/60"
      }
    >
      {embedUrl ? (
        <iframe
          key={`${project.id}-${project.trailerUrl}-${autoplay ? "auto" : "static"}`}
          className={
            fullHeight
              ? "absolute left-1/2 top-1/2 h-full min-h-full w-[180vh] min-w-full -translate-x-1/2 -translate-y-1/2"
              : "h-full w-full"
          }
          src={embedUrl}
          title={`${project.title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-sm text-zinc-400">
          Trailer unavailable
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  )
}

function ProjectContent({ project, index }) {
  return (
    <article
      className="min-h-[100svh] border-b border-dashed border-orange-400/35 py-16 lg:py-20"
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
            Project 0{index + 1}
          </p>

          <h3 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {project.title}
          </h3>
        </div>

        <span className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-300 sm:inline-flex">
          {project.category}
        </span>
      </div>

      <div className="mb-8 rounded-[2rem] border border-white/10 bg-[#0F1115]/80 p-3 shadow-2xl shadow-black/40 backdrop-blur-md">
        <YoutubeFrame project={project} />
      </div>

      <p className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
        {project.description}
      </p>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
        <img
          src={project.behindImage}
          alt={`${project.title} behind the scenes`}
          className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[520px]"
        />

        <div className="border-t border-dashed border-orange-400/35 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
            Behind the scenes
          </p>
        </div>
      </div>
    </article>
  )
}

function PortfolioCTA({ portfolioShowcase }) {
  return (
    <div className="rounded-[2rem] border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-white/5 to-blue-500/15 p-8 sm:p-10">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-orange-400">
        More Projects
      </p>

      <h3 className="max-w-2xl text-3xl font-black uppercase leading-tight sm:text-4xl">
        Want to explore more NF Production works?
      </h3>

      <p className="mt-5 max-w-xl leading-8 text-zinc-300">
        Discover more films, series, trailers and creative productions inside
        our full project gallery.
      </p>

      <a
        href={portfolioShowcase.buttonLink}
        className="mt-8 inline-flex rounded-full bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-[0.22em] text-black transition hover:bg-orange-400"
      >
        {portfolioShowcase.buttonText}
      </a>
    </div>
  )
}

export default function PortfolioShowcaseSection() {
  const { portfolioShowcase } = homeData

  const [activeProjectId, setActiveProjectId] = useState(
    portfolioShowcase.projects[0]?.id
  )

  const projectRefs = useRef({})

  const activeProject = useMemo(() => {
    return (
      portfolioShowcase.projects.find(
        (project) => project.id === activeProjectId
      ) || portfolioShowcase.projects[0]
    )
  }, [activeProjectId, portfolioShowcase.projects])

  useEffect(() => {
    let frameId = null

    const updateActiveProject = () => {
      const viewportCenter = window.innerHeight / 2

      let closestProjectId = activeProjectId
      let closestDistance = Infinity

      portfolioShowcase.projects.forEach((project) => {
        const element = projectRefs.current[project.id]

        if (!element) return

        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestProjectId = project.id
        }
      })

      if (closestProjectId && closestProjectId !== activeProjectId) {
        setActiveProjectId(closestProjectId)
      }
    }

    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateActiveProject)
    }

    updateActiveProject()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)

      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [activeProjectId, portfolioShowcase.projects])

  if (!activeProject) return null

  return (
    <section className="relative bg-[#030303] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,136,229,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.13),transparent_35%)]" />

      {/* Desktop layout */}
      <div className="relative z-10 hidden lg:grid lg:grid-cols-[48vw_1fr]">
        <aside className="sticky top-0 h-screen overflow-hidden border-r border-dashed border-orange-400/40 bg-black">
          <div key={activeProject.id} className="portfolio-slide-in h-full">
            <YoutubeFrame
              key={`left-video-${activeProject.id}`}
              project={activeProject}
              autoplay
              fullHeight
            />

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black via-black/70 to-transparent p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
                {activeProject.category} / {activeProject.year}
              </p>

              <h3 className="text-4xl font-black uppercase leading-tight tracking-tight">
                {activeProject.title}
              </h3>
            </div>
          </div>
        </aside>

        <div className="px-12 py-24">
          <div className="mb-20">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-orange-400">
              {portfolioShowcase.sectionLabel}
            </p>

            <h2 className="text-5xl font-black uppercase leading-tight tracking-tight xl:text-6xl">
              {portfolioShowcase.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
              {portfolioShowcase.description}
            </p>
          </div>

          <div className="space-y-20">
            {portfolioShowcase.projects.map((project, index) => (
              <div
                key={project.id}
                ref={(element) => {
                  projectRefs.current[project.id] = element
                }}
                data-project-id={project.id}
              >
                <ProjectContent project={project} index={index} />
              </div>
            ))}

            <PortfolioCTA portfolioShowcase={portfolioShowcase} />
          </div>
        </div>
      </div>

      {/* Mobile normal scroll */}
      <div className="relative z-10 px-5 py-20 sm:px-8 lg:hidden">
        <div className="mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
            {portfolioShowcase.sectionLabel}
          </p>

          <h2 className="text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl">
            {portfolioShowcase.title}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
            {portfolioShowcase.description}
          </p>
        </div>

        <div className="space-y-10">
          {portfolioShowcase.projects.map((project, index) => (
            <ProjectContent key={project.id} project={project} index={index} />
          ))}

          <PortfolioCTA portfolioShowcase={portfolioShowcase} />
        </div>
      </div>
    </section>
  )
}