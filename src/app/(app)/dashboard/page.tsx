export default function DashboardPage() {
  return (
    <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <div className="mb-10">
        <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold">Your Impact Dashboard</h2>
        <p className="text-secondary font-medium mt-2">Track the events you're organizing and your volunteering activity.</p>
      </div>

      <div className="bg-surface-bright rounded-2xl p-8 border border-outline-variant/30 flex flex-col items-center justify-center text-center py-20">
        <span className="material-symbols-outlined text-[64px] text-surface-variant mb-4">volunteer_activism</span>
        <h3 className="font-headline text-xl text-on-surface font-bold mb-2">No activity yet</h3>
        <p className="text-on-surface-variant max-w-md">
          When you sign up to volunteer or donate to local events, your impact will be tracked here.
        </p>
      </div>
    </main>
  );
}
