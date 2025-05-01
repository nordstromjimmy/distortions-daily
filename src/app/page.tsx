import { Newspaper } from "lucide-react";
import Link from "next/link";

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

export default function LandingPage() {
  const today = new Date().toISOString().split("T")[0];
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col justify-center items-center space-y-6 px-6">
      {/* Icon */}
      <Newspaper className="w-24 h-24 text-gray-700" />
      <h1 className="text-5xl text-center md:text-7xl font-display font-extrabold tracking-tight text-gray-900">
        Distortions Daily
      </h1>

      <p className="text-xl md:text-2xl text-center font-serif text-gray-600 italic max-w-2xl mx-auto">
        Satirical daily news inspired by real-world headlines, from a world just
        a few steps off course.
      </p>

      <div className="flex gap-4 justify-center mt-8">
        <Link
          href={`/edition/${today}`}
          className="px-6 py-3 bg-gray-900 text-white text-lg font-sans font-semibold rounded hover:bg-gray-800 transition"
        >
          Read Today’s Edition →
        </Link>
        <a
          href="/archive"
          className="px-6 py-3 bg-white text-gray-900 border border-gray-300 text-lg font-sans font-semibold rounded hover:bg-gray-100 transition"
        >
          Browse Archive
        </a>
      </div>
    </main>
  );
}
