"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebaseconfig";

export default function Reviews({ item }) {
  const { addReview, postingReview } = useContext(CartContext);
  const [reviews, setReviews] = useState("");
  const [fetchedReviews, setFetchedReviews] = useState([]);

  useEffect(() => {
    if (!item?.id) return;

    const reviewRef = doc(db, "reviews", item.id);
    const unsubscribe = onSnapshot(reviewRef, (snapshot) => {
      if (snapshot.exists()) {
        setFetchedReviews(snapshot.data().reviews || []);
      } else {
        setFetchedReviews([]);
      }
    });

    return () => unsubscribe();
  }, [item]);

  function handleChange(event) {
    setReviews(event.target.value);
  }

  return (
    <>
      <div className="flex gap-4 mt-6">
        <p className="border-b-2 text-xl">Reviews</p>
      </div>

      <form
        onSubmit={(event) => {
          addReview(event, item);
          setReviews("");
        }}
      >
        <textarea
          type="text"
          placeholder="Add a review..."
          name="review"
          value={reviews}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg p-2 mt-4 w-full"
          required
        />
        <button
          type="submit"
          disabled={postingReview}
          className="w-[400px] mt-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 p-4"
        >
          {postingReview ? (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-b-4 rounded-full border-yellow-300 animate-spin"></div>
            </div>
          ) : (
            "Add review"
          )}
        </button>
        {fetchedReviews.length > 0 ? (
          fetchedReviews.map((review, index) => (
            <div key={`${review.productId}-${index}`} className="flex flex-col">
              <p className="font-semibold">{review.name}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </form>
    </>
  );
}
