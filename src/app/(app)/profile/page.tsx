'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/services/userService';
import { uploadImage } from '@/services/storageService';

export default function ProfilePage() {
  const { user, profile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');

  // Sync state initially
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setBio(profile.bio || '');
      setLocation(profile.location || '');
      setSkills(profile.skills ? profile.skills.join(', ') : '');
    }
  }, [profile, isEditing]);

  if (!user || !profile) {
    return (
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10 flex justify-center items-center">
        {!user ? (
          <p className="text-secondary">Please sign in to view your profile.</p>
        ) : (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        )}
      </main>
    );
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, `avatars/${user.uid}`);
      await updateUserProfile(user.uid, { avatarUrl: url });
      // The profile listener in AuthContext will automatically fetch the new URL.
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image. Please check permissions / rules.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.uid, {
        displayName: displayName.trim(),
        bio: bio.trim(),
        location: location.trim(),
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        profileComplete: true
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  const fallbackAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80";
  const currentAvatar = profile.avatarUrl || fallbackAvatar;

  return (
    <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
      <div className="bg-surface-bright rounded-3xl p-8 md:p-12 border border-outline-variant/30 flex flex-col items-center md:items-start text-center md:text-left gap-10">
        
        <div className="flex flex-col md:flex-row gap-8 w-full items-center md:items-start">
          <div className="relative flex-shrink-0 group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface-container relative bg-surface-container-low flex items-center justify-center">
              {uploadingImage ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              ) : (
                <Image src={currentAvatar} alt={profile.displayName || 'User'} className="w-full h-full object-cover" fill />
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary hover:bg-primary-container hover:text-on-primary-container text-on-primary p-3 rounded-full cursor-pointer shadow-lg transition-colors z-10 flex border-[3px] border-surface-bright">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
              </label>
            )}
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                {!isEditing ? (
                  <>
                    <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-bold mb-2">{profile.displayName || 'Anonymous'}</h2>
                    <p className="text-secondary font-medium mb-2">{profile.role === 'organizer' ? 'Community Organizer' : 'Community Volunteer'} • {profile.location || 'Unknown Location'}</p>
                    {profile.bio && <p className="text-on-surface-variant max-w-xl mb-4">{profile.bio}</p>}
                    {profile.skills && profile.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                        {profile.skills.map((skill, idx) => (
                          <span key={idx} className="bg-surface-container text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full border border-outline-variant/30">{skill}</span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4 w-full max-w-xl text-left">
                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-1">Display Name</label>
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-1">Bio</label>
                      <textarea 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface resize-none h-24" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-1">Location</label>
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-1">Skills (comma separated)</label>
                      <input 
                        type="text" 
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="e.g. First Aid, Carpentry, Driver"
                        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface" 
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-shrink-0">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface px-6 py-2.5 rounded-xl font-semibold border border-outline-variant/30 flex items-center gap-2 mx-auto md:mx-0">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2 justify-center md:justify-start mt-4 md:mt-0">
                    <button onClick={() => setIsEditing(false)} disabled={loading} className="bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl font-semibold hover:bg-surface-container transition-colors disabled:opacity-50">
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={loading} className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-50 flex items-center gap-2">
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {!isEditing && (
          <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full border-t border-outline-variant/30 pt-8 mt-2">
            <div className="bg-primary-container/30 px-6 py-4 rounded-2xl border border-primary-container/20 min-w-[200px]">
              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">Hours Volunteered</p>
              <p className="text-3xl font-bold text-on-surface">{profile.volunteerHours || 0}</p>
            </div>
            
            <div className="bg-tertiary-container/30 px-6 py-4 rounded-2xl border border-tertiary-container/20 min-w-[200px]">
              <p className="text-xs font-semibold text-tertiary mb-1 uppercase tracking-wider">Total Donated</p>
              <p className="text-3xl font-bold text-on-surface">${(profile.totalDonated || 0).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
