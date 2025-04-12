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

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Read data from skincare.json
const rawData = fs.readFileSync("skincare.json", "utf8");
const skincareData = JSON.parse(rawData);

// 🔧 Configuration
const COLLECTION_NAME = "skincare";

const uploadSkincareDataToFirestore = async () => {
  try {
    const batch = db.batch();

    skincareData.forEach((product, index) => {
      const docId = product.id ? String(product.id) : `product-${index}`;
      const docRef = db.collection(COLLECTION_NAME).doc(docId);

      // Upload product data
      batch.set(docRef, product, { merge: true });
    });

    await batch.commit();
    console.log(`✅ Successfully uploaded data to '${COLLECTION_NAME}' collection!`);
  } catch (error) {
    console.error("❌ Error uploading data to Firestore:", error);
  }
};

uploadSkincareDataToFirestore();
