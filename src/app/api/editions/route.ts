import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const editionsDir = path.join(process.cwd(), "public", "data");
    const files = await fs.promises.readdir(editionsDir);

    const today = new Date().toISOString().split("T")[0];

    const editions = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const filePath = path.join(editionsDir, file);
          const content = await fs.promises.readFile(filePath, "utf-8");
          const json = JSON.parse(content);

          return {
            date: json.date,
            title: json.headlines?.[0]?.title || "Untitled",
            featuredImage: json.featuredImage || null,
          };
        })
    );

    // 🛑 Exclude today's edition
    const filteredEditions = editions.filter(
      (edition) => edition.date !== today
    );

    // Sort by newest first
    filteredEditions.sort((a, b) => (a.date > b.date ? -1 : 1));

    return NextResponse.json({ editions: filteredEditions });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to load editions" },
      { status: 500 }
    );
  }
}
