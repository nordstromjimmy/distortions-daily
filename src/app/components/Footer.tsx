"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const hideHeader = pathname === "/";

  if (hideHeader) return null; // Hide header on front page
  return (
    <footer className=" bg-gray-900 text-center text-sm text-white">
      <div className="mt-4">
        © Distortions Daily {new Date().getFullYear()}, All Rights Reserved
      </div>
      <nav className="flex justify-center space-x-4 text-xs text-white mt-2 mb-4">
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </nav>
    </footer>
  );
}
