import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY",
  "FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL",
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required Firebase credential: ${key}`);
  }
}

// Construct service account object
const serviceAccount = {
  type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
    ? process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
  client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
};

// Debugging: Ensure private key format is correct
console.log("🔑 Private Key Start:", serviceAccount.private_key?.slice(0, 30));
console.log("🔑 Private Key End:", serviceAccount.private_key?.slice(-30));

try {
  if (!admin.apps.length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
    console.log("🔥 Firebase Admin initialized successfully.");
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin:", error);
  throw error;
}

const db = getFirestore();

export { db };
