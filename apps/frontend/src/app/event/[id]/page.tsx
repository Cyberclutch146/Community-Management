"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <>
      {/* TopAppBar */}
      <header className="md:hidden bg-surface-bright font-body text-sm tracking-tight sticky top-0 border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.06)] flex justify-between items-center px-6 h-16 w-full z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-primary hover:bg-surface-container transition-colors p-2 rounded-full active:opacity-80 duration-150 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="font-headline text-xl font-bold text-primary">Outreach & Relief</div>
        </div>
        <div className="flex justify-end gap-2">
          <button className="text-primary hover:bg-surface-container transition-colors p-2 rounded-full active:opacity-80 duration-150 flex items-center justify-center">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-8 md:py-10 pb-32 md:pb-12 max-w-5xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <span className="inline-block bg-error-container text-on-error-container px-3 py-1 rounded-full text-xs font-bold font-label mb-3 uppercase tracking-wider">
                High Urgency
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-2">Downtown Winter Shelter Restock</h1>
              <p className="text-on-surface-variant text-lg">Supporting 150+ unhoused individuals during the upcoming cold front.</p>
            </div>
          </div>
          
          {/* Trust Section */}
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl mt-6 border border-outline-variant/30">
            <img alt="Organizer Avatar" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEpkia2o_SdloJ2jCjjqCFmMxof9fGKCDtnDWvejsHsksEM8RNS212veuOTqBV9s20DvwY2a0oq83RnRA7i0QViG0xKc2jNiZNsJzcDUBbzfY5-thxl8XFcZrOB8iKA7hzZRzlUMe1B_SSkx40bJf18yp0djbwuLRUnfVMUCY1NHwj2EUipcKE8QhAM1-9PXJxHb8-zbu5E_uwSOmpY8B4Y2qpVll-EFxb4c7k6pQBa6_OpeRdVMBIAperFw_w9ctuMttKovpYc6RY" />
            <div>
              <p className="font-bold text-on-surface font-body text-sm">Organized by Community Care Network</p>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Verified 501(c)(3) • 12 Past Campaigns
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Details Column (Span 2) */}
          <div className="md:col-span-2 space-y-6">
            {/* Cover Image */}
            <div className="rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(46,50,48,0.06)] aspect-[16/9]">
              <img alt="Campaign Cover" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkKJN0bRh2W0cie2OOYVvCVKwNCbLFZFngfn5qzwfQOtByg8kiTwj7EhJBb9O1f7vqETBPWrsXHGWfU6VCMW6yCInsV0FBhRXKHPyN-LOa2k7K2YSgHZMSTUQdWSnDLwpjUrx-GI21odeDpZE5ypDpGhwBG6zdaBN4tCtfzwKQqVxM0Sqlj6jJP4SFu0ce4p4qzoYaQTPpPo1nhnXNClU6pq6UmiSvaAsVeuGZ3XfhpTmbF4iQnZ7Nn2co4a-6UQ-W6iCw3QgfSWnX" />
            </div>

            {/* Progress Section */}
            <div className="bg-surface-container p-6 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
              <h2 className="text-xl font-headline font-bold text-on-surface mb-4">Campaign Progress</h2>
              <div className="mb-2 flex justify-between text-sm font-label font-bold">
                <span className="text-primary">$8,450 Raised</span>
                <span className="text-on-surface-variant">Goal: $10,000</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-3 mb-4 overflow-hidden">
                <div className="bg-primary h-3 rounded-full" style={{ width: '84%' }}></div>
              </div>
              <p className="text-sm text-on-surface-variant text-center">
                84% of financial goal met. <span className="font-bold text-on-surface">3 days remaining.</span>
              </p>
            </div>

            {/* Overview */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">Overview</h2>
              <p className="text-on-surface mb-4 text-base leading-relaxed">
                With temperatures expected to drop below freezing this weekend, our downtown shelter is facing a critical shortage of warm bedding and non-perishable food. We are mobilizing to restock supplies before the cold front hits.
              </p>
              <p className="text-on-surface text-base leading-relaxed">
                Your contributions directly fund the bulk purchase of thermal blankets, hot meal ingredients, and essential winter wear. Every dollar and item donated goes immediately to those seeking refuge from the cold.
              </p>
            </div>

            {/* Updates */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">Latest Updates</h2>
              <div className="border-l-2 border-primary/30 pl-4 py-1 relative">
                <div className="absolute -left-[5px] top-2 w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-xs text-on-surface-variant font-bold mb-1">Today, 9:00 AM</p>
                <p className="text-on-surface text-sm">We've secured a local vendor to match all blanket donations 1-for-1! Keep the momentum going.</p>
              </div>
            </div>
          </div>

          {/* Action Column (Span 1) */}
          <div className="md:col-span-1 space-y-6">
            {/* What's Needed Card */}
            <div className="bg-tertiary-container/10 p-6 rounded-xl border border-tertiary/20">
              <h3 className="text-lg font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">inventory_2</span>
                What's Needed Now
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Thermal Blankets</p>
                    <p className="text-xs text-on-surface-variant">50 needed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Non-Perishable Food</p>
                    <p className="text-xs text-on-surface-variant">Canned soups, energy bars</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-outline text-xl">pending</span>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Winter Coats</p>
                    <p className="text-xs text-on-surface-variant">Adult sizes L/XL</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Actions Container */}
            <div className="bg-surface-container p-6 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] flex flex-col gap-4 sticky top-24">
              <h3 className="text-xl font-headline font-bold text-on-surface mb-2 text-center">Take Action</h3>
              <Link href={`/event/${id}/donate`} className="w-full bg-primary text-on-primary py-3 px-6 rounded-xl font-bold font-label text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">payments</span>
                Donate Money
              </Link>
              <button className="w-full bg-surface-container-lowest text-primary border border-primary py-3 px-6 rounded-xl font-bold font-label text-base hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">shopping_bag</span>
                Contribute Goods
              </button>
              <button className="w-full bg-secondary-container text-on-secondary-container py-3 px-6 rounded-xl font-bold font-label text-base hover:bg-secondary-container/80 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">volunteer_activism</span>
                Volunteer Time
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
