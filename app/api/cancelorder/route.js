import { db } from "@/app/lib/firebaseAdmin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const cookieStore = cookies();
    const uid = cookieStore.get("uid")?.value;

    const { id } = await req.json();

    if (!uid || !id) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const orderRef = db
      .collection("users")
      .doc(uid)
      .collection("orders")
      .doc(id)

    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await orderRef.delete();

    return NextResponse.json({ message: "Order cancelled" }, { status: 200 });
  } catch (error) {
    console.error("Error cancelling order", error.message);
    return NextResponse.json(
      { error: "Error cancelling order" },
      { status: 500 }
    );
  }
}
