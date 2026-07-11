import { useState } from "react"
import { Mail, MessageCircle, Send } from "lucide-react"
import { FaFacebookF, FaYoutube } from "react-icons/fa"

import homeData from "@/data/home.json"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function ContactMarquee({ text, reverse = false }) {
  const items = Array.from({ length: 14 }, (_, index) => index)

  return (
    <div className="marquee">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {[...items, ...items].map((_, index) => (
          <span
            key={index}
            className="mx-4 inline-flex items-center gap-4 text-base font-black uppercase tracking-[0.35em] text-white sm:mx-6 sm:gap-6 sm:text-2xl md:text-3xl"
          >
            <span>{text}</span>

            <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.9)]" />
          </span>
        ))}
      </div>
    </div>
  )
}

function SocialLink({
  href,
  icon: Icon,
  label,
  description,
  external = true,
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-4 border-b border-dashed border-white/15 px-1 py-5 transition-colors last:border-b-0 hover:border-orange-400/50"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition group-hover:border-orange-400/40 group-hover:bg-orange-500/10">
        <Icon className="h-5 w-5 text-zinc-300 transition group-hover:text-orange-400" />
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-black uppercase tracking-[0.18em] text-white">
          {label}
        </span>

        <span className="mt-1 block text-sm leading-6 text-zinc-400">
          {description}
        </span>
      </span>
    </a>
  )
}

export default function ContactSection() {
  const { contact } = homeData

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: contact.projectTypes[0] || "",
    message: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const createMessage = () => {
    return [
      "Hello NF Production,",
      "",
      `My name is ${formData.name || "Not provided"}.`,
      `Email: ${formData.email || "Not provided"}`,
      `Project type: ${formData.projectType || "Not specified"}`,
      "",
      "Project details:",
      formData.message || "No additional details provided.",
    ].join("\n")
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(createMessage())

    const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${message}`

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(
      `New ${formData.projectType || "production"} enquiry from ${
        formData.name || "a potential client"
      }`
    )

    const body = encodeURIComponent(createMessage())

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleWhatsApp()
  }

  return (
    <section
      id="contact"
      className="relative min-h-[100svh] overflow-hidden bg-[#030303] text-white"
    >
      <div className="relative z-20 border-y border-orange-400/40 bg-black/90 py-4 backdrop-blur-md">
        <ContactMarquee text={contact.topMarqueeText} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(30,136,229,0.18),transparent_32%),radial-gradient(circle_at_85%_70%,rgba(249,115,22,0.18),transparent_32%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:50px_50px]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-132px)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12 lg:py-28">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.45em] text-orange-400 sm:text-sm">
            {contact.eyebrow}
          </p>

          <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {contact.title}
          </h2>

          <div className="my-8 w-32 border-t border-dashed border-orange-400/70" />

          <p className="max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
            {contact.description}
          </p>

          <div className="mt-10 border-y border-dashed border-white/15">
            <SocialLink
              href={`https://wa.me/${contact.whatsappNumber}`}
              icon={MessageCircle}
              label="WhatsApp"
              description="Start a direct conversation with our production team."
            />

            <SocialLink
              href={`mailto:${contact.email}`}
              icon={Mail}
              label="Email"
              description={contact.email}
              external={false}
            />

            <SocialLink
                href={contact.facebookUrl}
                icon={FaFacebookF}
                label="Facebook"
                description="Follow our productions, announcements and updates."
            />

            <SocialLink
                href={contact.youtubeUrl}
                icon={FaYoutube}
                label="YouTube"
                description="Watch our films, series, trailers and latest releases."
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#0F1115]/90 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
              Project enquiry
            </p>

            <h3 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Tell us about your idea
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Label
                  htmlFor="contact-name"
                  className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300"
                >
                  Your name
                </Label>

                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="h-14 rounded-xl border-white/10 bg-black/40 px-4 text-white placeholder:text-zinc-600 focus-visible:border-orange-400 focus-visible:ring-orange-400/20"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="contact-email"
                  className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300"
                >
                  Email address
                </Label>

                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="h-14 rounded-xl border-white/10 bg-black/40 px-4 text-white placeholder:text-zinc-600 focus-visible:border-orange-400 focus-visible:ring-orange-400/20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="contact-project-type"
                className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300"
              >
                Project type
              </Label>

              <select
                id="contact-project-type"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
              >
                {contact.projectTypes.map((projectType) => (
                  <option
                    key={projectType}
                    value={projectType}
                    className="bg-zinc-950 text-white"
                  >
                    {projectType}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="contact-message"
                className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300"
              >
                Tell us about the project
              </Label>

              <Textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your idea, production needs, preferred dates and any important details..."
                required
                className="min-h-40 resize-none rounded-xl border-white/10 bg-black/40 px-4 py-4 text-white placeholder:text-zinc-600 focus-visible:border-orange-400 focus-visible:ring-orange-400/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                type="submit"
                className="h-14 rounded-full bg-orange-500 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-orange-400"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Send on WhatsApp
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleEmail}
                className="h-14 rounded-full border-blue-400/40 bg-blue-500/10 text-sm font-black uppercase tracking-[0.18em] text-blue-200 transition hover:bg-blue-500/20 hover:text-white"
              >
                <Send className="mr-2 h-5 w-5" />
                Send by Email
              </Button>
            </div>

            <p className="text-center text-xs leading-6 text-zinc-500">
              Your message will be prepared and opened in WhatsApp or your
              preferred email application.
            </p>
          </form>
        </div>
      </div>

      <div className="relative z-20 border-y border-blue-400/35 bg-black/90 py-4 backdrop-blur-md">
        <ContactMarquee text={contact.bottomMarqueeText} reverse />
      </div>
    </section>
  )
}