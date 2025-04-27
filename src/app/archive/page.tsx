"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account, Databases, Query } from "appwrite";

interface Edition {
  date: string;
  title: string;
  featuredImage: string | null;
}

interface Favorite {
  editionDate: string;
}

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

export default function ArchivePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/editions");
        const data = await res.json();
        setEditions(data.editions || []);

        // Safely check if user is logged in
        try {
          const user = await account.get();
          setIsAuthenticated(true);

          const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
            [Query.equal("userId", user.$id)]
          );

          const mappedFavorites: Favorite[] = response.documents.map(
            (doc: any) => ({
              editionDate: doc.editionDate,
            })
          );

          setFavorites(mappedFavorites);
        } catch (error) {
          console.log("Guest user — skipping favorites check");
          router.push("/login");
          setIsAuthenticated(false);
          setFavorites([]);
        }
      } catch (error) {
        console.error("Failed fetching editions", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading archive...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null; // Already redirected
  }

  // ✅ User is authenticated — show archive
  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-row justify-around">
        {" "}
        <h1 className="text-2xl font-bold mb-8 text-center hover:text-blue-600">
          <a href="/archive">Archive</a>
        </h1>
        <h1 className="text-2xl font-bold mb-8 text-center hover:text-blue-600">
          <a href="/favorites">Favorites</a>
        </h1>
      </div>
      <h1 className="text-lg font-bold mb-8 text-center">The Archive</h1>
      {editions.length === 0 ? (
        <p className="text-center text-gray-500">No editions available yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {editions.map((edition) => {
            const isFavorited = favorites.some(
              (fav) => fav.editionDate === edition.date
            );

            return (
              <div
                key={edition.date}
                className="relative bg-white rounded-md overflow-hidden shadow hover:shadow-md transition flex flex-col"
              >
                {/* If favorited, show star badge */}
                {isFavorited && (
                  <div className="absolute top-2 right-2 bg-yellow-300 text-black px-2 py-1 text-xs font-bold rounded-full shadow">
                    ⭐ Saved
                  </div>
                )}

                {edition.featuredImage && (
                  <img
                    src={edition.featuredImage}
                    alt={edition.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold mb-2">{edition.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">{edition.date}</p>
                  <a
                    href={`/edition/${edition.date}`}
                    className="mt-auto text-blue-600 hover:underline font-semibold"
                  >
                    Read Edition →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
