"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body relative overflow-x-hidden selection:bg-primary/20">
      {/* Grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-50 dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}></div>

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center px-8 md:px-16 lg:px-20 relative z-10 py-12"
        >
          <div className="absolute top-8 left-8 md:left-16 lg:left-20">
            <ThemeToggle />
          </div>
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-tertiary mb-8 flex items-center gap-3 mt-12 md:mt-0">
            <span className="w-8 h-[1px] bg-tertiary"></span>
            Community Relief Initiative
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[88px] font-light leading-[1.05] tracking-tight text-on-background mb-10">
            Rooted in<br />
            community,<br />
            <em className="italic text-primary">grown through care.</em>
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg font-light leading-relaxed max-w-md mb-14">
            Empowering our neighbors through dedicated relief efforts and sustainable community support. Join Kindred Relief Network in making a difference today.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/register" className="inline-flex items-center gap-3 px-8 py-4 bg-on-background text-background font-medium text-[13px] tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all duration-300 transform hover:-translate-y-1">
              Join Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 px-0 py-4 bg-transparent text-on-surface-variant font-medium text-[13px] tracking-wider uppercase hover:text-on-background transition-colors group">
              Login
              <svg className="transform transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[60vh] lg:h-full overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80"
            alt="Community hands"
            fill
            className="object-cover saturate-[0.85] brightness-90 dark:brightness-75 hover:scale-105 transition-transform duration-[8s] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 dark:from-background/60 to-transparent pointer-events-none" />
        </motion.div>
      </section>

      {/* WAYS TO HELP */}
      <section className="py-32 px-8 md:px-16 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 text-[11px] font-medium tracking-[0.18em] uppercase text-tertiary mb-6">
            <span>Ways to Help</span>
            <span className="flex-1 h-[1px] bg-outline-variant max-w-[80px]"></span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight tracking-tight text-on-background max-w-2xl mb-6">
            Every gesture<br /><em className="italic text-primary">shapes the community.</em>
          </h2>
          <p className="text-on-surface-variant font-light leading-relaxed max-w-lg">
            Whether you have time, resources, or skills to share, every contribution helps our community grow stronger.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-outline-variant/30">
          {/* Volunteer */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-surface p-10 md:p-16 relative overflow-hidden group transition-colors hover:bg-surface-container"
          >
            <div className="absolute top-0 left-0 w-1 h-0 bg-tertiary transition-all duration-500 group-hover:h-full"></div>
            <span className="absolute top-8 right-10 font-serif text-8xl md:text-[120px] font-light text-outline-variant/30 dark:text-outline-variant/10 tracking-tighter transition-colors group-hover:text-outline-variant/50 pointer-events-none select-none">01</span>
            
            <svg className="w-12 h-12 mb-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8l-2-2a2 2 0 0 0-2.83 0l.83.83L6 19a5 5 0 0 0 5 3h2a5 5 0 0 0 5-5v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1"/>
            </svg>
            <h3 className="font-serif text-3xl text-on-background mb-4 relative z-10">Volunteer Your Time</h3>
            <p className="text-on-surface-variant font-light leading-relaxed mb-10 max-w-sm relative z-10">
              Join our team of active volunteers. From sorting food to teaching classes, we have a place for you.
            </p>
            <Link href="/register" className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.1em] uppercase text-on-background border-b border-on-background pb-1 hover:text-tertiary hover:border-tertiary hover:gap-5 transition-all relative z-10">
              Browse Opportunities
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>

          {/* Donate */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-surface p-10 md:p-16 relative overflow-hidden group transition-colors hover:bg-surface-container"
          >
            <div className="absolute top-0 left-0 w-1 h-0 bg-tertiary transition-all duration-500 group-hover:h-full"></div>
            <span className="absolute top-8 right-10 font-serif text-8xl md:text-[120px] font-light text-outline-variant/30 dark:text-outline-variant/10 tracking-tighter transition-colors group-hover:text-outline-variant/50 pointer-events-none select-none">02</span>
            
            <svg className="w-12 h-12 mb-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h3 className="font-serif text-3xl text-on-background mb-4 relative z-10">Support Financially</h3>
            <p className="text-on-surface-variant font-light leading-relaxed mb-10 max-w-sm relative z-10">
              Your financial support directly funds our relief programs. $50 can provide 10 hot meals for local families.
            </p>
            <Link href="/register" className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.1em] uppercase text-on-background border-b border-on-background pb-1 hover:text-tertiary hover:border-tertiary hover:gap-5 transition-all relative z-10">
              Start Your Donation
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-on-primary py-32 px-8 md:px-16 lg:px-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full border border-on-primary/10 pointer-events-none"></div>
        <div className="absolute -bottom-40 right-20 w-[380px] h-[380px] rounded-full border border-on-primary/5 pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10"
        >
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-on-primary/60 mb-6">Join the Movement</p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-[72px] font-light leading-[1.05] tracking-tight mb-6">
              Ready to make<br />
              <em className="italic text-on-primary/80">a real difference?</em>
            </h2>
            <p className="text-on-primary/80 font-light leading-relaxed max-w-md">
              Our doors are always open, and our community is waiting for you. Together, we can build a more resilient neighborhood.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:w-max lg:ml-auto">
            <Link href="/register" className="inline-flex items-center justify-center px-12 py-5 bg-on-primary text-primary font-medium text-[13px] tracking-wider uppercase hover:bg-background transition-colors">
              Apply to Volunteer
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}