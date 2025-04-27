// src/app/api/generate-edition/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { date } = body;

  const today = date || new Date().toISOString().split("T")[0];

  const prompt = `
You are a satirical journalist. 

Your task is to take today’s real-world major news events happening around the date ${today} and twist them into satirical, absurd, ironic, or comedic versions.

Generate a daily edition including:

1. One featured headline based on the biggest current news (title, summary, category, author)
2. One story for each of these categories:
   - Politics
   - Business
   - Technology
   - Culture
   - Sports
   - Weather (can be surreal/poetic if needed)
3. A short 'Letter from a Citizen' (fictional citizen reflecting on the world satirically and sometimes with a mindset of a real conspiracy theorist).

**Special Instructions:**
- You may reference real public figures (politicians, celebrities, CEOs) from time to time if it enhances the satire.
- Do not use real private citizens.
- Most stories should be general unless adding a real public figure makes the satire stronger for example when mentioning a president or other leader always use the name of the person.
- All references to real people must clearly stay within humorous, absurd, or parody contexts.

**Rules:**
- The headlines should clearly mirror real-world news events, but with a satirical or absurdist twist.
- Do NOT simply copy real headlines — reimagine them creatively.
- The edition must feel coherent, witty, and relevant.

Output structured as JSON:

{
  "date": "${today}",
  "headlines": [
    {
      "title": "...",
      "summary": "...",
      "category": "...",
      "author": "...",
      "isFeatured": true
    },
    ...
  ],
  "weather": "...",
  "letterFromCitizen": {
    "name": "...",
    "letter": "..."
  }
}
  `.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 1500,
    });

    const text = response.choices[0].message?.content ?? "{}";
    const edition = JSON.parse(text);

    // Find featured headline
    const featured = edition.headlines.find((h: any) => h.isFeatured);

    if (featured) {
      // Generate DALL·E image based on featured story
      const dalleResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Create an imaginative, realistic photojournalism-style image that represents this satirical headline: "${featured.title}". Make it serious and grounded.`,
        n: 1,
        size: "1024x1024",
      });

      if (dalleResponse.data && dalleResponse.data.length > 0) {
        const imageUrl = dalleResponse.data[0].url;

        // Download image
        const imageRes = await fetch(imageUrl!);
        const imageBuffer = await imageRes.arrayBuffer();
        const imagePath = path.join(
          process.cwd(),
          "public",
          "images",
          `${today}.png`
        );

        await fs.writeFile(imagePath, Buffer.from(imageBuffer));

        // Link local image in the edition
        featured.imageUrl = `/images/${today}.png`;
        edition.featuredImage = `/images/${today}.png`; // Optional, if you want to use it globally
      }
    }

    // Generate random weather temperatures
    const tempCelsius = Math.floor(Math.random() * 35) - 10; // Range: -10°C to +24°C
    const tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32);

    edition.temperature = {
      celsius: tempCelsius,
      fahrenheit: tempFahrenheit,
    };

    // Save the edition JSON locally
    const dataPath = path.join(
      process.cwd(),
      "public",
      "data",
      `${today}.json`
    );
    await fs.writeFile(dataPath, JSON.stringify(edition, null, 2), "utf-8");

    return NextResponse.json({ success: true, edition });
  } catch (err: any) {
    console.error("OpenAI Generation Error:", err.message);
    return NextResponse.json(
      { error: "Failed to generate edition." },
      { status: 500 }
    );
  }
}
