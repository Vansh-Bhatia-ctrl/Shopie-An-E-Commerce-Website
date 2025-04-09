"use client";
import { Menu } from "lucide-react";
import { Great_Vibes } from "next/font/google";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserIcon from "./UserDetails";
import { usePathname } from "next/navigation";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <header className="bg-gray-200 p-4 flex justify-between items-center w-full relative">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Menu size={24} />
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
          <Link href="">About us</Link>
        </div>
      </header>

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
          href="/kitchen"
          className={`${
            pathname === "/kitchen"
              ? "text-blue-600 font-semibold"
              : "font-semibold"
          } hover:text-blue-600`}
        >
          Kitchen
        </Link>
        <Link
          href="/fashion"
          className={`${
            pathname === "/fashion"
              ? "text-blue-600 font-semibold"
              : "font-semibold"
          } hover:text-blue-600`}
        >
          Fashion
        </Link>
        <Link
          href="/gaming"
          className={`${
            pathname === "/gaming"
              ? "text-blue-600 font-semibold"
              : "font-semibold"
          } hover:text-blue-600`}
        >
          Gaming
        </Link>
        <Link
          href="skincare"
          className={`${
            pathname === "/skincare"
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
