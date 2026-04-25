'use client'

import { Lora } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, Globe, Shield } from 'lucide-react'

const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function AboutPage() {
  const router = useRouter()

  return (
    <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full pb-24">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary font-medium mb-8 hover:opacity-70 transition-opacity"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold text-on-surface mb-6 ${lora.className}`}>
          About Kindred Relief Network
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          We are a community-driven platform dedicated to connecting local needs with neighborly support. 
          Our mission is to empower grassroots organizing and ensure that help is available where it's needed most, immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30">
          <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary mb-4">
            <Users size={24} />
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Community First</h3>
          <p className="text-on-surface-variant text-sm">
            Everything we do is built around the power of local communities supporting each other.
          </p>
        </div>

        <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30">
          <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-secondary mb-4">
            <Globe size={24} />
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Decentralized</h3>
          <p className="text-on-surface-variant text-sm">
            No middleman. Connect directly with the people and organizations running local initiatives.
          </p>
        </div>

        <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30">
          <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center text-tertiary mb-4">
            <Shield size={24} />
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Trust Driven</h3>
          <p className="text-on-surface-variant text-sm">
            Verified organizers and transparent reporting to ensure every contribution makes an impact.
          </p>
        </div>
      </div>

      <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
        <h2 className={`text-3xl font-bold text-on-surface mb-6 ${lora.className}`}>Our Team</h2>
        <p className="text-on-surface-variant mb-8">
          This is a placeholder for our team page. We'll be updating this soon with more information about the people behind Kindred Relief Network.
        </p>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 bg-surface-bright border border-outline-variant/20 px-4 py-2 rounded-full shadow-sm">
              <div className="w-8 h-8 rounded-full bg-surface-container" />
              <span className="text-sm font-medium text-on-surface">Team Member {i}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
