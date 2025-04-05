import { db } from "@/app/lib/firebaseAdmin";
import { auth } from "firebase-admin";

export async function generateStaticParams() {
  const user = auth.currentuser;
  const uid = user.uid;

  // Fetch the user's orders from the database
  const products = await db
    .collection("users")
    .doc(uid)
    .collection("orders")
    .get();
  return products.docs.map((product) => ({ products: product.id }));
}

export default async function OrderedProduct({ params }) {
  const { products } = await params;
  const productSnapshot = await db.collection("users").doc(products).get();
  const productData = productSnapshot.data();
  console.log(productData);
  return <p>Product page</p>;
}
