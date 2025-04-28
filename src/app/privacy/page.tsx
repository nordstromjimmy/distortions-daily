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
      <h1 className="text-4xl font-display font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 font-serif text-lg">
        At <strong>Distortions Daily</strong>, we respect your privacy and are
        committed to protecting it. This policy outlines what information we
        collect, how we use it, and your choices regarding your data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Information We Collect
      </h2>
      <ul className="list-disc pl-6 mb-4 font-serif text-lg">
        <li>
          Standard server logs (IP address, browser type, etc.) automatically
          recorded for security and analytics purposes.
        </li>
        <li>
          When you sign up for an account, we collect your email address and
          create a user profile.
        </li>
        <li>
          Emails collected during signup are added to our mailing list for
          occasional updates, news, and new edition announcements.
        </li>
        <li>
          We use third-party services like Plausible Analytics (privacy-first)
          to anonymously collect visitor metrics. No personally identifiable
          information is tracked.
        </li>
        <li>
          We display third-party advertising (Google AdSense) which may use
          cookies to serve relevant ads.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Information</h2>
      <p className="mb-4 font-serif text-lg">
        The information we collect is used solely to:
      </p>
      <ul className="list-disc pl-6 mb-4 font-serif text-lg">
        <li>Maintain and improve website functionality and performance.</li>
        <li>
          Send important updates, newsletters, and occasional satirical
          dispatches to subscribed users.
        </li>
        <li>
          Analyze aggregate site usage trends (without tracking individuals).
        </li>
        <li>Serve advertisements to support the platform.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
      <p className="mb-4 font-serif text-lg">
        We may use cookies to improve user experience and serve advertisements.
        You can disable cookies via your browser settings at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Data Sharing</h2>
      <p className="mb-4 font-serif text-lg">
        We do not sell, rent, or share your personal information with third
        parties outside of the services mentioned above (Plausible, Google
        AdSense). Your trust is important to us.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Satirical Content Disclaimer
      </h2>
      <p className="mb-4 font-serif text-lg">
        All content on Distortions Daily is fictional and intended for
        entertainment purposes only. References to real-world individuals,
        organizations, or events are purely satirical.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Changes to This Policy
      </h2>
      <p className="mb-4 font-serif text-lg">
        We may update this Privacy Policy from time to time. Updates will be
        posted on this page, and continued use of the site after changes
        indicates your acceptance of the updated policy.
      </p>

      <p className="mt-8 font-sans text-sm text-gray-500">
        Last updated: April {new Date().getFullYear()}.
      </p>
    </main>
  );
}
