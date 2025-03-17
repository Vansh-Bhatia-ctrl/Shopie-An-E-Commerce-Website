const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

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
      batch.set(docRef, product, { merge: true }); 
    });

    await batch.commit();
    console.log("Data successfully updated in Firestore!");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

updateData();
