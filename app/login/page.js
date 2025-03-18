"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../lib/firebaseconfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("user signed in");
    } catch (error) {
      console.error("Error sigining in", error.message);
    }
  }

  return (
    <form onSubmit={handleSignIn}>
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
        Sign-in
      </button>
    </form>
  );
}
