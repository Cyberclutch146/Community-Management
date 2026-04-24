import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #F5F0E8;
          --warm-white: #FAF8F4;
          --ink: #1A1713;
          --olive: #3D4A2E;
          --terracotta: #C4622D;
          --stone: #9A8F82;
          --mist: #E8E2D9;
          --gold: #B8965A;
        }

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--warm-white);
          color: var(--ink);
          overflow-x: hidden;
        }

        /* Grain texture overlay */
        .lp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
          opacity: 0.4;
        }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: flex-center;
          padding: 80px 64px 80px 80px;
          padding-top: 220px;
          position: relative;
          z-index: 2;
        }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--terracotta);
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--terracotta);
        }

        .hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(56px, 6vw, 88px);
          font-weight: 300;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0 0 40px;
        }

        .hero-title em {
          font-style: italic;
          color: var(--olive);
        }

        .hero-body {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.8;
          color: var(--stone);
          max-width: 380px;
          margin-bottom: 56px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          background: var(--ink);
          color: var(--cream);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .btn-primary:hover {
          background: var(--olive);
          transform: translateY(-2px);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: var(--stone);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: color 0.2s;
          padding: 0;
        }

        .btn-ghost:hover { color: var(--ink); }

        .btn-ghost svg {
          transition: transform 0.2s;
        }

        .btn-ghost:hover svg {
          transform: translateX(4px);
        }

        .hero-right {
          position: relative;
          overflow: hidden;
        }

        .hero-right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.85) brightness(0.92);
          transition: transform 8s ease;
        }

        .hero-right:hover img {
          transform: scale(1.03);
        }

        .hero-right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(26,23,19,0.12) 0%, transparent 60%);
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 48px;
          left: 80px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--stone);
          z-index: 2;
        }

        .scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, var(--stone));
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        /* ── IMPACT ── */
        .impact-section {
          padding: 120px 80px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--terracotta);
          margin-bottom: 72px;
        }

        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--mist);
          max-width: 80px;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--mist);
          border: 1px solid var(--mist);
        }

        .impact-card {
          background: var(--warm-white);
          padding: 56px 48px;
          transition: background 0.3s;
        }

        .impact-card:hover {
          background: var(--cream);
        }

        .impact-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 40px;
          opacity: 0.5;
        }

        .impact-number {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 72px;
          font-weight: 300;
          line-height: 1;
          color: var(--ink);
          letter-spacing: -0.03em;
          margin-bottom: 8px;
        }

        .impact-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--terracotta);
          margin-bottom: 20px;
        }

        .impact-desc {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.75;
          color: var(--stone);
        }

        /* ── URGENT NEEDS ── */
        .needs-section {
          background: var(--ink);
          padding: 120px 80px;
        }

        .needs-inner {
          max-width: 1240px;
          margin: 0 auto;
        }

        .needs-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 72px;
        }

        .needs-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(40px, 4vw, 64px);
          font-weight: 300;
          color: var(--cream);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .needs-title em {
          font-style: italic;
          color: var(--gold);
        }

        .needs-view-all {
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--stone);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 4px;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
          margin-bottom: 8px;
        }

        .needs-view-all:hover {
          color: var(--gold);
          border-color: var(--gold);
        }

        .needs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .need-card {
          position: relative;
          background: #222018;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: background 0.3s;
        }

        .need-card:hover { background: #282520; }

        .need-card-img {
          height: 260px;
          overflow: hidden;
          position: relative;
        }

        .need-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.7) brightness(0.75);
          transition: transform 0.7s ease, filter 0.5s ease;
        }

        .need-card:hover .need-card-img img {
          transform: scale(1.06);
          filter: saturate(0.9) brightness(0.85);
        }

        .need-card-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(to top, #222018, transparent);
        }

        .need-card-body {
          padding: 32px 36px 40px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .need-tag-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .need-tag {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          padding: 4px 12px;
          border: 1px solid rgba(184,150,90,0.3);
        }

        .need-urgency {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #E57373;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .need-urgency-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #E57373;
          animation: urgencyPulse 1.5s ease-in-out infinite;
        }

        @keyframes urgencyPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .need-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 26px;
          font-weight: 400;
          color: var(--cream);
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .need-desc {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.7;
          color: var(--stone);
          margin-bottom: 28px;
        }

        .need-progress-area {
          margin-top: auto;
        }

        .need-progress-bar {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin-bottom: 12px;
          position: relative;
          overflow: hidden;
        }

        .need-progress-fill {
          height: 100%;
          background: linear-gradient(to right, var(--gold), var(--terracotta));
          transition: width 1s ease;
        }

        .need-progress-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--stone);
          margin-bottom: 24px;
        }

        .need-progress-pct {
          color: var(--gold);
          font-weight: 500;
        }

        .need-cta {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--cream);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s;
        }

        .need-cta:hover {
          background: var(--terracotta);
          border-color: var(--terracotta);
        }

        /* ── WAYS TO HELP ── */
        .help-section {
          padding: 120px 80px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .help-section-header {
          margin-bottom: 80px;
        }

        .help-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(40px, 4vw, 64px);
          font-weight: 300;
          color: var(--ink);
          line-height: 1.05;
          letter-spacing: -0.02em;
          max-width: 540px;
          margin-bottom: 20px;
        }

        .help-section-title em {
          font-style: italic;
          color: var(--olive);
        }

        .help-section-sub {
          font-size: 15px;
          font-weight: 300;
          color: var(--stone);
          line-height: 1.75;
          max-width: 440px;
        }

        .help-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }

        .help-card {
          background: var(--cream);
          padding: 64px;
          position: relative;
          overflow: hidden;
          transition: background 0.4s;
        }

        .help-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 0;
          background: var(--terracotta);
          transition: height 0.4s ease;
        }

        .help-card:hover::before { height: 100%; }

        .help-card:hover { background: var(--mist); }

        .help-card-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 120px;
          font-weight: 300;
          color: var(--mist);
          line-height: 1;
          position: absolute;
          top: 24px;
          right: 40px;
          letter-spacing: -0.05em;
          user-select: none;
          pointer-events: none;
          transition: color 0.4s;
        }

        .help-card:hover .help-card-num { color: var(--warm-white); }

        .help-card-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 32px;
          color: var(--olive);
        }

        .help-card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 32px;
          font-weight: 400;
          color: var(--ink);
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .help-card-desc {
          font-size: 14px;
          font-weight: 300;
          color: var(--stone);
          line-height: 1.75;
          margin-bottom: 40px;
          max-width: 340px;
        }

        .help-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s, gap 0.2s;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        .help-link:hover {
          color: var(--terracotta);
          border-color: var(--terracotta);
          gap: 16px;
        }

        /* ── CTA ── */
        .cta-section {
          background: var(--olive);
          padding: 160px 80px;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 1px solid rgba(245,240,232,0.08);
        }

        .cta-section::after {
          content: '';
          position: absolute;
          bottom: -160px;
          right: 100px;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          border: 1px solid rgba(245,240,232,0.05);
        }

        .cta-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 80px;
          position: relative;
          z-index: 1;
        }

        .cta-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.5);
          margin-bottom: 24px;
        }

        .cta-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(40px, 4.5vw, 72px);
          font-weight: 300;
          color: var(--cream);
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin-bottom: 24px;
        }

        .cta-title em {
          font-style: italic;
          color: rgba(245,240,232,0.6);
        }

        .cta-sub {
          font-size: 15px;
          font-weight: 300;
          color: rgba(245,240,232,0.6);
          line-height: 1.75;
          max-width: 480px;
        }

        .cta-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-shrink: 0;
        }

        .btn-cta-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 48px;
          background: var(--cream);
          color: var(--olive);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.3s, color 0.3s;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-cta-primary:hover {
          background: white;
        }

        .btn-cta-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 48px;
          background: transparent;
          color: var(--cream);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid rgba(245,240,232,0.3);
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s;
          white-space: nowrap;
        }

        .btn-cta-ghost:hover {
          border-color: var(--cream);
          background: rgba(245,240,232,0.05);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 60px 32px; }
          .hero-right { height: 56vw; min-height: 320px; }
          .hero-scroll-hint { left: 32px; bottom: 24px; }
          .impact-section, .help-section { padding: 80px 32px; }
          .impact-grid, .help-grid, .needs-grid { grid-template-columns: 1fr; }
          .needs-section { padding: 80px 32px; }
          .needs-header { flex-direction: column; align-items: flex-start; gap: 24px; }
          .cta-section { padding: 80px 32px; }
          .cta-inner { grid-template-columns: 1fr; gap: 40px; }
          .help-card { padding: 40px 32px; }
          .impact-card { padding: 40px 32px; }
        }
      `}</style>

      <div className="lp-root">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-left">
            <span className="hero-eyebrow">Community Relief Initiative</span>
            <h1 className="hero-title">
              Rooted in<br/>
              community,<br/>
              <em>grown through care.</em>
            </h1>
            <p className="hero-body">
              Empowering our neighbors through dedicated relief efforts and sustainable community support. Join us in making a difference today.
            </p>
            <div className="hero-actions">
              <Link href="/register" className="btn-primary">
                Get Involved
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <button className="btn-ghost">
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
          <div className="hero-right">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6SsSRVlGYy_mYUBPddi5PP0YThIbaZOjDdbxdceDg1Y6UxF6lR23T8POlRObgpuxvvTDIgemtKHSk6ULAH8zMBeYYhFLPPR6xG3JggHWG8qMeJhf9bP7xWgBa02EDitKYJHAnyhB9qcai7rJAG3Gvw5XuoAnrg9DapfZkm0Q7na_aJgu6Cvx-HWuO24YEv4d25UPMK1HQJT_U6VknyixRH1bCSgVgHwpuQZCp6Zh_9LOBd2EzXwdbY784qMeRhQ88skYX-y_rNIUN"
              alt="Community hands"
            />
            <div className="hero-right-overlay" />
          </div>
          <div className="hero-scroll-hint">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── IMPACT ── */}
        <section className="impact-section">
          <div className="section-label">
            <span>Our Impact</span>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
              </svg>
              <p className="impact-number">25,000+</p>
              <p className="impact-label">Meals Served</p>
              <p className="impact-desc">Nutritious meals provided to individuals and families facing food insecurity in our local neighborhood.</p>
            </div>
            <div className="impact-card">
              <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <p className="impact-number">1,200+</p>
              <p className="impact-label">Families Supported</p>
              <p className="impact-desc">Comprehensive support services ranging from housing assistance to emergency financial relief.</p>
            </div>
            <div className="impact-card">
              <svg className="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <p className="impact-number">850+</p>
              <p className="impact-label">Active Volunteers</p>
              <p className="impact-desc">Dedicated community members giving their time and skills to help their neighbors thrive.</p>
            </div>
          </div>
        </section>

        {/* ── URGENT NEEDS ── */}
        <section className="needs-section">
          <div className="needs-inner">
            <div className="needs-header">
              <h2 className="needs-title">
                Where help is<br/>
                needed <em>most urgently</em>
              </h2>
              <Link className="needs-view-all" href="#">
                View all needs
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="needs-grid">
              {/* Card 1 */}
              <div className="need-card">
                <div className="need-card-img">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2DyHDK4PIljaP1_LoTm0iYljfDNOOXL5UQAoM-ZcvXbXYdBWfVUz-VpDzOTvM5P3jfiqSpAb8A9vv5xvbiZAkgBuMD2iKQB-splYez3yxGPX58Y7h2tY_vBsbRbLEbK5UExPhmQ3qr9JzVo6OU5dUzZn69BuqIMoz0QkJkiatYgRcsfZmEreGJXgYVDxW7PxYydGIwkQaYMj8FRw_tKqxCLr2U7l-yBK7FpyBGi3j6xCU2JIe1iVtiVL9jug0mTQ5wPmB9ma0x9tw" alt="Food Bank" />
                  <div className="need-card-img-overlay" />
                </div>
                <div className="need-card-body">
                  <div className="need-tag-row">
                    <span className="need-tag">Food Bank</span>
                    <span className="need-urgency">
                      <span className="need-urgency-dot" />
                      2 days left
                    </span>
                  </div>
                  <h3 className="need-title">Winter Food Stockpile</h3>
                  <p className="need-desc">We are running low on non-perishables and fresh protein for our weekly distributions.</p>
                  <div className="need-progress-area">
                    <div className="need-progress-bar">
                      <div className="need-progress-fill" style={{ width: '75%' }} />
                    </div>
                    <div className="need-progress-meta">
                      <span>$15,400 raised</span>
                      <span className="need-progress-pct">75% of $20,000</span>
                    </div>
                    <button className="need-cta">Help Fill the Pantry</button>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="need-card">
                <div className="need-card-img">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYszS18UATpB9Zid-0qbeUlL5dDWmUK_pG1SDR-GpkGlvU8Lz-wqEUnJS30PNRcXeKAXqYLBviqDECqfyBzsmfs2uy9ntr_SDPSp0gcbEUrvRwqcu06WLCCC_AgOz4fXV5fd0Lg4zqRTHrDgjvqM_R1lgOg4XIkJNTAASHlMb9I2uX0sJJdsaQCnQuJDXNQ1lMXi0SiuA8Rm47cfUYt_AjgXvVq9g8JZ0ax5hlmr8LHEW9LUzRKcf3SXuGR8xz7dCXhANcz-sl9_Uy" alt="Shelter" />
                  <div className="need-card-img-overlay" />
                </div>
                <div className="need-card-body">
                  <div className="need-tag-row">
                    <span className="need-tag">Housing</span>
                    <span className="need-urgency">
                      <span className="need-urgency-dot" />
                      Critical
                    </span>
                  </div>
                  <h3 className="need-title">Emergency Shelter Beds</h3>
                  <p className="need-desc">Providing safe, warm overnight stays for neighbors during the upcoming cold front.</p>
                  <div className="need-progress-area">
                    <div className="need-progress-bar">
                      <div className="need-progress-fill" style={{ width: '40%' }} />
                    </div>
                    <div className="need-progress-meta">
                      <span>$3,200 raised</span>
                      <span className="need-progress-pct">40% of $8,000</span>
                    </div>
                    <button className="need-cta">Provide Shelter</button>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="need-card">
                <div className="need-card-img">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB59GT3-vcQZBAHjD6uYEZ0YCXvr9iucOAJ7EowMxLN2NoNWC04h9w-L1jykbUWlT0hdsElaLZ-oKUa9LmC_4bcG9L8U9IYJWnvFr-SEoedtSLfbZaqfIX2vd3RuA9cM31SLSEJduBDdGemepa4srGqRfHqF7WloY2f6buH0Ftd2OFnz9OnQZmzprgDW3pQHSJD8gh2wY26Rlhx32xMNWYRUECOumf07rix0bPPFn67AKQX4x-eZXjAOfl8a6Td00fRS3dNj8kYNWs2" alt="Education" />
                  <div className="need-card-img-overlay" />
                </div>
                <div className="need-card-body">
                  <div className="need-tag-row">
                    <span className="need-tag">Education</span>
                    <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)' }}>Monthly</span>
                  </div>
                  <h3 className="need-title">After-School Tutoring</h3>
                  <p className="need-desc">Funding supplies and volunteer coordinators for our daily literacy program.</p>
                  <div className="need-progress-area">
                    <div className="need-progress-bar">
                      <div className="need-progress-fill" style={{ width: '90%' }} />
                    </div>
                    <div className="need-progress-meta">
                      <span>$4,500 raised</span>
                      <span className="need-progress-pct">90% of $5,000</span>
                    </div>
                    <button className="need-cta">Support Students</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAYS TO HELP ── */}
        <section className="help-section">
          <div className="help-section-header">
            <div className="section-label"><span>Ways to Help</span></div>
            <h2 className="help-section-title">
              Every gesture<br/><em>shapes the community.</em>
            </h2>
            <p className="help-section-sub">
              Whether you have time, resources, or skills to share, every contribution helps our community grow stronger.
            </p>
          </div>
          <div className="help-grid">
            {/* Volunteer */}
            <div className="help-card">
              <span className="help-card-num">01</span>
              <svg className="help-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8l-2-2a2 2 0 0 0-2.83 0l.83.83L6 19a5 5 0 0 0 5 3h2a5 5 0 0 0 5-5v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1"/>
              </svg>
              <h3 className="help-card-title">Volunteer Your Time</h3>
              <p className="help-card-desc">Join our team of over 800 active volunteers. From sorting food to teaching classes, we have a place for you.</p>
              <Link className="help-link" href="/register">
                Browse Opportunities
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Donate */}
            <div className="help-card">
              <span className="help-card-num">02</span>
              <svg className="help-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <h3 className="help-card-title">One-Time or Monthly Giving</h3>
              <p className="help-card-desc">Your financial support directly funds our relief programs. $50 can provide 10 hot meals for local families.</p>
              <button className="help-link">
                Start Your Donation
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <div>
              <p className="cta-eyebrow">Join the Movement</p>
              <h2 className="cta-title">
                Ready to make<br/>
                <em>a real difference?</em>
              </h2>
              <p className="cta-sub">Our doors are always open, and our community is waiting for you. Together, we can build a more resilient neighborhood.</p>
            </div>
            <div className="cta-actions">
              <Link href="/register" className="btn-cta-primary">Apply to Volunteer</Link>
              <button className="btn-cta-ghost">Donate Goods</button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}