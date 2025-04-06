export const dynamic = "force-dynamic";

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

  const orders = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(orders);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-6 sm:flex sm:flex-row">
        <div className="flex flex-col gap-4 md:mt-2">
          <section className="flex flex-col border-2 w-[600px]  rounded-md md:w-[750px]">
            <div>
              <div className="p-4">
                <img
                  src={orders[0].image}
                  width={300}
                  height={300}
                  className="rounded-md"
                />
              </div>
              <div className="p-2 flex flex-col gap-1">
                <p className="font-bold ml-2 text-2xl">{orders[0].name}</p>
                <p className="font-semibold ml-2 text-omd text-gray-600">
                  {orders[0].description}
                </p>
                <p className="font-medium ml-2 text-o2md text-gray-600">
                  Quantity: {orders[0].quantity}
                </p>
                <p className="font-semibold ml-2 text-o2md">
                  Price: {"\u20B9"} {orders[0].price * orders[0].quantity}
                </p>
              </div>
            </div>

            <button className="mx-4 my-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 w-48">
              Cancel Order
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
