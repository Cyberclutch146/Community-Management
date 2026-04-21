import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative w-full min-h-[819px] flex items-center justify-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Hero Background"
            className="w-full h-full object-cover opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVw8-V2sAcrNrvwDgax6TV54k85HtKQHeNuti_X7v3pAXJ3vQdcGDSiYDURml1QR3WpgNLp_5mNVUoKfKtXccBhaezEzM9wz7YewCoXBI5v3gpmjV1r3HA3kwG5-PC6dCANpa2o1Wv2k4AHHMiU0UP6SbDXXGc9w58J9M2giWr-mF0KVeEnKI4yH6H-Y78qn-6K4LL-BpOgRBHBLOhBnEc1Akf-TulnHYIs0rHTywqvCf0pTWer0AoZjHy2a6Lrw60-bP8j4D-dy9n"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12 md:mt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-outline-variant/30 text-tertiary font-medium mb-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            <span>Outreach & Relief</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface mb-6 leading-tight">
            Rooted in community,<br />
            <span className="text-primary italic font-normal">grown through care.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant mb-12 max-w-3xl mx-auto font-body leading-relaxed">
            We believe in the power of localized, sustainable aid. Together, we can build resilience and restore hope in communities facing adversity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/feed" className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-xl font-medium text-lg hover:bg-surface-tint active:scale-95 transition-all duration-200 shadow-[0_4px_20px_rgba(46,50,48,0.1)] flex items-center justify-center gap-2">
              Get Involved
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
            </Link>
            <button className="w-full sm:w-auto bg-surface text-primary border-2 border-primary/20 px-8 py-4 rounded-xl font-medium text-lg hover:bg-surface-container active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
              Explore Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-[#4a7c59] uppercase mb-4">Core Initiatives</h2>
            <h3 className="text-4xl md:text-5xl font-['Literata'] font-bold text-stone-800 dark:text-stone-100 leading-tight">
              Where we direct <br/> our energy.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/50 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8_o7mB4kO0_vC6z0tP7W_0Y3J-9M3e99J-N0_k9_w9l8t2O5V-0yX6e9W0_N-_n8V0lK2c4dM5-o2W5F4Y2_I7_V-s8c6-V5tV_vM3R-zO6S4A_T1r5D4j3Y9I5B7_9B_0W_A4G7A4Y8" alt="Clean Water" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-full bg-[#4a7c59]/10 flex items-center justify-center text-[#4a7c59] mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
                </div>
                <h4 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-3">Clean Water Access</h4>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  Building sustainable filtration systems and wells in regions affected by drought and contamination.
                </p>
              </div>
            </div>
            
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/50 shadow-sm hover:shadow-xl transition-all duration-300 transform md:-translate-y-4">
              <div className="h-48 overflow-hidden relative">
                <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQeLXXzB0xXYhA_zIqG_U0z6OqX1xI_X8G9W0O2j_A8pE5O7K4D3jK1J1F2O7iZ9jJ7E-Z1i_Q8tP6Z5_S1rX4i7V_w0E4w1R-Z0tJ9_lJ-4jT7U6lK9wU4rY_L4P6vT_tV4" alt="Emergency Relief" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                </div>
                <h4 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-3">Disaster Response</h4>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  Rapid deployment of essential supplies, medical aid, and temporary shelter to areas hit by natural disasters.
                </p>
              </div>
            </div>
            
            <div className="group rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/50 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8kQ3F5C_yN9R5q2F3O7O0sO_S9U7tN0I3vH_Lz9v2X-z6S_m_6uF-z5F0_o2X0U-v_2O0vG2C8F3K6gO7p3V0O_Z5U3C4U7O_gO2_M0eJ9Q_hX6mR8G8X0O9eZ5G5jO0f_X9iO-uV3P-V_8J0_C_kP0X3kK5C0v_hT9lQ_d9zM_gN7M0" alt="Sustainable Agriculture" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
                </div>
                <h4 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-3">Sustainable Agriculture</h4>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  Empowering local farmers with tools, seeds, and education to build long-term food security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#4a7c59] text-[#faf6f0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#faf6f0] to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-['Literata'] font-bold mb-8">
            Your support makes a difference today.
          </h2>
          <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of volunteers and donors making a tangible impact in communities around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/feed" className="w-full sm:w-auto bg-[#faf6f0] text-[#4a7c59] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              Donate Now
            </Link>
            <Link href="/feed" className="w-full sm:w-auto bg-transparent border-2 border-emerald-300 text-emerald-50 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-800/30 active:scale-95 transition-all flex items-center justify-center gap-2">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
