import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { payment_id, orderId, uid, name, image, description, price } =
      await request.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const payment = await razorpay.payments.fetch(payment_id);

    if (payment.status === "captured") {
      const orderData = {
        amount: payment.amount,
        id: payment.id,
        orderId: orderId,
        currency: payment.currency,
        status: payment.status,
        name: name,
        image: image,
        description: description,
        price: price,
      };

      await db.collection("users").doc(uid).collection("orders").add(orderData);
    }

    return NextResponse.json(
      { success: true, message: "Payment verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
