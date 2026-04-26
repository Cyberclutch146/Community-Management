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
      // We use fs to check for existence and JSON.parse to load it to avoid build-time "Module not found" errors
      const fs = require('fs');
      const path = require('path');
      const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');

      if (fs.existsSync(serviceAccountPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
      } else {
        console.warn("⚠️ No serviceAccountKey.json found at root and no environment variables set.");
      }
    }
  } catch (error: any) {
    console.warn("⚠️ Firebase Admin initialization failed:", error.message);
    console.warn("API routes performing writes will fail.");
  }
}

// Export the admin db instance
export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminAuth = admin.apps.length ? admin.auth() : null;
