import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { message: "Unauthorized to access wishlist" },
        { status: 401 }
      );
    }

    const wishlistData = await db
      .collection("users")
      .doc(uid)
      .collection("wishlist")
      .get();
    const wishlist = wishlistData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (wishlist.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist data", error.message);
    return NextResponse.json(
      { message: "Error fetching wishlist data" },
      { status: 500 }
    );
  }
}
