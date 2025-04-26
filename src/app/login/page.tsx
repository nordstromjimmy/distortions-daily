"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <main className="max-w-sm mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input
        type="password"
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
