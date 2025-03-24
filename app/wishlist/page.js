"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebaseconfig";
import Link from "next/link";

export default function Wishlists() {
  const { wishlist, setWishlist } = useContext(CartContext);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setWishlist([]);

      return;
    }

    const wishlistRef = collection(db, "users", user.uid, "wishlist");

    const unsubscribe = onSnapshot(wishlistRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishlist(items);
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid]);

  return (
    <div className="flex flex-col gap-4 mt-2 p-2">
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <div key={item.id} className="flex flex-col gap-4">
            <Card className="p-4">
              <div className="flex lg:flex-row flex-col lg:items-center gap-4">
                <Link href={`/homeappliances/${item.id}`}>
                <Image
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
        <p>No items in wishlist.</p>
      )}
    </div>
  );
}
