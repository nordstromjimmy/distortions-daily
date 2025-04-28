"use client";
import { useEffect, useState } from "react";
import { Client, Account, Databases, ID, Query } from "appwrite";
import { useRouter } from "next/navigation";
import Link from "next/link";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

interface Favorite {
  $id: string;
  editionDate: string;
  title: string;
  imageUrl?: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const user = await account.get();

        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
          [
            Query.equal("userId", user.$id), // ✅ Correct query syntax now
          ]
        );

        const mappedFavorites: Favorite[] = response.documents.map(
          (doc: any) => ({
            $id: doc.$id,
            editionDate: doc.editionDate,
            title: doc.title,
            imageUrl: doc.imageUrl || null,
          })
        );

        setFavorites(mappedFavorites);
      } catch (error) {
        console.error("Not logged in or failed fetching favorites", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [router]);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading favorites...</p>
      </main>
    );
  }

  if (favorites.length === 0) {
    return (
      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex flex-row justify-around">
          {" "}
          <h1 className="text-4xl font-bold mb-8 text-center">
            <a href="/archive">Archive</a>
          </h1>
          <h1 className="text-4xl font-bold mb-8 text-center">
            <a href="/favorites">Favorites </a>
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center mt-22 text-center">
          {" "}
          <h1 className="text-4xl font-bold mb-4">No Favorites Yet</h1>
          <p className="text-gray-500">
            Save editions to your favorites to see them here!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <Link
        href={`/edition/${today}`}
        className="flex items-center justify-center w-64 mx-auto py-3 px-6 mb-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-full shadow-lg transition-all duration-300"
      >
        TODAY'S NEWS!
      </Link>
      <div className="flex flex-row justify-around">
        {" "}
        <h1 className="text-2xl font-display font-bold  mb-8 text-center hover:text-gray-600 underline">
          <a href="/archive">Archive</a>
        </h1>
        <h1 className="text-2xl font-display font-bold  mb-8 text-center hover:text-gray-600 underline">
          <a href="/favorites">Favorites </a>
        </h1>
      </div>
      <h1 className="text-lg font-serif mb-8 text-center">My Favorites</h1>
      <div className="grid gap-8 md:grid-cols-4">
        {favorites.map((favorite) => (
          <div
            key={favorite.$id}
            className="bg-white rounded-md overflow-hidden shadow hover:shadow-md transition flex flex-col"
          >
            {favorite.imageUrl && (
              <img
                src={favorite.imageUrl}
                alt={favorite.title}
                className="w-full h-38 object-cover"
              />
            )}

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-md font-bold mb-2">{favorite.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                {favorite.editionDate}
              </p>
              <a
                href={`/edition/${favorite.editionDate}`}
                className="mt-auto text-blue-600 hover:underline font-semibold"
              >
                Read Edition →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
