export const dynamic = "force-dynamic";
export const dynamicParams = true;

import fs from "fs/promises";
import path from "path";
import EditionClient from "@/app/components/EditionClient";

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
    console.log("Edition not found:", date);
    edition = null;
  }

  return <EditionClient date={date} edition={edition} />;
}
