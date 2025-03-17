"use client";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function AddToCart({ item }) {
  const { addToCart } = useContext(CartContext);
  return (
    <button
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition"
      onClick={() => addToCart(item)}
    >
      Add to cart
    </button>
  );
}
