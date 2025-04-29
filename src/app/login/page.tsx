"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account } from "appwrite";
import { Toaster, toast } from "sonner";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await account.createEmailPasswordSession(email, password);
      router.push("/archive"); // Redirect to archive after login
    } catch (error: any) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Login to view our Archive
      </h1>

      <div className="bg-white p-8 rounded-2xl">
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
          className="bg-white border p-2 rounded w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Toaster />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-2 bg-white text-gray-900 border border-gray-300 text-lg font-sans font-semibold rounded hover:bg-gray-100 transition cursor-pointer"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
