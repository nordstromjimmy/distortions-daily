"use client";
import CitizenLetter from "@/app/components/CitizenLetter";
import ShareButton from "@/app/components/ShareButton";
import WeatherSection from "@/app/components/WeatherSection";
import { Account, Client, Databases, ID, Query } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import { Toaster, toast } from "sonner";
import { Star } from "lucide-react";

interface Headline {
  title: string;
  summary: string;
  category: string;
  author: string;
  isFeatured: boolean;
  imageUrl?: string;
}

interface Edition {
  date: string;
  headlines: Headline[];
  weather: string;
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  letterFromCitizen: {
    name: string;
    letter: string;
  };
}

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

// Helper to fetch the edition JSON
async function fetchEdition(date: string): Promise<Edition | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/${date}.json`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to load edition:", error);
    return null;
  }
}

export default function EditionClient({
  date,
  edition: initialEdition,
}: {
  date: string;
  edition: Edition | null;
}) {
  const [edition, setEdition] = useState<Edition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [futureMode, setFutureMode] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadEdition = async () => {
      try {
        // ✅ Get local date in YYYY-MM-DD format (safe from timezone bugs)
        const localToday = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];

        // ✅ Compare directly as strings — safe and simple
        if (date > localToday) {
          setFutureMode(true);
          setIsLoading(false);
          return;
        }

        if (date < localToday) {
          // ✅ Archive access — must be logged in
          try {
            await account.get();
          } catch (error) {
            router.push("/login");
            return;
          }
        }

        // ✅ Load edition JSON
        const fetchedEdition = await fetchEdition(date);
        setEdition(fetchedEdition);

        // ✅ If user is logged in, check for saved favorite
        try {
          const user = await account.get();

          const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
            [Query.equal("userId", user.$id), Query.equal("editionDate", date)]
          );

          if (response.total > 0) {
            setFavoriteId(response.documents[0].$id);
          } else {
            setFavoriteId(null);
          }
        } catch (error) {
          setFavoriteId(null);
        }
      } catch (error) {
        console.error("Failed to load edition:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEdition();
  }, [date, router]);

  const handleFavorite = async () => {
    try {
      let user;
      try {
        user = await account.get();
      } catch (error) {
        toast.success("You need to be logged in to save favorites!");
        //console.error("User not logged in, redirecting to login...");
        //router.push("/login");
        return;
      }

      if (favoriteId) {
        // ⭐ Already favorited ➔ Unfavorite it
        await databases.deleteDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
          favoriteId
        );

        toast.success("Removed from Favorites!");
        setFavoriteId(null);
      } else {
        // 🆕 Not yet favorited ➔ Favorite it
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
          ID.unique(),
          {
            userId: user.$id,
            editionDate: edition?.date,
            title: edition?.headlines[0]?.title || "Untitled",
            imageUrl: edition?.headlines[0]?.imageUrl || "",
          }
        );

        toast.success("Added to Favorites!");
        setFavoriteId(response.$id);
      }
    } catch (error: any) {
      console.error("Failed to handle favorite:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading edition...</p>
      </main>
    );
  }

  if (futureMode) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Future! 🚀</h1>
        <p className="text-gray-500">
          This edition hasn’t been written yet. Check back later!
        </p>
      </main>
    );
  }

  if (!edition) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Edition Not Written Yet</h1>
        <p className="text-gray-500">Our reporters are slacking, again...</p>
      </main>
    );
  }

  const featured = edition.headlines.find((h) => h.isFeatured);
  const rest = edition.headlines.filter((h) => !h.isFeatured);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-16">
        {/* Featured Story */}
        {featured && (
          <article className="bg-white rounded-md shadow-md overflow-hidden">
            {featured.imageUrl && (
              <div className="relative w-full aspect-square md:aspect-[16/9]">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-scale-down"
                />
              </div>
            )}
            <div className="p-6">
              <span className="text-xs uppercase text-pink-600 font-semibold tracking-wider">
                {featured.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-display mt-2">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg text-gray-700 font-serif">
                {featured.summary}
              </p>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Author: {featured.author}
                </p>

                <ShareButton
                  title={featured.title}
                  url={`${process.env.NEXT_PUBLIC_BASE_URL}/edition/${date}`}
                />
              </div>
            </div>
          </article>
        )}

        {/* Rest of Headlines */}
        <section className="grid gap-8 md:grid-cols-2">
          {rest.map((headline, idx) => (
            <article
              key={idx}
              className="bg-white p-6 rounded-md shadow-sm hover:shadow-md border border-gray-300 transition"
            >
              <div>
                <span className="text-xs uppercase text-blue-600 font-semibold tracking-wide">
                  {headline.category}
                </span>
                <h3 className="text-xl font-bold mt-2">{headline.title}</h3>
                <p className="mt-2 text-gray-700 font-serif">
                  {headline.summary}
                </p>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Author: {headline.author}
                </p>

                <ShareButton
                  title={headline.title}
                  url={`${process.env.NEXT_PUBLIC_BASE_URL}/edition/${date}`}
                />
              </div>
            </article>
          ))}
        </section>

        {/* Weather Section */}
        <WeatherSection
          weather={edition.weather}
          temperature={edition.temperature}
        />
        {/* Letter from a Citizen */}
        <CitizenLetter
          name={edition.letterFromCitizen.name}
          letter={edition.letterFromCitizen.letter}
          date={date}
        />
      </div>
      <div className="flex justify-center mt-2 mb-8">
        <Toaster />
        <button
          onClick={handleFavorite}
          className={`flex items-center gap-2 px-6 py-3 rounded-full shadow transition font-bold cursor-pointer ${
            favoriteId
              ? "bg-yellow-300 hover:bg-yellow-400 text-black"
              : "bg-yellow-300 hover:bg-yellow-400 text-black"
          }`}
        >
          {favoriteId ? (
            <span className="flex items-center gap-2">
              <Star
                className="h-5 w-5 text-black"
                fill="yellow"
                stroke="black"
              />
              Saved to Favorites
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Star
                className="h-5 w-5 text-black"
                fill="white"
                stroke="black"
              />
              Save to Favorites
            </span>
          )}
        </button>
      </div>
    </main>
  );
}
