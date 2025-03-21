import { db } from "@/app/lib/firebaseAdmin";
import admin from "firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { uid, productName, id } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { message: "You need to login to wishlist products" },
        { status: 401 }
      );
    }

    await db.collection("users").doc(uid).collection("wishlist").add({
      id: id,
      name: productName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      { message: "Product added to Wishlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to wishlist", error.message);
    return NextResponse.json(
      { message: "Error adding product to wishlist" },
      { status: 500 }
    );
  }
}
