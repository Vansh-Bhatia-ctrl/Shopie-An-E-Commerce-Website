import { db } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { payment_id, orderId, uid, storedProducts } = await request.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const payment = await razorpay.payments.fetch(payment_id);

    if (payment.status === "captured") {
      const batch = db.batch();
      const userOrdersRef = db.collection("users").doc(uid).collection("orders");
    
      storedProducts.forEach((product) => {
        const orderRef = userOrdersRef.doc();
        batch.set(orderRef, {
          amount: payment.amount,
          id: payment.id,
          orderId: orderId,
          currency: payment.currency,
          status: payment.status,
          name: product.name,
          image: product.image,
          description: product.description,
          price: product.price,
          quantity: product.quantity || 1,
          createdAt: new Date(),
        });
      });
    
      await batch.commit();
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
