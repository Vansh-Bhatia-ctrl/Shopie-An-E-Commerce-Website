import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { uid, id, quantity } = await request.json();

    if (!uid || !id) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const cartRef = db.collection("users").doc(uid).collection("cart").doc(id);
    const docRef = await cartRef.get();

    if (!docRef.exists) {
      return NextResponse.json(
        { error: "This item is not in cart" },
        { status: 500 }
      );
    }

    if (quantity === 1) {
      await cartRef.delete();
    } else {
      await cartRef.update({ quantity: quantity - 1 });
    }

    return NextResponse.json(
      { message: "Item deleted from cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing cart item:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
