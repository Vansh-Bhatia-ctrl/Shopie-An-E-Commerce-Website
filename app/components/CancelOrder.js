"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelOrder({ product, onCancel }) {
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();
  async function handleCancelOrder(item) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel the order?"
    );
    if (!confirmCancel) return;

    setIsCancelling(true);
    try {
      const response = await fetch("/api/cancelorder", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id: item.firebaseOrderId }),
      });

      if (response.ok) {
        alert("Order cancelled");
        onCancel(item.firebaseOrderId);
        return;
      }

      const data = await response.json();
      console.error("Error cancelling the order", data);
    } catch (error) {
      console.error("Error cancelling the order", error.message);
    } finally {
      setIsCancelling(false);
      router.push("/myorders");
    }
  }
  return (
    <button
      className="mx-4 my-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 w-48"
      onClick={() => handleCancelOrder(product)}
      disabled={isCancelling}
    >
      {isCancelling ? "Cancelling..." : "Cancel Order"}
    </button>
  );
}
