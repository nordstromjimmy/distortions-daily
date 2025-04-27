"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      await account.create(ID.unique(), email, password);
      router.push("/login");
    } catch (error: any) {
      setError(error.message || "Signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-sm mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Free Account
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-full mb-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="text-red-500 text-center mb-2">{error}</p>
      <button
        onClick={handleSignup}
        disabled={isLoading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold cursor-pointer"
      >
        {isLoading ? "Creating..." : "Sign Up"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Log In
        </a>
      </p>
    </main>
  );
}
