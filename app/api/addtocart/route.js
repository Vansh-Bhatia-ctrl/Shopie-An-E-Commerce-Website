import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const requestData = await request.json();

    const { image, description, name, price, uid, id, quantity } = requestData;

    if (!image || !id || !description || !name || !price || !uid) {
      return NextResponse.json(
        { error: "Invalid data. Failed to add to cart" },
        { status: 400 }
      );
    }

    const cartItem = {
      id: id.toString(), 
      name,
      image,
      description,
      price,
      quantity: quantity ? quantity + 1 : 1,
    };

    await db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .doc(id.toString())
      .set(cartItem, { merge: true });


    return NextResponse.json(
      { message: "Item added to cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { error: "Error adding product to cart", details: error.message },
      { status: 500 }
    );
  }
}