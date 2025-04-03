"use client";

import Link from "next/link";

export default function ProceedToBuy() {
  function storeCartItems() {
    const sotredItems = localStorage.getItem("cart");
    const parsedItems = JSON.parse(sotredItems);
    if (parsedItems) {
      localStorage.setItem("cartItems", JSON.stringify(parsedItems));
      localStorage.setItem("checkoutType", "cartItems");
    }
  }
  return (
    <Link href="/checkout">
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition"
        onClick={storeCartItems}
      >
        Proceed to buy
      </button>
    </Link>
  );
}
