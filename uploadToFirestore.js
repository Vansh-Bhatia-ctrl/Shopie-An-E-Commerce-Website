require("dotenv").config();
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

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

// File and collection settings
const FILE_PATH = path.join(__dirname, "products.json");
const COLLECTION_NAME = "products";

const updateProductImages = async () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      console.error(`❌ File '${FILE_PATH}' not found.`);
      return;
    }

    const rawData = fs.readFileSync(FILE_PATH, "utf8");
    const products = JSON.parse(rawData);

    const batch = db.batch();

    products.forEach((product, index) => {
      const docId = product.id ? String(product.id) : `product-${index}`;
      const docRef = db.collection(COLLECTION_NAME).doc(docId);

      // Update both `image` and `imageURL`
      batch.set(
        docRef,
        {
          image: product.image,
          imageURL: product.image, // You can also customize this separately if needed
        },
        { merge: true }
      );
    });

    await batch.commit();
    console.log(`✅ Successfully updated 'image' and 'imageURL' in '${COLLECTION_NAME}' collection!`);
  } catch (error) {
    console.error("❌ Error updating Firestore:", error);
  }
};

updateProductImages();
