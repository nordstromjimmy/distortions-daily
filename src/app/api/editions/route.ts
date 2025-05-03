import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Get the base URL from env or fallback to localhost
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // Example: we assume you already know the filenames or they follow a known pattern
    // Let's simulate a list for demonstration
    const possibleDates = generateRecentDates(30); // Get last 30 days

    const editions = (
      await Promise.all(
        possibleDates.map(async (date) => {
          try {
            const res = await fetch(`${baseUrl}/data/${date}.json`);
            if (!res.ok) return null;
            const json = await res.json();

            return {
              date: json.date,
              title: json.headlines?.[0]?.title || "Untitled",
              featuredImage: json.featuredImage || null,
            };
          } catch {
            return null;
          }
        })
      )
    ).filter(Boolean);

    const filteredEditions = editions.filter(
      (edition) => edition?.date !== today
    );

    filteredEditions.sort((a, b) => (a?.date > b?.date ? -1 : 1));

    return NextResponse.json({ editions: filteredEditions });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to load editions" },
      { status: 500 }
    );
  }
}

// 🔧 Generate past N days of possible edition filenames
function generateRecentDates(daysBack: number): string[] {
  const today = new Date();
  const dates: string[] = [];

  for (let i = 0; i < daysBack; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }

  return dates;
}
