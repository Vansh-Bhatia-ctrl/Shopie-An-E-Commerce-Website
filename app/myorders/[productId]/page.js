export const dynamic = "force-dynamic";

import OrderDetails from "@/app/components/OrderDetails";
import { db } from "@/app/lib/firebaseAdmin";
import { cookies } from "next/headers";

export default async function OrderedProduct({ params }) {
  const cookieStore = cookies();
  const uid = cookieStore.get("uid")?.value;
  const { productId } = params;
  const productSnapshot = await db
    .collection("users")
    .doc(uid)
    .collection("orders")
    .where("productId", "==", productId)
    .get();

  const orders = productSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.firebaseOrderId,
      ...data,
      createdAt: data.createdAt.toDate().toISOString(), // Convert Firestore Timestamp to ISO string
    };
  });
  console.log(orders);

  return (
    <>
      <OrderDetails initialOrder={orders} />
    </>
  );
}
