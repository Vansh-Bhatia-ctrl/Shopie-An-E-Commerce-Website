import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { uid, id } = await request.json();

    if (!uid || !id) {
      return NextResponse.json(
        { message: "Invalid request, please trey again!" },
        { status: 500 }
      );
    }

    const wishlistRef = db
      .collection("users")
      .doc(uid)
      .collection("wishlist")
      .doc(id);

    await wishlistRef.delete();

    return NextResponse.json(
      { message: "Product deleted from wishlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product from wishlist", error.message);
    return NextResponse.json(
      { message: "Error deleting product from wishlist" },
      { status: 500 }
    );
  }
}
