'use client'

import { Lora } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, Globe, Shield, Code, Briefcase, HeartHandshake } from 'lucide-react'

const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'] })

const TEAM_MEMBERS = [
  {
    name: 'Swagata Ganguly',
    role: 'Caffeine driven Developer (Full Stack, UI/UX , Backend & Architecture)',
    linkedin: 'https://www.linkedin.com/in/swagata-ganguly-453aa6327',
    github: 'https://github.com/Cyberclutch146',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentColor: 'var(--color-primary-base)',
  },
  {
    name: 'Debadree Sekhar Das',
    role: 'AI Specialist & Integration',
    linkedin: 'https://www.linkedin.com/in/swagata-ganguly-453aa6327',
    github: 'https://www.linkedin.com/in/swagata-ganguly-453aa6327',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: 'var(--color-warm-amber)',
  },
  {
    name: 'Anuvab Das',
    role: 'Frontend Developer (UI/UX, Layouts)',
    linkedin: 'https://www.linkedin.com/in/anv-dev/',
    github: 'https://github.com/Stewy8506',
    gradient: 'from-rose-500/20 to-pink-500/20',
    accentColor: 'var(--color-terracotta)',
  },
  {
    name: 'Dhritiman Siva',
    role: 'Backend Features (Auth, Email, AI Gen)',
    linkedin: 'https://www.linkedin.com/in/dhritiman-siva-8501b9324/',
    github: 'https://github.com/Dhritiman-Siva',
    gradient: 'from-sky-500/20 to-cyan-500/20',
    accentColor: 'var(--color-sage)',
  }
];

export default function AboutPage() {
  const router = useRouter()

  return (
    <main className="flex-1 p-4 md:p-10 max-w-6xl mx-auto w-full pb-24">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-on-surface-variant font-semibold mb-12 hover:text-on-surface transition-colors animate-fade-in-up"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-16 max-w-3xl animate-fade-in-up delay-100">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-semibold text-sm mb-6"
          style={{
            background: 'rgba(59,107,74,0.1)',
            color: 'var(--color-primary-base)',
            border: '1px solid rgba(59,107,74,0.15)',
          }}
        >
          <HeartHandshake size={16} />
          Our Mission
        </div>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${lora.className} leading-tight text-gradient-earth`}>
          Empowering communities through connection.
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          We are a community-driven platform dedicated to connecting local needs with neighborly support.
          Our mission is to empower grassroots organizing and ensure that help is available where it's needed most, immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: Users, title: 'Community First', desc: 'Everything we do is built around the power of local communities supporting each other without barriers.', color: 'rgba(59,107,74,0.1)', iconColor: 'var(--color-primary-base)' },
          { icon: Globe, title: 'Decentralized', desc: 'No middlemen. Connect directly with the people and organizations running local initiatives on the ground.', color: 'rgba(139,109,46,0.1)', iconColor: 'var(--color-warm-amber)' },
          { icon: Shield, title: 'Trust Driven', desc: 'Verified organizers and transparent reporting to ensure every single contribution makes a tangible impact.', color: 'rgba(194,113,91,0.1)', iconColor: 'var(--color-terracotta)' },
        ].map((card, i) => (
          <div
            key={card.title}
            className="premium-glass p-8 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${200 + i * 100}ms` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: card.color }}
            >
              <card.icon size={28} style={{ color: card.iconColor }} />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-3">{card.title}</h3>
            <p className="text-on-surface-variant leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-10" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="mb-12 animate-fade-in-up">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${lora.className} text-gradient-earth`}>The Team</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Meet the developers and designers behind the Kindred Relief Network platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 animate-fade-in-up"
              style={{
                background: 'var(--glass-bg-strong)',
                backdropFilter: 'blur(20px) saturate(1.3)',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--glass-shadow)',
                borderRadius: '24px',
                animationDelay: `${300 + index * 100}ms`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full p-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold text-on-surface transition-all duration-300"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 2px 8px rgba(42,45,43,0.06)',
                  }}
                >
                  {member.name.charAt(0)}
                </div>

                <h3 className="text-lg font-bold text-on-surface mb-1">{member.name}</h3>
                <p className="text-sm font-semibold mb-6 flex-1" style={{ color: member.accentColor }}>
                  {member.role}
                </p>

                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'var(--glass-bg)', color: 'var(--color-on-surface-variant-base)' }}
                    title="LinkedIn Profile"
                  >
                    <Briefcase size={18} />
                  </a>
                  <a
                    href={member.github.includes('github.com') ? member.github : `https://${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'var(--glass-bg)', color: 'var(--color-on-surface-variant-base)' }}
                    title="GitHub Profile"
                  >
                    <Code size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
