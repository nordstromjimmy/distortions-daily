"use client";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const hideHeader = pathname === "/";

  if (hideHeader) return null; // Hide header on front page
  const today = new Date().toISOString().split("T")[0];

  return (
    <header className="bg-gray-900 text-white py-6 text-center">
      <div className="text-4xl md:text-5xl font-extrabold tracking-wide">
        {/* <p className="text-sm italic">not very true</p> */}
        <span className="text-white">
          <a href="/"> Distortions Daily</a>
        </span>
      </div>
      <p className="text-sm mt-2 text-gray-400 italic">Edition Date: {today}</p>
    </header>
  );
}
