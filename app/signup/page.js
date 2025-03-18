"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../lib/firebaseconfig";
import { useRouter } from "next/navigation";

export default function SingUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("User signed up");
      router.push("/login");
    } catch (error) {
      console.error("Error adding user to the system", error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSignUp}>
        <input
          placeholder="Enter emailId"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2"
        />
        <br />
        <br />
        <input
          placeholder="Enter password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2"
        />
        <br />
        <br />
        <button type="submit" className="border-4">
          Sign-up
        </button>
      </form>
    </>
  );
}
