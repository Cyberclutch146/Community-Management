import Link from 'next/link';

interface EventCardProps {
  id: string;
  title: string;
  org: string;
  description: string;
  progress: number;
  type: 'urgent' | 'regular';
  currentAmount?: number;
  targetAmount?: number;
  currentVolunteers?: number;
  targetVolunteers?: number;
  distance?: string;
  deadline?: string;
  verified?: boolean;
}

const EventCard = ({
  id, title, org, description, progress, type,
  currentAmount, targetAmount,
  currentVolunteers, targetVolunteers,
  distance, deadline, verified = true
}: EventCardProps) => {
  const isUrgent = type === 'urgent';
  const displayAmount = currentAmount !== undefined && targetAmount !== undefined;
  const displayVolunteers = currentVolunteers !== undefined && targetVolunteers !== undefined;

  if (isUrgent) {
    return (
      <article className="col-span-1 md:col-span-2 lg:col-span-2 bg-surface-bright rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/20 flex flex-col md:flex-row group transition-all duration-300 hover:shadow-md">
        <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
          <img alt="Community event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHZDB862qHB0SiE-ix3mCjw7cni0f6XJl_BAQxc9SFXBVu8DcIUj1s0lbeqBu7YxwxTFIqdY6AWyrlP06Pwiuvad8FcIOMGQKj_JAc656-IemJ4Ugswh_fUiRwxqJ0Fo4bNJq3dGPIulS2vgoEqpn0uM2TTvbEm6YtFOo017swL7PIBCOuskEx-8VzDxi1cdpVILyLDfK2yAudf_cYEqIhFt5itS2mzPcqhuGX2iX6muKocfEVyTPZ-BGt7HfB01IFuesAAS_AKHJ-" />
          <div className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span> High Urgency
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-gradient-to-br from-surface-bright to-surface-container-low">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {verified ? (
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              ) : (
                <div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[12px] text-secondary">person</span>
                </div>
              )}
              <span className="text-sm font-semibold text-secondary">{org}</span>
              <span className="text-xs text-outline mx-1">•</span>
              <span className="text-xs text-outline">{distance} away</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-3 leading-tight">{title}</h3>
            <p className="text-on-surface-variant text-base mb-6 line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="mt-auto">
            {/* Needs Icons */}
            <div className="flex gap-4 mb-5">
              {displayVolunteers && <div className="flex flex-col items-center gap-1" title="Volunteers Needed">
                <div className="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">volunteer_activism</span>
                </div>
              </div>}
              {displayAmount && <div className="flex flex-col items-center gap-1" title="Funds Goal">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">payments</span>
                </div>
              </div>}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-secondary mb-1.5">
                <span>Goal Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <Link href={`/event/${id}`} className="w-full text-center bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-bright">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // STANDARD CARD
  return (
    <article className="bg-surface-bright rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/20 flex flex-col group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-4">
        {verified ? (
          <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
        ) : (
          <div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[12px] text-secondary">person</span>
          </div>
        )}
        <span className="text-sm font-semibold text-secondary">{org}</span>
        <span className="text-xs text-outline ml-auto">{distance}</span>
      </div>
      <h3 className="font-headline text-xl font-bold text-on-surface mb-2 leading-tight group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 flex-grow">
        {description}
      </p>

      {/* Progress bar specific to funds if applicable */}
      {displayAmount && !displayVolunteers && (
        <div className="mb-5">
          <div className="flex justify-between text-xs font-semibold text-secondary mb-1.5">
            <span>${currentAmount?.toLocaleString()} raised</span>
            <span>${targetAmount?.toLocaleString()} goal</span>
          </div>
          <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-tertiary rounded-full" style={{ width: `${Math.min((currentAmount as number / (targetAmount as number)) * 100, 100)}%` }}></div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mt-auto">
        <div className="flex gap-2">
           {displayVolunteers && (
             <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-primary" title="Volunteers Needed">
               <span className="material-symbols-outlined text-[18px]">group</span>
             </div>
           )}
           {displayAmount && (
             <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant" title="Funds Needed">
               <span className="material-symbols-outlined text-[18px]">payments</span>
             </div>
           )}
        </div>
        <Link href={`/event/${id}`} className="text-primary font-semibold text-sm hover:underline flex items-center gap-1 cursor-pointer">
          View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
};

export default EventCard;
