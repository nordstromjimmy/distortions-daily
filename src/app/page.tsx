// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD' format

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Welcome to
          <br />
          <div className="text-4xl md:text-5xl font-extrabold tracking-wide">
            <span className="text-6xl bg-gradient-to-r from-purple-200 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Distortions Daily
            </span>
          </div>
        </h1>
        <p className="text-lg text-center text-gray-500 mt-4">
          Satirical daily news inspired by real-world headlines, <br />
          from a world just a few steps off course.
        </p>
        <Link
          href={`/edition/${today}`}
          className="inline-block mt-6 px-6 py-3 text-lg font-semibold bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Enter Today’s Edition
        </Link>
      </div>
    </main>
  );
}
