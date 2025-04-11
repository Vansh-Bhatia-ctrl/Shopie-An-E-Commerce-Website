"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { doc, onSnapshot } from "firebase/firestore";
import { User } from "lucide-react";
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
        <p className="border-b-2 text-xl font-bold">Reviews</p>
      </div>

      <form
        onSubmit={(event) => {
          addReview(event, item);
          setReviews("");
        }}
      >
        {fetchedReviews.length > 0 ? (
          fetchedReviews.map((review, index) => (
            <div
              key={`${review.productId}-${index}`}
              className="flex flex-col p-4 rounded-md shadow-md mt-4 mb-4"
            >
              <div className="flex gap-1 mt-2">
                <div className="border-2 rounded-full border-solid border-gray-600">
                  <User size={24} className="text-gray-700" />
                </div>
                <p className="font-semibold text-lg">{review.name}</p>
              </div>
              <div className="p-4">
                <p>{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-lg font-semibold">
            No reviews yet.
          </p>
        )}

        <textarea
          type="text"
          placeholder="Share your valuable review about our product..."
          name="review"
          value={reviews}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-lg p-2 mt-4 w-full h-32"
          required
        />
        <button
          type="submit"
          disabled={postingReview}
          className="w-[130px] mt-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 p-2 text-md font-semibold"
        >
          {postingReview ? (
            <div className="flex justify-center items-center w-[130px] h-[30px]">
              <div className="w-8 h-8 border-b-4 rounded-full border-yellow-300 animate-spin"></div>
            </div>
          ) : (
            "Add review"
          )}
        </button>
      </form>
    </>
  );
}
