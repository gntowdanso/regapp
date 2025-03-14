//"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 text-white">
      {navLinks.map((link) => (
        <Link
          href={link.url}
          key={link.label}
          className={`flex gap-3 p-3 rounded-md hover:bg-gray-700 transition ${
            pathname === link.url ? "bg-gray-700" : "bg-transparent"
          }`}
        >
          {link.icon} <p>{link.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default LeftSideBar;
