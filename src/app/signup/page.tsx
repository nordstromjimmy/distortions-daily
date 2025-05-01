"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account, ID } from "appwrite";
import { Toaster, toast } from "sonner";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      await account.create(ID.unique(), email, password);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Signup failed" + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-md  mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Free Account
      </h1>
      <div className="bg-white p-8 rounded-2xl">
        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="border p-2 rounded w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Toaster />
        <button
          onClick={handleSignup}
          disabled={isLoading}
          className="w-full py-2 bg-white text-gray-900 border border-gray-300 text-lg font-sans font-semibold rounded hover:bg-gray-100 transition cursor-pointer"
        >
          {isLoading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </main>
  );
}
