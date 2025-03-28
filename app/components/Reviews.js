"use client";

import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Reviews({ item }) {
  const { addReview } = useContext(CartContext);
  const [reviews, setReviews] = useState("");

  function handleChange(event) {
    setReviews(event.target.value);
  }

  return (
    <>
      <div className="flex gap-4 mt-6">
        <p className="border-b-2 text-xl">Reviews</p>
      </div>

      <form onSubmit={(event) => addReview(event, item)}>
        <textarea
          type="text"
          placeholder="Add a review..."
          name="review"
          value={reviews}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg p-2 mt-4 w-full"
        />
        <button
          type="submit"
          className="w-[400px] mt-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 p-4"
        >
          Add review
        </button>
        <p>{reviews}</p>
      </form>
    </>
  );
}
