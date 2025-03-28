"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebaseconfig";
import Link from "next/link";



export default function Wishlists() {
  const { wishlist, setWishlist } = useContext(CartContext);

  useEffect(() => {
    let unsubscribefirestore = () => {};
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setWishlist([]);
        return;
      }

      const wishlistRef = collection(db, "users", user.uid, "wishlist");

      unsubscribefirestore = onSnapshot(wishlistRef, (snapshot) => {
        const item = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWishlist(item);
      });
    });

    return () => {
      unsubscribeAuth();
      unsubscribefirestore();
    };
  }, []);

  return (
    <>
       <div className="flex flex-col items-center pt-4">
        <div className="inline-block border-b-4">
          <h1 className="text-2xl font-semibold">My Wishlist</h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2 p-6">
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <div key={item.id || index} className="flex flex-col gap-4">
              <Card className="p-4">
                <div className="flex lg:flex-row flex-col lg:items-center gap-4">
                  <Link href={`/homeappliances/${item.id}`}>
                    <img
                      src={item.image}
                      width={200}
                      height={200}
                      alt="product"
                      className="rounded-lg"
                    />
                  </Link>
                  <div className="flex flex-1 lg:flex-row flex-col lg:items-center justify-between w-full">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="text-md">
                        {item.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-red-600">
                        {"\u20B9"} {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-lg font-semibold">
            No items in wishlist.
          </p>
        )}
      </div>
    </>
  );
}
