"use client";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseconfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user signed in");
    
    } catch (error) {
      console.error("Error sigining in", error.message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSignIn}>
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
        Sign-in
      </button>
    </form>
  );
}
