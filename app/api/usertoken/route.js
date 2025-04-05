import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { idtoken } = await req.json();

  try {
    const decodedToken = await getAuth().verifyIdToken(idtoken);
    const uid = decodedToken.uid;

    const cookieStore = cookies();
    cookieStore.set("sessions", idtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 2,
      path: "/",
    });

    return NextResponse.json({ message: "Cookie stored successfully", uid });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
