import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserProfile, UserProfileCreate } from '@/types';

const USERS_COLLECTION = 'users';

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userDocRef = doc(db, USERS_COLLECTION, userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return { id: userSnapshot.id, ...userSnapshot.data() } as UserProfile;
  }
  
  return null;
};

export const createUserProfile = async (userId: string, data: UserProfileCreate): Promise<void> => {
  const userDocRef = doc(db, USERS_COLLECTION, userId);
  await setDoc(userDocRef, {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<void> => {
  const userDocRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userDocRef, {
    ...data,
    updatedAt: new Date()
  });
};
