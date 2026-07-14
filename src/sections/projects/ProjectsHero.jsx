import { motion, useReducedMotion } from "motion/react"

import projectsData from "@/data/projects.json"

function getYoutubeId(value) {
  if (!value) return ""

  // Permet aussi d'utiliser directement un identifiant YouTube.
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return value
  }

  try {
    const url = new URL(value)
    const hostname = url.hostname.replace("www.", "")

    if (hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || ""
    }

    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/shorts/")[1]?.split("/")[0] || ""
    }

    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/embed/")[1]?.split("/")[0] || ""
    }

    return url.searchParams.get("v") || ""
  } catch {
    return ""
  }
}

function createYoutubeEmbedUrl(youtubeUrl) {
  const videoId = getYoutubeId(youtubeUrl)

  if (!videoId) return ""

  const parameters = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: videoId,
    playsinline: "1",
    disablekb: "1",
    fs: "0",
    rel: "0",
    iv_load_policy: "3",
  })

  return `https://www.youtube.com/embed/${videoId}?${parameters.toString()}`
}

function YoutubeBackground({
  youtubeUrl,
  orientation = "landscape",
  posterImage,
  videoScale = 1.05,
}) {
  const embedUrl = createYoutubeEmbedUrl(youtubeUrl)
  const reduceMotion = useReducedMotion()

  const isPortrait = orientation === "portrait"

  const videoSize = isPortrait
    ? {
        width: "max(100vw, 56.25vh)",
        height: "max(100vh, 177.78vw)",
      }
    : {
        width: "max(100vw, 177.78vh)",
        height: "max(100vh, 56.25vw)",
      }

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-black bg-cover bg-center"
      style={{
        backgroundImage: posterImage ? `url("${posterImage}")` : undefined,
      }}
    >
      {embedUrl && (
        <motion.div
          className="absolute left-1/2 top-1/2"
          initial={{
            x: "-50%",
            y: "-50%",
            scale: videoScale,
            opacity: 0,
          }}
          animate={{
            x: "-50%",
            y: "-50%",
            scale: reduceMotion ? videoScale : videoScale + 0.05,
            opacity: 1,
          }}
          transition={{
            opacity: {
              duration: 1.2,
              ease: "easeOut",
            },
            scale: {
              duration: 16,
              repeat: reduceMotion ? 0 : Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        >
          <iframe
            src={embedUrl}
            title="NF Production projects showreel"
            className="pointer-events-none block max-w-none border-0"
            style={videoSize}
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="eager"
            tabIndex={-1}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </div>
  )
}

function ProjectsMarquee({ text }) {
  const items = Array.from({ length: 8 }, (_, index) => index)

  return (
    <div className="projects-marquee overflow-hidden border-y border-orange-400/40 bg-black py-4 text-white sm:py-5">
      <div className="projects-marquee-track flex w-max">
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            className="flex shrink-0 items-center"
            aria-hidden={groupIndex === 1}
          >
            {items.map((item) => (
              <div
                key={`${groupIndex}-${item}`}
                className="flex shrink-0 items-center gap-5 px-5 sm:gap-7 sm:px-7"
              >
                <span className="text-lg font-black uppercase tracking-[0.3em] sm:text-2xl md:text-3xl">
                  {text}
                </span>

                <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.95)]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const contentContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.14,
    },
  },
}

const contentItem = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function ProjectsHero() {
  const { hero } = projectsData
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-black text-white">
        <YoutubeBackground
          youtubeUrl={hero.youtubeUrl}
          orientation={hero.videoOrientation}
          posterImage={hero.posterImage}
          videoScale={hero.videoScale}
        />

        {/* Overlay principal */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Dégradé supérieur et inférieur */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/85" />

        {/* Lumières bleu et orange */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(30,136,229,0.18),transparent_35%),radial-gradient(circle_at_85%_70%,rgba(249,115,22,0.20),transparent_38%)]" />

        {/* Léger grain visuel */}
        <div className="projects-hero-noise absolute inset-0 opacity-[0.08]" />

        <motion.div
          variants={contentContainer}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
        >
          <div className="w-full">
            <motion.div
              variants={contentItem}
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-orange-400 sm:w-20" />

              <p className="text-xs font-black uppercase tracking-[0.4em] text-orange-400 sm:text-sm">
                {hero.eyebrow}
              </p>
            </motion.div>

            <motion.h1
              variants={contentItem}
              className="max-w-6xl text-6xl font-black uppercase leading-[0.82] tracking-[-0.055em] sm:text-7xl md:text-8xl lg:text-[9rem]"
            >
              {hero.title}
            </motion.h1>

            <motion.div
              variants={contentItem}
              className="mt-8 flex flex-col gap-8 border-t border-dashed border-white/30 pt-7 md:flex-row md:items-end md:justify-between"
            >
              <p className="max-w-2xl text-base leading-8 text-zinc-200 sm:text-lg">
                {hero.description}
              </p>

              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">
                  Scroll to explore
                </span>

                <motion.span
                  className="flex h-11 w-7 items-start justify-center rounded-full border border-white/40 p-1.5"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, 5, 0],
                        }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="h-2 w-1 rounded-full bg-orange-400" />
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
      </section>

      <ProjectsMarquee text={hero.marqueeText} />
    </>
  )
}