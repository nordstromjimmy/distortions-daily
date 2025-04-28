"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account, ID } from "appwrite";

export const metadata = {
  title: "Distortions Daily - Satirical News From Another Reality",
  description:
    "Daily transmissions from a world almost like ours... but not quite. Satirical takes on today's real events.",
  openGraph: {
    title: "Distortions Daily - Satirical News From Another Reality",
    description:
      "Explore daily news with a satirical twist, only at Distortions Daily.",
    url: "https://distortionsdaily.com",
    siteName: "Distortions Daily",
    images: [
      {
        url: "/og-image.png", // 👈 we'll design this
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Distortions Daily - Satirical News From Another Reality",
    description:
      "Explore daily news with a satirical twist, only at Distortions Daily.",
    images: ["/og-image.png"],
  },
};

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
    <main className="max-w-md  mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Free Account
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
          className="border p-2 rounded w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 text-center mb-2">{error}</p>
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
