import * as admin from 'firebase-admin';

// Check if admin has already been initialized
if (!admin.apps.length) {
  try {
    // Try to initialize with environment variables first (Vercel/Production standard)
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Replace escaped newlines with actual newlines
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      // Fallback: Try to use the local serviceAccountKey.json if it exists
      const serviceAccount = require('../../../serviceAccountKey.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
  } catch (error: any) {
    console.warn("⚠️ Firebase Admin initialization failed! Please set environment variables or provide serviceAccountKey.json.");
    console.warn("API routes performing writes will fail.");
    // We do not throw here to allow the app to build/start, but DB operations will fail later.
  }
}

// Export the admin db instance
export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminAuth = admin.apps.length ? admin.auth() : null;
