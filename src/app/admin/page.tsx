"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/login");
    }
  }, [router]);

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

  const handleLogOut = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-6 text-gray-800">
      <div className="flex flex-row justify-between">
        {" "}
        <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
        <button
          onClick={handleLogOut}
          className="bg-gray-900 text-white px-4 cursor-pointer"
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
