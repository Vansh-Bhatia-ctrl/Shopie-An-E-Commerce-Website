"use client";
import Link from "next/link";
import { useState } from "react";

export default function BuyNow({ product }) {
  const [items, setItems] = useState([]);

  {
    /*Stores products in localStorage to be rendered in the checkout page*/
  }
  function storeProductsInLocalStorage() {
    const updatedItem = [...items, product];
    setItems(updatedItem);
    localStorage.setItem("products", JSON.stringify(updatedItem));
    localStorage.setItem("checkoutType", "buyNow");
  }

  return (
    <Link href="/checkout">
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition"
        onClick={storeProductsInLocalStorage}
      >
        Buy now
      </button>
    </Link>
  );
}
