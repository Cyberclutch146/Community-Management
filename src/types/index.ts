import { Timestamp } from 'firebase/firestore';

// ─── User ───────────────────────────────────────────────
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  bio: string;
  location: string;
  phone: string;
  skills: string[];
  avatarUrl: string;
  role: string;
  volunteerHours: number;
  totalDonated: number;
  profileComplete: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type UserProfileCreate = Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>;

// ─── Event ──────────────────────────────────────────────
export interface EventNeeds {
  volunteers?: { current: number; goal: number };
  funds?: { current: number; goal: number };
  goods?: string[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  organizer: string;
  organizerId: string;
  location: string;
  distance: string;
  category: string;
  urgency: 'high' | 'normal';
  imageUrl: string;
  needs: EventNeeds;
  progress: number;
  status: 'active' | 'completed';
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type CommunityEventCreate = Omit<CommunityEvent, 'id' | 'createdAt' | 'updatedAt' | 'progress' | 'status'>;

// ─── Donation ───────────────────────────────────────────
export interface Donation {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  createdAt: Timestamp | null;
}

// ─── Signup ─────────────────────────────────────────────
export interface Signup {
  id: string;
  userId: string;
  userName: string;
  signedUpAt: Timestamp | null;
}

// ─── Message ────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: Timestamp | null;
}
