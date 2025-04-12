"use client";

import { Great_Vibes } from "next/font/google";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserIcon from "./UserDetails";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  const pathname = usePathname();

  function handleSideBar() {
    setClicked(!clicked);
  }
  return (
    <>
      <header className="bg-gray-200 p-4 flex justify-between items-center w-full relative">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Menu size={24} onClick={handleSideBar} />
          </div>

          <Link
            href="/"
            className={`text-4xl font-bold ${greatVibes.className}`}
          >
            Shopie
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-cmd lg:mt-2">
          <CartIcon />
          <UserIcon />
        </div>
      </header>
      {clicked && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={handleSideBar} // closes sidebar when clicking outside
          />
          <SideBar />
        </>
      )}
      <nav className="hidden md:flex bg-gray-300 justify-center items-center h-[50px] px-5 text-csm gap-8 w-full">
        <Link
          href="/homeappliances"
          className={`${
            pathname.startsWith("/homeappliances")
              ? "text-blue-600 font-semibold"
              : "font-semibold"
          } hover:text-blue-600`}
        >
          Home appliances
        </Link>
        <Link
          href="/gaming"
          className={`${
            pathname.startsWith("/gaming")
              ? "text-blue-600 font-semibold"
              : "font-semibold"
          } hover:text-blue-600`}
        >
          Gaming
        </Link>
        <Link
          href="/electronics"
          className={`${
            pathname.startsWith("/electronics")
              ? "text-blue-600 font-semibold"
              : "font-semibold"
          } hover:text-blue-600`}
        >
          Electronics
        </Link>
        <Link
          href="/clothing"
          className={`${
            pathname.startsWith("/clothing")
              ? "text-blue-600 font-semibold"
              : "font-semibold"
          } hover:text-blue-600`}
        >
          Clothing
        </Link>
        <Link
          href="/skincare"
          className={`${
            pathname.startsWith("/skincare")
              ? "text-blue-600 font-semibold"
              : "font-semibold"
          } hover:text-blue-600`}
        >
          Skin care
        </Link>
      </nav>
    </>
  );
}
