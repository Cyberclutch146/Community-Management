import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { CommunityEvent, CommunityEventCreate } from '@/types';

const EVENTS_COLLECTION = 'events';

export const getEvents = async (): Promise<CommunityEvent[]> => {
  const eventsRef = collection(db, EVENTS_COLLECTION);
  const q = query(eventsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as CommunityEvent[];
};

export const getEventById = async (eventId: string): Promise<CommunityEvent | null> => {
  const eventRef = doc(db, EVENTS_COLLECTION, eventId);
  const snapshot = await getDoc(eventRef);
  
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as CommunityEvent;
  }
  
  return null;
};

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

export const updateDonation = async (eventId: string, currentFunds: number, amount: number): Promise<void> => {
  const eventRef = doc(db, EVENTS_COLLECTION, eventId);
  await updateDoc(eventRef, {
    'needs.funds.current': currentFunds + amount,
    updatedAt: new Date()
  });
};

export const addVolunteerSignup = async (eventId: string, userId: string, userName: string, currentVolunteers: number): Promise<void> => {
  // Track the actual user who signed up using a subcollection
  const volunteerRef = collection(db, `${EVENTS_COLLECTION}/${eventId}/volunteers`);
  await addDoc(volunteerRef, {
    userId,
    userName,
    signedUpAt: new Date()
  });

  // Also increment the current volunteer count
  const eventRef = doc(db, EVENTS_COLLECTION, eventId);
  await updateDoc(eventRef, {
    'needs.volunteers.current': currentVolunteers + 1,
    updatedAt: new Date()
  });
};
