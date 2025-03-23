import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
      const { uid, id } = await req.json();
  
      if (!uid || !id) {
        return NextResponse.json({ error: "Invalid request!" }, { status: 400 });
      }
  
      const wishListRef = db.collection("users").doc(uid).collection("wishlist").doc(id);
      const docSnapshot = await wishListRef.get();
  
      if (!docSnapshot.exists) {
        return NextResponse.json(
          { error: "No such item exists in your wishlist" },
          { status: 404 }
        );
      }
  
     
      await wishListRef.delete();
  
      return NextResponse.json(
        { message: "Removed item from wishlist" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error removing wishlist item:", error.message);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  