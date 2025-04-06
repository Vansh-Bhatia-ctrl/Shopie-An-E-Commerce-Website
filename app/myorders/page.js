"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebaseconfig";
import Link from "next/link";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let unsubscribeFireBase = () => {};
    const unsubscrribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setOrders([]);
        return;
      }
      const ordersRef = collection(db, "users", user.uid, "orders");
      unsubscribeFireBase = onSnapshot(ordersRef, (snapshot) => {
        const item = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(item);
      });
    });

    return () => {
      unsubscrribeAuth();
      unsubscribeFireBase();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-4">
        <div className="inline-block border-b-4">
          <h1 className="text-2xl font-semibold">My Orders</h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2 p-6">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={`${order.createdAt}-${index}`}
              className="flex flex-col gap-4"
            >
              <Card className="p-4">
                <div className="flex lg:flex-row flex-col lg:items-center gap-4">
                  <Link
                    href={`/myorders/${order.productId}`}
                    className="flex"
                  >
                    <img
                      src={order.image}
                      width={200}
                      height={200}
                      alt="product"
                      className="rounded-lg"
                    />
                  </Link>
                  <div className="flex flex-1 lg:flex-row flex-col lg:items-center justify-between w-full">
                    <div>
                      <CardTitle className="text-lg">{order.name}</CardTitle>
                      <CardDescription className="text-md">
                        {order.description}
                      </CardDescription>
                      <CardDescription className="font-semibold text-md">
                        Quantity: {order.quantity ? order.quantity : 1}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-red-600">
                        {"\u20B9"} {order.price * order.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-lg font-semibold">
            No orders placed.
          </p>
        )}
      </div>
    </>
  );
}
