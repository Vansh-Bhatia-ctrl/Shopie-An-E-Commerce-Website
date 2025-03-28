require("dotenv").config(); // Load .env variables
const admin = require("firebase-admin");
const fs = require("fs");

// Firebase credentials from .env
const serviceAccount = {
  type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix new lines
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

const rawData = fs.readFileSync("products.json");
const products = JSON.parse(rawData);

const updateData = async () => {
  try {
    const batch = db.batch();
    
    products.forEach((product) => {
      const docRef = db.collection("products").doc(product.id.toString());

      const updatedProduct = {
        ...product,
        image: product.imageURL || product.image,  
        name: product.productName || product.name,  
      };

      // Remove old fields
      delete updatedProduct.imageURL;
      delete updatedProduct.productName;

      batch.set(docRef, updatedProduct, { merge: true });
    });

    await batch.commit();
    console.log("🔥 Firestore Data Updated: imageURL → image & productName → name");
  } catch (error) {
    console.error("❌ Error updating Firestore:", error);
  }
};

updateData();
