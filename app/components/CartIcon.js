"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { auth } from "../lib/firebaseconfig";

export default function CartIcon() {
  const { cartItems } = useContext(CartContext);
  const user = auth.currentUser;

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
