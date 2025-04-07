"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

export default function AddToCart({ item }) {
  const { addToCart } = useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        return;
      }

      const docRef = collection(db, "users", currentUser.uid, "cart");
      const docSnapshot = await getDocs(docRef);
      const docData = docSnapshot.docs.map((doc) => doc.data());
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition"
        onClick={() => addToCart(item)}
      >
        Add to cart
      </button>
    </div>
  );
}
