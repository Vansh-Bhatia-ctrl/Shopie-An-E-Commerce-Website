import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { image, description, name, price, uid, id } = await request.json();

    if (!image || !id || !description || !name || !price || !uid) {
      return NextResponse.json(
        { error: "Invalid data. Failed to add it to cart" },
        { status: 400 }
      );
    }

    await db.collection("users").doc(uid).collection("cart").doc(id).set({
      id: id,
      name: name,
      image: image,
      description: description,
      price: price,
    });

    return NextResponse.json(
      { message: "Item added to cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    return NextResponse.json(
      { error: "Error adding product to cart" },
      { status: 500 }
    );
  }
}
