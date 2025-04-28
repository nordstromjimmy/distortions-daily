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

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        By accessing and using this site, you agree to be bound by the following
        Terms of Service. If you do not agree, please do not use the Site.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        1. Content Disclaimer
      </h2>
      <p className="mb-4">
        All content on the Site, including articles, headlines, characters, and
        quotes, is fictional and satirical. Any references to real persons,
        organizations, or events are used purely for parody purposes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        2. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on the Site is owned by the owner of this site unless
        otherwise stated. You may not reproduce, distribute, or otherwise
        exploit our content without prior written permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        3. Limitation of Liability
      </h2>
      <p className="mb-4">
        This site is provided "as is" without warranties of any kind. We are not
        responsible for any damages arising from your use or inability to use
        the Site.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these Terms of Service at any time. Your
        continued use of the Site constitutes acceptance of the updated terms.
      </p>

      <p className="mt-8">Last updated: April {new Date().getFullYear()}.</p>
    </main>
  );
}
