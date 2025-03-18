import { User, Menu } from "lucide-react";
import { Great_Vibes } from "next/font/google";
import Link from "next/link";
import CartIcon from "./CartIcon";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
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

          <Link href="">My Orders</Link>
          <Link href="">Support</Link>
          <Link href="/signup">
            <User size={24} className="text-gray-700" />
          </Link>
          <Link href="">About us</Link>
        </div>
      </header>

      <nav className="hidden md:flex bg-gray-300 justify-center items-center h-[50px] px-5 text-csm gap-8 w-full">
        <Link href="/homeappliances">Home appliances</Link>
        <Link href="">Kitchen</Link>
        <Link href="">Fashion</Link>
        <Link href="">Gaming</Link>
        <Link href="">Skin care</Link>
        <Link href="">More</Link>
      </nav>
    </>
  );
}
