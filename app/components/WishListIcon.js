"use client";

import { Heart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { auth } from "../lib/firebaseconfig";

export default function WishList({ itemID }) {
  const { addToWishlist, wishlisted } = useContext(CartContext);

  return (
    <>
      <button onClick={() => addToWishlist(itemID)}>
        <Heart
          className={`w-6 h-6  text-red-500 mt-2 cursor-pointer ${
            wishlisted ? "fill-red-500" : ""
          }`}
        />
      </button>
    </>
  );
}
