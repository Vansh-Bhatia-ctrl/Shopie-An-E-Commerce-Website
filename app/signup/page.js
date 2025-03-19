"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebaseconfig";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

export default function SingUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up");
      router.push("/login");

      await setDoc(doc(db, "users", user.uid), {
        email,
        phone,
        name,
      });
    } catch (error) {
      console.error("Error adding user to the system", error.message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSignUp}>
        <input
          placeholder="Enter Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2"
        />
        <br />
        <br />
        <input
          placeholder="Enter Phone Number"
          type="number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
