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

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        We at Distortions Daily respect your privacy. We do not actively collect
        personal data from users browsing the site.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Information We Collect
      </h2>
      <p className="mb-4">
        - Standard server logs (IP address, browser type) may be recorded
        automatically for analytics and maintenance purposes.
        <br />- If you contact us directly, we may collect your email address
        and name.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Information</h2>
      <p className="mb-4">
        Any information collected is used solely to maintain and improve the
        website or respond to inquiries. We do not sell, rent, or share your
        personal data with third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
      <p className="mb-4">
        We may use cookies for basic website functionality or analytics
        purposes. You can disable cookies via your browser settings if you
        prefer.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Please check this
        page periodically for any changes.
      </p>

      <p className="mt-8">Last updated: April {new Date().getFullYear()}.</p>
    </main>
  );
}
