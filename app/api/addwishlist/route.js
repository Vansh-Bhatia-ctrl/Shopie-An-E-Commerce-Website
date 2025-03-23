import { db } from "@/app/lib/firebaseAdmin";
import admin from "firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { uid, id, name } = await request.json();

    if (!uid || !id || !name) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    await db.collection("users").doc(uid).collection("wishlist").doc(id).set({
      id: id,
      name: name,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      { message: "Product added to Wishlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to wishlist:", error.message);
    return NextResponse.json(
      { error: "Error adding product to wishlist" },
      { status: 500 }
    );
  }
}




