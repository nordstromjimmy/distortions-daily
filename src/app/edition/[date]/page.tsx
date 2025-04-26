import CitizenLetter from "@/app/components/CitizenLetter";
import ShareButton from "@/app/components/ShareButton";
import WeatherSection from "@/app/components/WeatherSection";
import { notFound } from "next/navigation";

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

export default async function EditionPage({
  params,
}: {
  params: { date: string };
}) {
  const { date } = params;
  const edition = await fetchEdition(date);

  if (!edition) {
    // Enhanced missing edition logic
    const requestedDate = new Date(date);
    const today = new Date();

    if (isNaN(requestedDate.getTime())) {
      return notFound(); // Invalid date
    }

    // Normalize dates to ignore hours/mins/seconds
    const normalizedRequestedDate = new Date(
      requestedDate.toISOString().split("T")[0]
    );
    const normalizedToday = new Date(today.toISOString().split("T")[0]);

    if (normalizedRequestedDate > normalizedToday) {
      // Future date
      return (
        <main className="h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the Future! 🚀{" "}
          </h1>
          <p className="text-gray-500">
            This edition hasn’t been written yet. Check back later!
          </p>
        </main>
      );
    } else if (normalizedRequestedDate < normalizedToday) {
      // Past date
      return (
        <main className="h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-4">Archive Coming Soon 📜 </h1>
          <p className="text-gray-500">
            This past edition isn’t available yet. Stay tuned!
          </p>
        </main>
      );
    } else {
      // Today but missing
      return (
        <main className="h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-4">
            🔄 Today's Edition is Loading...
          </h1>
          <p className="text-gray-500">
            Our reporters are still typing. Refresh a little later!
          </p>
        </main>
      );
    }
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
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <span className="text-xs uppercase text-pink-600 font-semibold tracking-wider">
                {featured.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg text-gray-700">{featured.summary}</p>
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
                <p className="mt-2 text-gray-700">{headline.summary}</p>
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
    </main>
  );
}
