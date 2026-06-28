import { useEffect, useRef, useState } from "react"
import homeData from "@/data/home.json"

function Marquee({ text, reverse = false }) {
  const items = Array.from({ length: 16 }, (_, index) => index)

  return (
    <div className="marquee">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {[...items, ...items].map((_, index) => (
          <span
            key={index}
            className="mx-4 inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.3em] text-white sm:mx-6 sm:gap-6 sm:text-2xl md:text-3xl"
          >
            <span>{text}</span>
            <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.9)]" />
          </span>
        ))}
      </div>
    </div>
  )
}

function ServiceContent({ service }) {
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-12">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 sm:rounded-[2rem]">
        <img
          src={service.image}
          alt={service.title}
          className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[520px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-orange-400/40 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-300 backdrop-blur-md">
          {service.number}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-orange-400 sm:text-sm sm:tracking-[0.45em]">
          {service.subtitle}
        </p>

        <h3 className="mb-5 text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          {service.title}
        </h3>

        <p className="max-w-xl text-sm leading-7 text-zinc-300 sm:text-lg sm:leading-8">
          {service.description}
        </p>

        <div className="mt-7 h-px w-28 border-t border-dashed border-orange-400/70 sm:w-32" />
      </div>
    </div>
  )
}

export default function ServicesShowcaseSection() {
  const { servicesShowcase } = homeData

  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const [translateX, setTranslateX] = useState(0)
  const [sectionHeight, setSectionHeight] = useState("300vh")

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track) return

    let frameId = null
    let scrollDistance = 0

    const calculate = () => {
      scrollDistance = Math.max(track.scrollWidth - window.innerWidth, 0)
      setSectionHeight(`${window.innerHeight + scrollDistance}px`)
    }

    const update = () => {
      const start = section.offsetTop
      const currentScroll = window.scrollY

      const progress = scrollDistance
        ? Math.min(Math.max((currentScroll - start) / scrollDistance, 0), 1)
        : 0

      setTranslateX(progress * scrollDistance)
    }

    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(update)
    }

    const handleResize = () => {
      calculate()
      update()
    }

    calculate()
    update()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)

      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#030303] text-white"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,136,229,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.16),transparent_35%)]" />

        <div className="absolute left-0 top-0 z-20 w-full border-y border-orange-400/40 bg-black/85 py-3 backdrop-blur-md sm:py-4">
          <Marquee text={servicesShowcase.topMarqueeText} />
        </div>

        <div
          ref={trackRef}
          className="relative z-10 flex h-full pt-20 pb-20 will-change-transform sm:pt-24 sm:pb-24"
          style={{
            transform: `translate3d(-${translateX}px, 0, 0)`,
          }}
        >
          {servicesShowcase.services.map((service, index) => (
            <article
              key={service.title}
              className={`flex h-full w-screen shrink-0 items-center ${
                index !== servicesShowcase.services.length - 1
                  ? "border-r border-dashed border-orange-400/45"
                  : ""
              }`}
            >
              <ServiceContent service={service} />
            </article>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 z-20 w-full border-y border-blue-400/35 bg-black/85 py-3 backdrop-blur-md sm:py-4">
          <Marquee text={servicesShowcase.bottomMarqueeText} reverse />
        </div>
      </div>
    </section>
  )
}