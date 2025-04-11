require("dotenv").config();
const admin = require("firebase-admin");
const fs = require("fs");

// Firebase credentials from .env
const serviceAccount = {
  type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const rawData = fs.readFileSync("electronics.json", "utf8");
const products = JSON.parse(rawData);

const uploadData = async () => {
  try {
    const batch = db.batch();

    for (let product of products) {
      const stringId = product.id?.toString();

      if (!stringId) {
        console.warn(`⚠️ Skipping product without ID:`, product);
        continue;
      }

      const docRef = db.collection("electronics").doc(stringId);

      // Use merge to **update** without wiping existing data
      batch.set(docRef, { ...product, id: stringId }, { merge: true });
    }

    await batch.commit();
    console.log("✅ All products updated successfully to Firestore!");
  } catch (error) {
    console.error("❌ Error uploading data to Firestore:", error);
  }
};

uploadData();
