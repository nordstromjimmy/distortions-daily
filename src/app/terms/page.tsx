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
      <h1 className="text-4xl font-display font-bold mb-6">Terms of Service</h1>

      <p className="mb-4 font-serif text-lg">
        By accessing and using <strong>Distortions Daily</strong> ("the Site"),
        you agree to be bound by the following Terms of Service. If you do not
        agree with these terms, please do not use the Site.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        1. Satirical Content Disclaimer
      </h2>
      <p className="mb-4 font-serif text-lg">
        All articles, headlines, characters, and quotes published on Distortions
        Daily are fictional and intended for entertainment and satire purposes
        only. Any resemblance to real persons, organizations, or events is
        purely coincidental or used in a clearly satirical context.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Accounts</h2>
      <p className="mb-4 font-serif text-lg">
        Users may create an account to access certain features, such as browsing
        the full Archive. By signing up, you agree to provide accurate
        information and maintain the confidentiality of your login credentials.
        We reserve the right to suspend or terminate accounts for violation of
        these Terms or inappropriate behavior.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        3. Email Communications
      </h2>
      <p className="mb-4 font-serif text-lg">
        By creating an account, you consent to receive occasional emails related
        to site updates, new editions, announcements, and satirical dispatches.
        You may unsubscribe from these communications at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        4. Intellectual Property
      </h2>
      <p className="mb-4 font-serif text-lg">
        All content published on Distortions Daily is the intellectual property
        of the site owner unless otherwise noted. Unauthorized reproduction,
        distribution, or modification of our content without prior written
        permission is strictly prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        5. Limitation of Liability
      </h2>
      <p className="mb-4 font-serif text-lg">
        The Site is provided "as is" without warranties of any kind. We are not
        responsible for any direct, indirect, incidental, or consequential
        damages arising from the use or inability to use the Site, including
        reliance on any content published herein.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
      <p className="mb-4 font-serif text-lg">
        We reserve the right to update or modify these Terms of Service at any
        time without prior notice. Your continued use of the Site constitutes
        acceptance of the updated terms.
      </p>

      <p className="mt-8 font-sans text-sm text-gray-500">
        Last updated: April {new Date().getFullYear()}.
      </p>
    </main>
  );
}
