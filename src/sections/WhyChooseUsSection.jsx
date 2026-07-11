import homeData from "@/data/home.json"

function distributeImages(images, columnCount) {
  const columns = Array.from({ length: columnCount }, () => [])

  images.forEach((image, index) => {
    columns[index % columnCount].push(image)
  })

  return columns
}

function GalleryColumn({
  images,
  direction = "up",
  duration = 28,
  delay = 0,
}) {
  const animationClass =
    direction === "down"
      ? "why-gallery-track-down"
      : "why-gallery-track-up"

  return (
    <div className="h-full overflow-hidden">
      <div
        className={`why-gallery-track ${animationClass}`}
        style={{
          "--gallery-duration": `${duration}s`,
          "--gallery-delay": `${delay}s`,
        }}
      >
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            className="why-gallery-group"
            aria-hidden={groupIndex === 1}
          >
            {images.map((image, imageIndex) => (
              <div
                key={`${groupIndex}-${image}-${imageIndex}`}
                className="relative h-[42svh] min-h-[260px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900 sm:h-[46svh] md:h-[52svh] md:rounded-[2rem]"
              >
                <img
                  src={image}
                  alt={
                    groupIndex === 0
                      ? `NF Production gallery ${imageIndex + 1}`
                      : ""
                  }
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WhyChooseUsSection() {
  const { whyChooseUs } = homeData

  const mobileColumns = distributeImages(whyChooseUs.images, 2)
  const desktopColumns = distributeImages(whyChooseUs.images, 3)

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-black text-white">
      {/* Mobile background gallery */}
      <div className="absolute inset-0 grid grid-cols-2 gap-3 p-3 md:hidden">
        <GalleryColumn
          images={mobileColumns[0]}
          direction="up"
          duration={34}
          delay={-8}
        />

        <GalleryColumn
          images={mobileColumns[1]}
          direction="down"
          duration={39}
          delay={-17}
        />
      </div>

      {/* Desktop background gallery */}
      <div className="absolute inset-0 hidden grid-cols-3 gap-4 p-4 md:grid lg:gap-6 lg:p-6">
        <GalleryColumn
          images={desktopColumns[0]}
          direction="up"
          duration={32}
          delay={-7}
        />

        <GalleryColumn
          images={desktopColumns[1]}
          direction="down"
          duration={38}
          delay={-19}
        />

        <GalleryColumn
          images={desktopColumns[2]}
          direction="up"
          duration={35}
          delay={-13}
        />
      </div>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.72)_100%,rgba(0,0,0,0.92)_100%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* Central content */}
      <div className="relative z-20 flex min-h-[100svh] items-center justify-center px-5 py-20 text-center sm:px-8">
        <div className="max-w-5xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.45em] text-orange-400 sm:text-sm">
            NF Production
          </p>

          <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
            {whyChooseUs.title}
          </h2>

          <div className="mx-auto my-8 w-28 border-t border-dashed border-orange-400 sm:w-40" />

          <p className="mx-auto max-w-3xl text-base leading-8 text-zinc-200 drop-shadow-lg sm:text-lg md:text-xl md:leading-9">
            {whyChooseUs.description}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
    </section>
  )
}