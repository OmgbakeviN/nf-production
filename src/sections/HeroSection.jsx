import { useEffect, useState } from "react"
import homeData from "@/data/home.json"

function useTypingEffect(text, speed = 75, restartDelay = 1800) {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!text) return

    let timeout

    if (index <= text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, index))
        setIndex((prev) => prev + 1)
      }, speed)
    } else {
      timeout = setTimeout(() => {
        setDisplayedText("")
        setIndex(0)
      }, restartDelay)
    }

    return () => clearTimeout(timeout)
  }, [index, text, speed, restartDelay])

  return displayedText
}

export default function HeroSection() {
  const { hero } = homeData
  const [activeSlide, setActiveSlide] = useState(0)

  const typedText = useTypingEffect(
    hero.slogan,
    hero.typingSpeed,
    hero.restartDelay
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % hero.slides.length)
    }, hero.slideDuration)

    return () => clearInterval(interval)
  }, [hero.slides.length, hero.slideDuration])

  const marqueeItems = Array.from({ length: 14 }, (_, index) => index)

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {hero.slides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt={`NF Production background ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,136,229,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.22),transparent_35%)]" />

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 pb-20 text-center sm:px-8 md:pb-24">
        <div className="max-w-5xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-orange-400 sm:text-sm">
            NF Production
          </p>

          <h1 className="cinematic-title min-h-[120px] text-4xl font-black uppercase leading-tight tracking-tight sm:min-h-[150px] sm:text-5xl md:min-h-[190px] md:text-7xl lg:text-8xl">
            {typedText}
            <span className="typing-cursor">|</span>
          </h1>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-20 w-full border-y border-orange-400/40 bg-black/85 py-4 backdrop-blur-md sm:py-5">
        <div className="marquee">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((_, index) => (
              <span
                key={index}
                className="mx-6 inline-flex items-center gap-6 text-lg font-black uppercase tracking-[0.35em] text-white sm:text-2xl md:text-3xl"
              >
                <span>{hero.marqueeText}</span>
                <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.9)]" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}