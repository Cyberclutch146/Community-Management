import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, query, orderBy, runTransaction, where, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { CommunityEvent, CommunityEventCreate } from '@/types';

const EVENTS_COLLECTION = 'events';
const BACKEND_URL = 'http://localhost:5000/api';

// Helper to wrap date strings into a Firebase-like Timestamp object for frontend compatibility
const wrapDate = (dateStr: any) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return {
    toDate: () => date,
    toISOString: () => date.toISOString(),
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: 0
  };
};

// ─── Paginated fetch ────────────────────────────────────
export interface PaginatedEvents {
  events: CommunityEvent[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

export const getEvents = async (
  pageSize: number = 50,
  skip: number = 0
): Promise<PaginatedEvents> => {
  try {
    const response = await fetch(`${BACKEND_URL}/campaigns?limit=${pageSize}&skip=${skip}`);
    
    if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();

    if (!result.success) throw new Error(result.error);

    const events = result.data.map((event: any) => ({
      ...event,
      createdAt: wrapDate(event.createdAt),
      updatedAt: wrapDate(event.updatedAt)
    })) as CommunityEvent[];

    return {
      events,
      lastDoc: null, // Mongoose uses skip/limit pagination, not cursors
      hasMore: events.length === pageSize
    };
  } catch (error) {
    console.error('Failed to fetch events from backend, falling back to Firebase:', error);
    
    // Fallback to Firebase
    try {
      const eventsRef = collection(db, EVENTS_COLLECTION);
      const q = query(eventsRef, orderBy('createdAt', 'desc'), limit(pageSize));
      const snapshot = await getDocs(q);
      
      const events = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CommunityEvent[];

      return {
        events,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
        hasMore: snapshot.docs.length === pageSize
      };
    } catch (fbError) {
      console.error('Firebase fallback also failed:', fbError);
      throw error; // Re-throw the original backend error if fallback also fails
    }
  }
};

// ─── Single event ───────────────────────────────────────
export const getEventById = async (eventId: string): Promise<CommunityEvent | null> => {
  try {
    const response = await fetch(`${BACKEND_URL}/campaigns/${eventId}`);
    // If you haven't implemented getById yet, we'll need it.
    // For now, let's assume it works or we can filter getEvents.
    // I'll update the controller to support findById soon.
    const result = await response.json();

    if (result.success && result.data) {
      return {
        ...result.data,
        createdAt: wrapDate(result.data.createdAt),
        updatedAt: wrapDate(result.data.updatedAt)
      } as CommunityEvent;
    }
    
    // Fallback to Firebase for now if not found in Mongoose
    const eventRef = doc(db, EVENTS_COLLECTION, eventId);
    const snapshot = await getDoc(eventRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as CommunityEvent;
    }

    return null;
  } catch (error) {
    return null;
  }
};

// ─── Events by organizer (for Dashboard) ────────────────
export const getEventsByOrganizer = async (userId: string): Promise<CommunityEvent[]> => {
  try {
    // We'll need a filter on the backend for this
    const response = await fetch(`${BACKEND_URL}/campaigns?organizerId=${userId}`);
    const result = await response.json();

    if (result.success) {
      return result.data.map((event: any) => ({
        ...event,
        createdAt: wrapDate(event.createdAt),
        updatedAt: wrapDate(event.updatedAt)
      })) as CommunityEvent[];
    }
    return [];
  } catch (error) {
    return [];
  }
};

// ─── Geocoding Helper ────────────────────────────────────
export const geocodeLocation = async (address: string): Promise<{lat: number, lng: number} | null> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
      headers: {
        'User-Agent': 'CommunityManagementApp/1.0'
      }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon) // Nominatim returns 'lon' instead of 'lng'
      };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }
  return null;
};

// ─── Create ─────────────────────────────────────────────
export const createEvent = async (data: CommunityEventCreate): Promise<string> => {
  try {
    let coords = (data.lat !== undefined && data.lng !== undefined) 
      ? { lat: data.lat, lng: data.lng } 
      : null;

    if (!coords && data.location) {
      coords = await geocodeLocation(data.location);
    }

    const response = await fetch(`${BACKEND_URL}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        ...(coords ? { lat: coords.lat, lng: coords.lng } : {}),
      }),
    });

    const result = await response.json();
    if (!result.success) throw new Error(result.error);

    return result.data.id;
  } catch (error: any) {
    console.error('Failed to create event in backend:', error);
    throw error;
  }
};

// ─── Donation (transactional) ───────────────────────────
export const updateDonation = async (eventId: string, amount: number): Promise<void> => {
  const eventRef = doc(db, EVENTS_COLLECTION, eventId);

  await runTransaction(db, async (transaction) => {
    const eventSnap = await transaction.get(eventRef);
    if (!eventSnap.exists()) throw new Error('Event not found');

    const data = eventSnap.data();
    const currentFunds = data.needs?.funds?.current ?? 0;

    transaction.update(eventRef, {
      'needs.funds.current': currentFunds + amount,
      updatedAt: new Date()
    });
  });
};

// ─── Volunteer signup (transactional) ───────────────────
export const addVolunteerSignup = async (eventId: string, userId: string, userName: string, userEmail: string = ''): Promise<void> => {
  const eventRef = doc(db, EVENTS_COLLECTION, eventId);

  await runTransaction(db, async (transaction) => {
    const eventSnap = await transaction.get(eventRef);
    if (!eventSnap.exists()) throw new Error('Event not found');

    const data = eventSnap.data();
    const currentVolunteers = data.needs?.volunteers?.current ?? 0;

    // Increment the volunteer count atomically
    transaction.update(eventRef, {
      'needs.volunteers.current': currentVolunteers + 1,
      updatedAt: new Date()
    });
  });

  // Track the volunteer in a subcollection (outside the transaction — this is append-only)
  const volunteerRef = collection(db, `${EVENTS_COLLECTION}/${eventId}/volunteers`);
  await addDoc(volunteerRef, {
    userId,
    userName,
    userEmail,
    signedUpAt: new Date()
  });

  // Also track at the user level for easy retrieval in dashboard
  const userRegistrationRef = doc(db, `users/${userId}/registrations`, eventId);
  await setDoc(userRegistrationRef, {
    eventId,
    signedUpAt: new Date(),
    status: 'registered'
  });
};

// ─── Volunteer Fetching ──────────────────────────────────
export interface EventVolunteer {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  signedUpAt: any;
  attended?: boolean;
}

export const getEventVolunteers = async (eventId: string): Promise<EventVolunteer[]> => {
  const volunteerRef = collection(db, `${EVENTS_COLLECTION}/${eventId}/volunteers`);
  const snapshot = await getDocs(query(volunteerRef, orderBy('signedUpAt', 'desc')));
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as EventVolunteer[];
};

export const updateVolunteerStatus = async (eventId: string, volunteerId: string, attended: boolean): Promise<void> => {
  const volunteerRef = doc(db, `${EVENTS_COLLECTION}/${eventId}/volunteers`, volunteerId);
  await updateDoc(volunteerRef, {
    attended,
    updatedAt: new Date()
  });
};

export const getRegisteredEvents = async (userId: string): Promise<CommunityEvent[]> => {
  const registrationsRef = collection(db, `users/${userId}/registrations`);
  const snapshot = await getDocs(registrationsRef);
  const eventIds = snapshot.docs.map(doc => doc.id);
  
  if (eventIds.length === 0) return [];
  
  // Fetch full event details for each registered event
  const events: CommunityEvent[] = [];
  for (const id of eventIds) {
    const event = await getEventById(id);
    if (event) events.push(event);
  }
  
  return events;
};

// ─── Bulk Coordinate Backfill ────────────────────────────
export const backfillEventCoordinates = async (): Promise<{ total: number, updated: number, failed: number }> => {
  const eventsRef = collection(db, EVENTS_COLLECTION);
  const snapshot = await getDocs(eventsRef);
  let updated = 0;
  let failed = 0;
  
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    if (data.lat === undefined || data.lng === undefined) {
      if (data.location) {
        // Respect Nominatim limits by waiting ~1.5s per request
        await new Promise(resolve => setTimeout(resolve, 1500));
        const coords = await geocodeLocation(data.location);
        if (coords) {
          await updateDoc(docSnap.ref, { lat: coords.lat, lng: coords.lng });
          updated++;
        } else {
          failed++;
        }
      }
    }
  }
  
  return { total: snapshot.docs.length, updated, failed };
};
