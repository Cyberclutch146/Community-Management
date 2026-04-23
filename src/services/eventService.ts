import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, query, orderBy, runTransaction, where, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { CommunityEvent, CommunityEventCreate } from '@/types';

const EVENTS_COLLECTION = 'events';
// ─── Paginated fetch ────────────────────────────────────
export interface PaginatedEvents {
  events: CommunityEvent[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

export const getEvents = async (
  pageSize: number = 50,
  skip: number = 0 // Note: Firestore pagination uses cursors (startAfter), skip is not directly supported without a cursor. For simple implementation, we might just limit.
): Promise<PaginatedEvents> => {
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
  } catch (error) {
    console.error('Failed to fetch events from Firebase:', error);
    throw error;
  }
};

// ─── Single event ───────────────────────────────────────
export const getEventById = async (eventId: string): Promise<CommunityEvent | null> => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, eventId);
    const snapshot = await getDoc(eventRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as CommunityEvent;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch event by id:', error);
    return null;
  }
};

// ─── Events by organizer (for Dashboard) ────────────────
export const getEventsByOrganizer = async (userId: string): Promise<CommunityEvent[]> => {
  try {
    const eventsRef = collection(db, EVENTS_COLLECTION);
    const q = query(eventsRef, where('organizerId', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CommunityEvent[];
  } catch (error) {
    console.error('Failed to fetch events by organizer:', error);
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

    const eventData = {
      ...data,
      ...(coords ? { lat: coords.lat, lng: coords.lng } : {}),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
      progress: 0,
      needs: {
        ...data.needs,
        funds: {
          goal: data.needs?.funds?.goal || 0,
          current: 0
        },
        volunteers: {
          goal: data.needs?.volunteers?.goal || 0,
          current: 0
        }
      }
    };

    const docRef = await addDoc(collection(db, EVENTS_COLLECTION), eventData);
    return docRef.id;
  } catch (error: any) {
    console.error('Failed to create event in Firebase:', error);
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
