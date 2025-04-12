import Link from "next/link";
import CartIcon from "./CartIcon";
import UserIcon from "./UserDetails";

export default function SideBar() {
  return (
    <div className="fixed top-16 left-0 z-40 w-[250px] h-[calc(100vh-64px)] bg-gray-500 text-white flex flex-col p-4 space-y-6 shadow-lg mt-[7px]">
      <div className="border-b-2 flex flex-col gap-4 pb-4">
        <h2 className="text-xl font-bold text-white-100">
          <UserIcon />
        </h2>
        <h2 className="font-bold text-white-100">
          <CartIcon />
        </h2>
      </div>

      <nav className="flex flex-col gap-4">
        <Link
          href="/homeappliances"
          className="hover:text-slate-300 font-semibold"
        >
          Home Appliances
        </Link>
        <Link href="/gaming" className="hover:text-slate-300 font-semibold">
          Gaming
        </Link>
        <Link
          href="/electronics"
          className="hover:text-slate-300 font-semibold"
        >
          Electronics
        </Link>
        <Link href="/clothing" className="hover:text-slate-300 font-semibold">
          Clothing
        </Link>
        <Link href="/skincare" className="hover:text-slate-300 font-semibold">
          Skin Care
        </Link>
      </nav>
    </div>
  );
}
