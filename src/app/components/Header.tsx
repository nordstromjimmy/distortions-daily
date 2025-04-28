"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Account, Client } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // ✅ Only now: after all hooks, safely check
  const hideHeader = pathname === "/";
  if (hideHeader) return null;

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setIsAuthenticated(false);
      router.push(`/edition/${today}`);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <div>
          {" "}
          <Link
            href={"/"}
            className="text-4xl font-display font-extrabold text-white hover:text-gray-300"
          >
            Distortions Daily
          </Link>
          <span className="bg-red-600 text-white text-xs font-bold rounded-full  ml-4 px-3 py-1 tracking-wider">
            NEWS
          </span>
          <p className="text-sm mt-2 text-gray-400 italic">
            Todays Date - {today}
          </p>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-sans">
          <Link
            href="/archive"
            className="text-white hover:text-yellow-400 transitiofont-semibold"
          >
            Archive
          </Link>
          {!isAuthenticated ? (
            <Link
              href="/signup"
              className="text-white hover:text-yellow-400 transition font-semibold"
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 transition font-semibold cursor-pointer"
            >
              Logout
            </button>
          )}
          {/* Add more links if needed */}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 font-sans">
          <Link
            href="/archive"
            className="block text-white py-2 font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Archive
          </Link>
          {!isAuthenticated ? (
            <Link href="/signup" className="text-white font-semibold">
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white font-semibold cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
