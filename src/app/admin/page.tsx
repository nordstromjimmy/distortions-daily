"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    if (adminFlag === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
    } else {
      setError("Incorrect password.");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  const handleGenerateEdition = async () => {
    try {
      setIsGenerating(true);

      const res = await fetch("/api/generate-edition", {
        method: "POST",
        body: JSON.stringify({ date: selectedDate }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate edition.");
      }

      setMessage("Edition generated and saved successfully! 🚀");
    } catch (err: any) {
      console.error(err.message);
      setMessage("Failed to generate edition. 😔");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isAdmin === null) {
    // Still loading localStorage check
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAdmin) {
    // Not logged in → Show login form
    return (
      <main className="max-w-sm mx-auto py-12">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <input
          type="password"
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter Admin Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <p className="text-red-500 text-center mb-2">{error}</p>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
        >
          Login
        </button>
      </main>
    );
  }

  // ✅ Logged in → Show admin panel
  return (
    <main className="max-w-2xl mx-auto py-8 px-6 text-gray-800">
      <div className="flex flex-row justify-between">
        {" "}
        <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
        <button
          onClick={handleLogOut}
          className="bg-gray-900 text-white cursor-pointer p-2"
        >
          Log out
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Select Date (optional):
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>

      <button
        onClick={handleGenerateEdition}
        disabled={isGenerating}
        className={`w-full py-3 rounded-md font-semibold text-white cursor-pointer ${
          isGenerating ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } transition`}
      >
        {isGenerating ? "Generating..." : "Generate New Edition"}
      </button>

      {isGenerating && (
        <p className="text-center mt-6 text-sm text-gray-500 animate-pulse">
          Generating satire..
        </p>
      )}
      {message && (
        <p className="text-center mt-6 text-sm text-gray-500 animate-pulse">
          {message}
        </p>
      )}
    </main>
  );
}
