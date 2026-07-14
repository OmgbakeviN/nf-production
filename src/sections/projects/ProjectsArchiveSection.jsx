import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Link } from "react-router"

import projectsData from "@/data/projects.json"

const cardLayouts = {
  large: "md:col-span-7 md:row-span-2",
  wide: "md:col-span-7",
  tall: "md:col-span-5 md:row-span-2",
  standard: "md:col-span-5",
}

function ProjectMeta({ project, light = false }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] font-bold uppercase tracking-[0.24em] ${
        light ? "text-zinc-300" : "text-zinc-500"
      }`}
    >
      <span>{project.category}</span>

      <span
        className={`h-1 w-1 rounded-full ${
          light ? "bg-orange-400" : "bg-orange-500"
        }`}
      />

      <span>{project.year}</span>

      <span
        className={`h-1 w-1 rounded-full ${
          light ? "bg-blue-400" : "bg-blue-500"
        }`}
      />

      <span>{project.duration}</span>
    </div>
  )
}

function FeaturedProject({ project }) {
  const reduceMotion = useReducedMotion()

  if (!project) return null

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={project.id}
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -25 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0f] lg:grid-cols-[1.2fr_0.8fr]"
      >
        <Link
          to={`/projects/${project.slug}`}
          className="group relative min-h-[440px] overflow-hidden sm:min-h-[560px] lg:min-h-[700px]"
          aria-label={`View ${project.title}`}
        >
          <motion.img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: project.imagePosition || "center",
            }}
            initial={false}
            whileHover={reduceMotion ? undefined : { scale: 1.045 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

          <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/35 text-sm font-black tracking-[0.15em] text-white backdrop-blur-md sm:left-8 sm:top-8">
            {project.number}
          </div>

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-9 sm:left-9 sm:right-9 lg:hidden">
            <ProjectMeta project={project} light />

            <h3 className="mt-4 text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl">
              {project.title}
            </h3>
          </div>
        </Link>

        <div className="flex flex-col justify-center border-t border-dashed border-orange-400/30 px-6 py-10 sm:px-10 lg:border-l lg:border-t-0 lg:px-12 xl:px-16">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.4em] text-orange-400">
            Featured production
          </p>

          <ProjectMeta project={project} />

          <h3 className="mt-6 hidden text-5xl font-black uppercase leading-[0.92] tracking-[-0.035em] text-white lg:block xl:text-6xl">
            {project.title}
          </h3>

          <p className="mt-7 max-w-lg text-base leading-8 text-zinc-300 sm:text-lg">
            {project.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-orange-400"
            >
              View project
              <span className="ml-3 text-xl leading-none">↗</span>
            </Link>

            {project.trailerUrl && (
              <a
                href={project.trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-blue-400/50 hover:bg-blue-500/10"
              >
                <span className="mr-3 text-orange-400">▶</span>
                Watch trailer
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  )
}

function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion()

  const layoutClass =
    cardLayouts[project.layout] || cardLayouts.standard

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.94,
              y: 20,
            }
      }
      transition={{
        layout: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 0.35,
        },
      }}
      className={`group min-h-[480px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 ${layoutClass}`}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="relative block h-full min-h-[inherit] overflow-hidden"
        aria-label={`View ${project.title}`}
      >
        <motion.img
          src={project.coverImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: project.imagePosition || "center",
          }}
          initial={false}
          whileHover={reduceMotion ? undefined : { scale: 1.07 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/15 transition duration-500 md:from-black/95 md:via-black/10 md:group-hover:via-black/30" />

        <div className="absolute left-5 top-5 flex items-center gap-3">
          <span className="rounded-full border border-white/20 bg-black/45 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.22em] text-white backdrop-blur-md">
            {project.number}
          </span>

          <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-orange-300 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <motion.div
            initial={false}
            whileHover={reduceMotion ? undefined : { y: -8 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectMeta project={project} light />

            <h3 className="mt-4 max-w-2xl text-3xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300 opacity-100 md:max-h-0 md:translate-y-4 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-32 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              {project.description}
            </p>

            <div className="mt-5 inline-flex items-center text-xs font-black uppercase tracking-[0.25em] text-orange-400">
              View project
              <span className="ml-3 text-lg">↗</span>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      </Link>
    </motion.article>
  )
}

export default function ProjectsArchiveSection() {
  const { projectsSection } = projectsData
  const [activeCategory, setActiveCategory] = useState("All")
  const reduceMotion = useReducedMotion()

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projectsSection.projects
    }

    return projectsSection.projects.filter(
      (project) => project.category === activeCategory
    )
  }, [activeCategory, projectsSection.projects])

  const featuredProject = useMemo(() => {
    return (
      filteredProjects.find((project) => project.featured) ||
      filteredProjects[0] ||
      null
    )
  }, [filteredProjects])

  const archiveProjects = useMemo(() => {
    if (!featuredProject) return []

    return filteredProjects.filter(
      (project) => project.id !== featuredProject.id
    )
  }, [featuredProject, filteredProjects])

  return (
    <section className="relative overflow-hidden bg-[#030303] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(30,136,229,0.13),transparent_28%),radial-gradient(circle_at_92%_75%,rgba(249,115,22,0.12),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-8 border-b border-dashed border-white/20 pb-12 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.45em] text-orange-400">
              {projectsSection.eyebrow}
            </p>

            <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl">
              {projectsSection.title}
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              {projectsSection.description}
            </p>
          </div>

          <div className="lg:text-right">
            <p className="text-5xl font-black leading-none text-white sm:text-6xl">
              {String(filteredProjects.length).padStart(2, "0")}
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
              Productions
            </p>
          </div>
        </motion.header>

        <div className="sticky top-0 z-30 -mx-5 mt-0 overflow-x-auto border-b border-white/10 bg-black/85 px-5 py-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <div className="mx-auto flex min-w-max max-w-[1500px] items-center gap-3">
            {projectsSection.categories.map((category) => {
              const isActive = category === activeCategory

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative isolate overflow-hidden rounded-full border px-5 py-3 text-xs font-black uppercase tracking-[0.2em] transition sm:px-6 ${
                    isActive
                      ? "border-orange-400 text-black"
                      : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-orange-500"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="pt-12 lg:pt-16">
          {featuredProject ? (
            <FeaturedProject project={featuredProject} />
          ) : (
            <div className="flex min-h-[50vh] items-center justify-center rounded-[2rem] border border-dashed border-white/20">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">
                No projects available
              </p>
            </div>
          )}
        </div>

        {archiveProjects.length > 0 && (
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-6 md:auto-rows-[360px] md:grid-cols-12"
          >
            <AnimatePresence mode="popLayout">
              {archiveProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="mt-20 flex flex-col gap-8 border-t border-dashed border-white/20 pt-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-orange-400">
              NF Production
            </p>

            <h3 className="mt-4 max-w-3xl text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
              Every project begins with an idea worth bringing to life.
            </h3>
          </div>

          <a
            href="/#contact"
            className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-full border border-orange-400/40 bg-orange-500/10 px-7 text-sm font-black uppercase tracking-[0.18em] text-orange-300 transition hover:bg-orange-500 hover:text-black"
          >
            Start a project
            <span className="ml-3 text-xl">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}