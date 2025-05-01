import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import EditionClient from "@/app/components/EditionClient";

export async function generateMetadata({
  params,
}: {
  params: { date: string };
}): Promise<Metadata> {
  const date = params.date;

  return {
    title: `Distortions Daily – Edition ${date}`,
    description: `Read the absurd headlines of ${date} from an alternate reality.`,
    openGraph: {
      title: `Distortions Daily – ${date}`,
      description: `Explore today's satire from another timeline.`,
      images: [`/images/${date}.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: `Distortions Daily – ${date}`,
      description: `Read the absurd headlines of ${date} from an alternate reality.`,
      images: [`/images/${date}.png`],
    },
  };
}

export default async function EditionPage({
  params,
}: {
  params: { date: string };
}) {
  const { date } = params;

  let edition = null;

  try {
    const filePath = path.join(process.cwd(), "public/data", `${date}.json`);
    const content = await fs.readFile(filePath, "utf-8");
    edition = JSON.parse(content);
  } catch (error) {
    edition = null;
  }

  return <EditionClient date={date} edition={edition} />;
}
