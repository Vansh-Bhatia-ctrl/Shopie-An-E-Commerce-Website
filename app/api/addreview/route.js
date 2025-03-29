import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { uid, id, comment } = await request.json();
    if (!uid || !id || !comment) {
      return NextResponse.json(
        { error: "Failed to add review" },
        { status: 400 }
      );
    }

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const userName = userData.name || "Anonymous";

    const reviewRef = db.collection("reviews").doc(id);
    const reviewSnapshot = await reviewRef.get();
    const reviewData = reviewSnapshot.exists
      ? reviewSnapshot.data()
      : { reviews: [] };

    const updatedReview = [
      ...reviewData.reviews,
      { uid, name: userName, comment },
    ];

    await reviewRef.set(
      {
        productId: id,
        reviews: updatedReview,
      },
      { merge: true }
    );

    return NextResponse.json(
      { message: "Review Added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding review", error);
    return NextResponse.json(
      { error: "Error adding review", details: error.message },
      { status: 500 }
    );
  }
}
