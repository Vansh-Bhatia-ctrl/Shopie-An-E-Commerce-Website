"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { auth, db } from "../lib/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export default function CartIcon() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        return;
      }

      setUser(currentUser);

      const userRef = collection(db, "users", currentUser.uid, "cart");
      const userDoc = await getDocs(userRef);

      const userCartData = userDoc.docs.map((doc) => doc.data());
      setCartItems(userCartData);
    });

    return () => unsubscribe();
  }, []);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart size={28} className="text-gray-700" />
      {user
        ? totalItems > 0 && (
            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {totalItems}
            </div>
          )
        : ""}
    </Link>
  );
}
