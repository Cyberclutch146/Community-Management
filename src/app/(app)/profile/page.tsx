'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/services/userService';
import { uploadImage } from '@/services/storageService';
import { toast } from 'sonner';
import { getUserAvatar, DEFAULT_AVATAR } from '@/lib/avatar';

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
      toast.success('Profile photo updated!');
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error('Failed to upload image. Please check permissions.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!user) return;
    setUploadingImage(true);
    try {
       await updateUserProfile(user.uid, { avatarUrl: '' });
       toast.success('Profile photo removed!');
    } catch (err) {
       console.error("Error removing image:", err);
       toast.error('Failed to remove image.');
    } finally {
       setUploadingImage(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
      toast.success('Profile updated!');
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentAvatar = getUserAvatar(profile?.avatarUrl, profile?.displayName);

  if (isEditing) {
    return (
      <main className="flex-grow w-full max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-12 pb-24 md:pb-12">
        <div className="md:hidden mb-6 flex items-center justify-between">
            <button onClick={() => setIsEditing(false)} aria-label="Go back" className="text-primary p-2 -ml-2 rounded-full hover:bg-surface-variant transition-colors">
              <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-xl font-bold text-on-surface">Edit Profile</h1>
            <div className="w-10"></div>
        </div>

        <div className="hidden md:block mb-10 text-center">
          <h1 className="text-4xl font-bold text-on-surface mb-2 font-headline">Edit Profile</h1>
          <p className="text-on-surface-variant text-lg">Keep your profile current so neighbors can find and trust your support.</p>
        </div>
        <form onSubmit={handleSave} className="space-y-8 premium-panel p-6 md:p-10">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 border-b border-surface-variant pb-8">
            <div className="relative group">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-surface relative bg-surface-container flex items-center justify-center">
                {uploadingImage ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                ) : (
                  <Image src={currentAvatar} alt={profile.displayName || 'User'} className="w-full h-full object-cover" fill />
                )}
              </div>
            </div>
            <div className="text-center sm:text-left flex-1 mt-2 sm:mt-0">
              <h2 className="text-lg font-bold text-on-surface mb-1">Profile Photo</h2>
              <p className="text-sm text-on-surface-variant mb-4 max-w-sm">A clear, friendly photo helps build trust within the Kindred Relief community. Max size 5MB.</p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <label className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg text-sm font-medium hover:bg-surface-variant transition-colors cursor-pointer">
                  Upload New
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
                {profile.avatarUrl && (
                  <button onClick={handleRemoveImage} disabled={uploadingImage} className="px-4 py-2 bg-transparent text-error border border-error-container rounded-lg text-sm font-medium hover:bg-error-container/20 transition-colors" type="button">
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="displayName">Display Name</label>
              <input 
                id="displayName"
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How should we call you?"
                className="w-full bg-surface-container rounded-xl border-0 py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/50" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="bio">Bio</label>
              <textarea 
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell the community a bit about yourself and why you're here..."
                rows={4}
                className="w-full bg-surface-container rounded-xl border-0 py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/50 resize-y" 
              />
              <p className="text-xs text-on-surface-variant mt-2 text-right">{bio.length} / 300 characters</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="location">Location</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                  <span aria-hidden="true" className="material-symbols-outlined text-[20px]">location_on</span>
                </span>
                <input 
                  id="location"
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State or Region"
                  className="w-full bg-surface-container rounded-xl border-0 py-3 pl-11 pr-4 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/50" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2" htmlFor="skills">Skills (comma separated)</label>
              <input 
                id="skills"
                type="text" 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Carpentry, First Aid, Cooking"
                className="w-full bg-surface-container rounded-xl border-0 py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/50" 
              />
              <p className="text-xs text-on-surface-variant mt-2">These help us match you with relevant impact opportunities.</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="pt-6 border-t border-surface-variant flex flex-col-reverse sm:flex-row justify-end gap-4">
            <button onClick={() => setIsEditing(false)} disabled={loading} className="px-6 py-3 md:py-2.5 rounded-xl border border-outline-variant text-on-surface font-bold hover:bg-surface-variant transition-colors text-center sm:w-auto w-full" type="button">
              Cancel
            </button>
            <button disabled={loading} className="px-6 py-3 md:py-2.5 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 shadow-md hover:shadow-lg transition-all text-center sm:w-auto w-full disabled:opacity-50" type="submit">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-28 md:pb-12 w-full">
      {/* Profile Header - Bento Style */}
      <section className="grid grid-cols-1 gap-6">
        {/* Main Profile Card */}
        <div className="bg-surface-container rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border border-outline-variant/20 relative overflow-hidden">
          {/* Decorative subtle texture/gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-sm z-10 relative bg-surface-container flex justify-center items-center">
              <Image src={currentAvatar} alt={profile.displayName || 'User'} className="w-full h-full object-cover" fill />
            </div>
            {profile.profileComplete && (
              <div className="absolute bottom-0 right-0 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center border-2 border-surface z-20">
                <span className="material-symbols-outlined text-sm">verified</span>
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left flex-1 z-10">
            <h1 className="font-headline text-3xl font-bold text-on-surface mb-1">{profile.displayName || 'Anonymous'}</h1>
            <p className="font-body text-primary font-medium mb-3 flex items-center justify-center md:justify-start gap-1">
              <span className="material-symbols-outlined text-base">volunteer_activism</span>
              {profile.role === 'organizer' ? 'Community Organizer' : 'Community Volunteer'}
            </p>
            {profile.location && (
              <p className="font-body text-on-surface-variant text-sm flex items-center justify-center md:justify-start gap-1 mb-4">
                <span className="material-symbols-outlined text-sm">public</span>
                {profile.location}
              </p>
            )}
            {profile.bio && (
              <p className="font-body text-on-surface-variant text-sm mb-4 max-w-xl">
                {profile.bio}
              </p>
            )}
            
            {profile.skills && profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-4 justify-center md:justify-start">
                {profile.skills.map((skill, idx) => (
                  <span key={idx} className="bg-surface-container-low text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full border border-outline-variant/30">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
              <button onClick={() => setIsEditing(true)} className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors active:scale-95">Edit Profile</button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Cards - Bento Grid */}
      <section>
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">monitoring</span>
          Your Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hours Card */}
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-container/30 text-primary p-2 rounded-lg">
                <span className="material-symbols-outlined">schedule</span>
              </div>
            </div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Hours Volunteered</p>
            <p className="font-headline text-3xl font-bold text-on-surface">{profile.volunteerHours || 0}</p>
          </div>

          {/* Donated Card */}
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-tertiary/10 text-tertiary p-2 rounded-lg">
                <span className="material-symbols-outlined">favorite</span>
              </div>
            </div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Total Donated</p>
            <p className="font-headline text-3xl font-bold text-on-surface">${(profile.totalDonated || 0).toLocaleString()}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

