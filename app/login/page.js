"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseconfig";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SignInError from "../components/SigninError";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [isLogingIn, setIsLoginingIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleSignIn(e) {
    setIsLoginingIn(true);
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idtoken = await getIdToken(user);
      await fetch("/api/usertoken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idtoken }),
        credentials: "include",
      });
      setIsLoginingIn(false);
      router.push("/");
    } catch (error) {
      setError(true);
      setIsLoginingIn(false);
      setTimeout(() => setError(false), 4000);
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
    <>
      <div className="flex items-center justify-center mt-16">
        <div className="border-2 w-96 rounded-lg lg:w-[500px] lg:h-[320px]">
          <div className="flex flex-col items-center pt-4">
            <div className="inline-block border-b-4">
              <h1 className="text-2xl font-semibold">
                Sign in or create account
              </h1>
            </div>
          </div>

          <div className="p-6">
            <form
              onSubmit={handleSignIn}
              className="flex flex-col items-center justify-center gap-4"
            >
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  placeholder="Enter email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[300px]"
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input
                  placeholder="Enter password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[300px]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-[306px] p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg flex items-center justify-center"
              >
                 {isLogingIn ? (
                <div className="flex justify-center items-center w-[130px] h-[24px]">
                  <div className="w-8 h-8 border-b-4 rounded-full border-yellow-600 animate-spin"></div>
                </div>
              ) : (
                "Sign In"
              )}
              </button>
              <div className="flex gap-2 md:">
                <p>Don't have an account?</p>
                <Link href="/signup">
                  <button className="text-blue-600 hover:border-b-2 hover:border-blue-400">
                    Sign-up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {error && <SignInError />}
    </>
  );
}
