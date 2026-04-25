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
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    name: 'Debadree Sekhar Das',
    role: 'AI Specialist & Integration',
    linkedin: 'https://www.linkedin.com/in/swagata-ganguly-453aa6327',
    github: 'https://www.linkedin.com/in/swagata-ganguly-453aa6327',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    name: 'Anuvab Das',
    role: 'Frontend Developer (UI/UX, Layouts)',
    linkedin: 'https://www.linkedin.com/in/anv-dev/',
    github: 'https://github.com/Stewy8506',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    name: 'Dhritiman Siva',
    role: 'Backend Features (Auth, Email, AI Gen)',
    linkedin: 'https://www.linkedin.com/in/dhritiman-siva-8501b9324/',
    github: 'https://github.com/Dhritiman-Siva',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  }
];

export default function AboutPage() {
  const router = useRouter()

  return (
    <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full pb-24">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-on-surface-variant font-medium mb-12 hover:text-on-surface transition-colors"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-16 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
          <HeartHandshake size={16} />
          Our Mission
        </div>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6 ${lora.className} leading-tight`}>
          Empowering communities through connection.
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          We are a community-driven platform dedicated to connecting local needs with neighborly support.
          Our mission is to empower grassroots organizing and ensure that help is available where it's needed most, immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="bg-surface-bright rounded-3xl p-8 border border-outline-variant/30 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center text-primary mb-6">
            <Users size={28} />
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-3">Community First</h3>
          <p className="text-on-surface-variant leading-relaxed">
            Everything we do is built around the power of local communities supporting each other without barriers.
          </p>
        </div>

        <div className="bg-surface-bright rounded-3xl p-8 border border-outline-variant/30 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary mb-6">
            <Globe size={28} />
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-3">Decentralized</h3>
          <p className="text-on-surface-variant leading-relaxed">
            No middlemen. Connect directly with the people and organizations running local initiatives on the ground.
          </p>
        </div>

        <div className="bg-surface-bright rounded-3xl p-8 border border-outline-variant/30 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary mb-6">
            <Shield size={28} />
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-3">Trust Driven</h3>
          <p className="text-on-surface-variant leading-relaxed">
            Verified organizers and transparent reporting to ensure every single contribution makes a tangible impact.
          </p>
        </div>
      </div>

      <div className="pt-10 border-t border-outline-variant/30">
        <div className="mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-on-surface mb-4 ${lora.className}`}>The Team</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Meet the developers and designers behind the Kindred Relief Network platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="group relative bg-surface-bright rounded-3xl p-6 border border-outline-variant/30 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6 text-2xl font-bold text-on-surface border border-outline-variant/50 shadow-sm">
                  {member.name.charAt(0)}
                </div>

                <h3 className="text-lg font-bold text-on-surface mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-primary mb-6 flex-1">
                  {member.role}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface-variant transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Briefcase size={18} />
                  </a>
                  <a
                    href={member.github.includes('github.com') ? member.github : `https://${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-surface-container hover:bg-on-surface hover:text-surface text-on-surface-variant transition-colors"
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
