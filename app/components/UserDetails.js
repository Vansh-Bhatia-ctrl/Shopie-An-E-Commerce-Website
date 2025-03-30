"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebaseconfig";
import { User } from "lucide-react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import * as Popover from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";

export default function UserIcon() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      const userdocRef = doc(db, "users", currentUser.uid);
      const userData = await getDoc(userdocRef);

      if (userData.exists()) {
        setUser(userData.data());
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleSingOut() {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/login");
      console.log("User signed-out");
    } catch (error) {
      console.error("Error signing-out", error.message);
    }
  }

  if (loading) return <p className="animate-pulse text-blue-500">Loading...</p>;

  return (
    <div className="relative">
      {user ? (
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="cursor-pointer font-semibold text-gray-700 hover:text-gray-500 transition">
              {user.name}
            </button>
          </Popover.Trigger>

          <Popover.Content
            side="bottom"
            align="center"
            className="bg-gray-400 shadow-lg rounded-md border border-gray-200 p-2 w-32 z-50"
          >
            <Link href="/wishlist">
              <button className="w-full text-left px-3 py-2 text-sm text-black font-semibold bg-white hover:bg-gray-100 rounded-md transition">
                My Wishlist
              </button>
            </Link>
            <Link href="/myprofile">
              <button className="w-full text-left px-3 py-2 text-sm text-black font-semibold bg-white hover:bg-gray-100 rounded-md transition">
                My Profile
              </button>
            </Link>
            <button
              className="w-full text-left px-3 py-2 text-sm text-black font-semibold bg-white hover:bg-gray-100 rounded-md transition"
              onClick={handleSingOut}
            >
              Sign Out
            </button>
          </Popover.Content>
        </Popover.Root>
      ) : (
        <Link href="/login">
          <User size={24} className="text-gray-700" />
        </Link>
      )}
    </div>
  );
}
