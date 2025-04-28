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

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-display font-bold mb-6">
        About Distortions Daily
      </h1>

      <p className="mb-4 font-serif text-lg">
        Welcome to <strong>Distortions Daily</strong> — a satirical news outlet
        where reality gets a playful twist. Every day, we reimagine major
        headlines with a dash of absurdity, irony, and good old-fashioned
        nonsense.
      </p>

      <p className="mb-4 font-serif text-lg">
        Our daily editions reflect a slightly off-kilter version of the world
        you think you know. From politics and business to technology and
        culture, nothing is safe from satire.
      </p>

      <p className="mb-4 font-serif text-lg">
        <strong>Important:</strong> All articles, headlines, characters, and
        quotes on this site are entirely fictional and intended for
        entertainment purposes only. Any resemblance to real persons or events
        is purely satirical.
      </p>

      <p className="mb-4 font-serif text-lg">
        Distortions Daily is where chaos meets creativity — and where the line
        between fake and real blurs... intentionally.
      </p>

      <p className="mt-8 font-sans text-sm text-gray-500">
        Distortions Daily &copy; {new Date().getFullYear()}
      </p>
    </main>
  );
}
