const admin = require("firebase-admin");

let db;

try {
  const serviceAccount = require("../serviceAccountKey.json");
  
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  
  db = admin.firestore();
} catch (error) {
  console.warn("⚠️ Firebase Admin initialization failed! Please update serviceAccountKey.json with valid credentials.");
  console.warn(error.message);
  
  // Create a dummy db object so the API doesn't crash when calling db.collection.add
  db = {
    collection: () => ({
      add: async () => console.log("[Dummy DB] Would have saved to Firestore")
    })
  };
}

module.exports = db;
