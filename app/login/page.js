"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../lib/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
      console.log("user added successfully", user);
      await setDoc(doc(db, "users", user.uid), {
        userName,
        phoneNumber,
        email,
      });
      console.log("User data saved to Firestore");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSignUp}>
        <input
          placeholder="Enter name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border-2"
        />
        <br />
        <br />
        <input
          placeholder="Enter phone number"
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border-2"
        />
        <br />
        <br />
        <input
          placeholder="Enter emailId"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2"
        />
        <br />
        <br />
        <input
          placeholder="Enter password"
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
