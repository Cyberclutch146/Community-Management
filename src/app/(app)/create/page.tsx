export default function CreateEventPage() {
  return (
    <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <div className="mb-10">
        <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold">Create an Event</h2>
        <p className="text-secondary font-medium mt-2">Start a local response initiative to gather volunteers or necessary supplies.</p>
      </div>

      <div className="bg-surface-bright rounded-2xl p-8 border border-outline-variant/30">
        <p className="text-on-surface-variant mb-6 pb-6 border-b border-outline-variant/30">
          This form is a placeholder. In a full implementation, you'd add fields for the event title, description, location, and the specific needs (funds, volunteers, goods).
        </p>
        
        <form className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Event Title</label>
            <input type="text" className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface disabled:opacity-50" placeholder="e.g. Neighborhood Cleanup" disabled />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Description</label>
            <textarea className="w-full h-32 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface disabled:opacity-50 resize-none" placeholder="Describe the goal..." disabled></textarea>
          </div>

          <button type="button" disabled className="bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            Publish Event
          </button>
        </form>
      </div>
    </main>
  );
}
