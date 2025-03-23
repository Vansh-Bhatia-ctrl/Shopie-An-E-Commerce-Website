"use client";

import { Heart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function WishList({ item }) {
  const { toggleWishlist, wishlist } = useContext(CartContext);

  return (
    <>
      <button onClick={() => toggleWishlist(item)}>
        <Heart
          className={`w-6 h-6 text-red-500 mt-2 cursor-pointer ${
            wishlist.some((wish) => wish.id === item.id) ? "fill-red-500" : ""
          }`}
        />
      </button>
    </>
  );
}
