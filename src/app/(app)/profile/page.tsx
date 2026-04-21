import { currentUser } from '@/data/mockData';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <div className="bg-surface-bright rounded-3xl p-8 md:p-12 border border-outline-variant/30 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-surface-container relative">
          <Image src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" fill />
        </div>
        
        <div className="flex-1">
          <h2 className="font-headline text-3xl text-on-surface font-bold mb-1">{currentUser.name}</h2>
          <p className="text-secondary font-medium mb-6">{currentUser.role}</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-primary-container/30 px-6 py-4 rounded-2xl border border-primary-container/20">
              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Hours Volunteered</p>
              <p className="text-2xl font-bold text-on-surface">{currentUser.volunteerHours}</p>
            </div>
            
            <div className="bg-tertiary-container/30 px-6 py-4 rounded-2xl border border-tertiary-container/20">
              <p className="text-xs font-semibold text-tertiary mb-1 uppercase tracking-wider">Total Donated</p>
              <p className="text-2xl font-bold text-on-surface">${currentUser.totalDonated.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div>
          <button className="bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface px-6 py-2.5 rounded-xl font-semibold border border-outline-variant/30 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Profile
          </button>
        </div>
      </div>
    </main>
  );
}
