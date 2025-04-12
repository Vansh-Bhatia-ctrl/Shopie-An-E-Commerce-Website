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

// Read data from clothing.json
const rawData = fs.readFileSync("clothing.json", "utf8");
const clothingData = JSON.parse(rawData);

// 🧠 Configuration for this run
const COLLECTION_NAME = "clothing";

const uploadClothingDataToFirestore = async () => {
  try {
    const batch = db.batch();

    clothingData.forEach((product, index) => {
      // Correct image path for the product (jeans in this case)
      if (product.name === "Men's Slim Fit Stretchable Jeans") {
        product.image = "/jeans.jpg";
      }

      const docId = product.id ? String(product.id) : `product-${index}`;
      const docRef = db.collection(COLLECTION_NAME).doc(docId);

      // Set product data to Firestore
      batch.set(docRef, product, { merge: true });
    });

    // Commit the batch write to Firestore
    await batch.commit();
    console.log(`✅ Successfully uploaded data to '${COLLECTION_NAME}' collection!`);
  } catch (error) {
    console.error("❌ Error uploading data to Firestore:", error);
  }
};

uploadClothingDataToFirestore();
