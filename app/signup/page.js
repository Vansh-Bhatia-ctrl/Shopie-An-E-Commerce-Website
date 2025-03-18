"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseconfig";
import { useRouter } from "next/navigation";

export default function SingUp() {
  const router = useRouter();
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

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up");
      router.push("/login");
    } catch (error) {
      console.error("Error adding user to the system", error.message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSignUp}>
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


