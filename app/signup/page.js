"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebaseconfig";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUp() {
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

      await setDoc(doc(db, "users", user.uid), {
        email,
        phone,
        name,
      });
      router.push("/");
    } catch (error) {
      console.error("Error adding user to the system", error.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="border-2 w-96 rounded-lg lg:w-[500px] lg:h-auto p-6 bg-white">
        <div className="flex flex-col items-center pt-2">
          <h1 className="text-2xl font-semibold border-b-4 pb-1">Sign Up</h1>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Name</label>
            <Input
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Phone Number</label>
            <Input
              placeholder="Enter Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Email</label>
            <Input
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Password</label>
            <Input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
