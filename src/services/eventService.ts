import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, addDoc, query, orderBy, runTransaction, where, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
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
  lastVisible?: QueryDocumentSnapshot<DocumentData> | null
): Promise<PaginatedEvents> => {
  const eventsRef = collection(db, EVENTS_COLLECTION);

  let q;
  if (lastVisible) {
    q = query(eventsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(pageSize));
  } else {
    q = query(eventsRef, orderBy('createdAt', 'desc'), limit(pageSize));
  }

  const snapshot = await getDocs(q);
  const events = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as CommunityEvent[];

  const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  return {
    events,
    lastDoc,
    hasMore: snapshot.docs.length === pageSize
  };
};

// ─── Single event ───────────────────────────────────────
export const getEventById = async (eventId: string): Promise<CommunityEvent | null> => {
  const eventRef = doc(db, EVENTS_COLLECTION, eventId);
  const snapshot = await getDoc(eventRef);
  
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as CommunityEvent;
  }
  
  return null;
};

// ─── Events by organizer (for Dashboard) ────────────────
export const getEventsByOrganizer = async (userId: string): Promise<CommunityEvent[]> => {
  const eventsRef = collection(db, EVENTS_COLLECTION);
  const q = query(eventsRef, where('organizerId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as CommunityEvent[];
};

// ─── Create ─────────────────────────────────────────────
export const createEvent = async (data: CommunityEventCreate): Promise<string> => {
  const eventsRef = collection(db, EVENTS_COLLECTION);
  const docRef = await addDoc(eventsRef, {
    ...data,
    progress: 0,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  return docRef.id;
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
export const addVolunteerSignup = async (eventId: string, userId: string, userName: string): Promise<void> => {
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
    signedUpAt: new Date()
  });
};
