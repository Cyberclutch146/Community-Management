"use client";

import { use, useState } from "react";
import Link from "next/link";

type DonateStep = "amount" | "confirm" | "success";

export default function DonatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [step, setStep] = useState<DonateStep>("amount");
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  const presets = [25, 50, 100, 250];
  const selectedAmount = customAmount ? Number(customAmount) : amount;
  const newPercentage = Math.min(Math.round(((1200 + selectedAmount) / 2000) * 100), 100);

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 max-w-lg mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-5xl">favorite</span>
        </div>
        <h2 className="font-headline text-3xl font-bold text-on-surface">Thank You! 🎉</h2>
        <p className="text-secondary text-lg leading-relaxed">
          You just donated <span className="font-bold text-primary">${selectedAmount}</span> to<br />
          <span className="font-bold text-on-surface">Downtown Winter Shelter Restock</span>
        </p>
        <div className="card w-full">
          <p className="text-sm text-secondary mb-3">This brings the event to:</p>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-4xl font-bold font-headline text-primary">{newPercentage}%</span>
            <span className="text-secondary">funded</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill progress-fill-primary" style={{ width: `${newPercentage}%` }}></div>
          </div>
          <p className="text-xs text-outline mt-2">${(1200 + selectedAmount).toLocaleString()} of $2,000 raised</p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button className="btn-secondary w-full justify-center">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share on WhatsApp
          </button>
          <Link href="/" className="btn-tertiary w-full justify-center">
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <nav className="flex items-center gap-2 text-sm text-secondary">
          <button onClick={() => setStep("amount")} className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back
          </button>
        </nav>

        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold text-on-surface">Confirm Donation</h2>
          <p className="text-secondary mt-1">Review the details before completing.</p>
        </div>

        <div className="card bg-surface-container flex flex-col gap-4">
          <div className="text-center border-b border-outline-variant/20 pb-4">
            <p className="text-4xl font-bold font-headline text-primary">${selectedAmount.toLocaleString()}</p>
            <p className="text-sm text-secondary mt-1">{isRecurring ? 'Monthly donation' : 'One-time donation'}</p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary">To</span>
              <span className="font-bold text-on-surface">Downtown Winter Shelter Restock</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Organizer</span>
              <span className="font-medium text-on-surface">Rose City Relief</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Display name</span>
              <span className="font-medium text-on-surface">{isAnonymous ? 'Anonymous' : 'Sarah J.'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
            <input type="checkbox" className="w-5 h-5 accent-primary" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
            <div>
              <span className="text-sm font-bold text-on-surface">Make this anonymous</span>
              <p className="text-xs text-secondary">Your name won&apos;t appear in the supporters list</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
            <input type="checkbox" className="w-5 h-5 accent-primary" checked={isRecurring} onChange={() => setIsRecurring(!isRecurring)} />
            <div>
              <span className="text-sm font-bold text-on-surface">Make this monthly</span>
              <p className="text-xs text-secondary">Automatically donate ${selectedAmount} each month</p>
            </div>
          </label>
        </div>

        <button onClick={() => setStep("success")} className="btn-primary w-full justify-center text-base py-4">
          <span className="material-symbols-outlined text-[20px]">lock</span>
          Complete Donation — ${selectedAmount}
        </button>
        <p className="text-xs text-outline text-center">Secured with 256-bit encryption. Your payment info is never stored.</p>
      </div>
    );
  }

  // Step: amount selection
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <nav className="flex items-center gap-2 text-sm text-secondary">
        <Link href={`/event/${id}`} className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to event
        </Link>
      </nav>

      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-on-surface">Make a Donation</h2>
        <p className="text-secondary mt-1">Downtown Winter Shelter Restock</p>
        <p className="text-xs text-outline mt-0.5">by Rose City Relief • ✓ Verified</p>
      </div>

      {/* Current progress */}
      <div className="card bg-surface-container">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-lg font-bold font-headline text-on-surface">$1,200 raised</span>
          <span className="text-sm text-secondary">of $2,000 goal</span>
        </div>
        <div className="progress-track mb-2">
          <div className="progress-fill progress-fill-primary" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs text-outline">60% funded • $800 remaining</p>
      </div>

      {/* Amount selection */}
      <div className="flex flex-col gap-4">
        <h3 className="font-headline font-bold text-on-surface">Choose an amount</h3>
        <div className="grid grid-cols-2 gap-3">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => { setAmount(p); setCustomAmount(""); }}
              className={`py-4 rounded-xl font-bold text-lg transition-all ${
                amount === p && !customAmount
                  ? 'bg-primary text-on-primary shadow-md scale-[1.02]'
                  : 'bg-surface-container text-on-surface border border-outline-variant/30 hover:border-primary/50'
              }`}
            >
              ${p}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label className="form-label">Custom amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-bold">$</span>
            <input
              type="number"
              placeholder="Enter amount"
              className="form-input pl-8"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min="1"
            />
          </div>
        </div>

        {/* Impact preview */}
        <div className="bg-primary-fixed/30 rounded-xl p-4 text-center">
          <p className="text-sm text-on-surface">
            Your <span className="font-bold text-primary">${selectedAmount}</span> would bring this event to{' '}
            <span className="font-bold text-primary">{newPercentage}%</span> funded
          </p>
        </div>
      </div>

      <button
        onClick={() => setStep("confirm")}
        disabled={selectedAmount <= 0}
        className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue — ${selectedAmount}
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  );
}
