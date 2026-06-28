import homeData from "@/data/home.json"

export default function PresentationSection() {
  const { presentation } = homeData

  return (
    <section className="relative bg-[#030303] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,136,229,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_35%)]" />

      <div className="relative z-10">
        <div className="mx-auto flex min-h-[45vh] max-w-7xl items-end px-5 pb-12 pt-24 sm:px-8 lg:px-12">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-orange-400">
              {presentation.sectionLabel}
            </p>

            <h2 className="max-w-4xl text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Meet the vision behind{" "}
              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                NF Production
              </span>
            </h2>
          </div>
        </div>

        <div className="relative">
          {presentation.cards.map((card, index) => (
            <article
              key={card.eyebrow}
              className="sticky top-0 flex min-h-[100svh] items-center px-5 py-8 sm:px-8 lg:px-12"
              style={{
                zIndex: index + 1,
              }}
            >
              <div className="mx-auto grid min-h-[78svh] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F1115]/95 shadow-2xl shadow-black/60 backdrop-blur-xl lg:grid-cols-[1fr_auto_1fr]">
                <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/65" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                    0{index + 1}
                  </div>
                </div>

                <div className="hidden w-px border-l border-dashed border-orange-400/60 lg:block" />

                <div className="block border-t border-dashed border-orange-400/60 lg:hidden" />

                <div className="flex items-center px-6 py-10 sm:px-10 lg:px-14">
                  <div className="max-w-xl">
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.45em] text-orange-400 sm:text-sm">
                      {card.eyebrow}
                    </p>

                    <h3 className="mb-6 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
                      {card.title}
                    </h3>

                    <p className="text-base leading-8 text-zinc-300 sm:text-lg">
                      {card.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                        Film
                      </span>
                      <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                        Series
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                        Digital Content
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}