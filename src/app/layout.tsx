import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Analytics from "./components/Analytics";

export const metadata = {
  metadataBase: new URL("https://distortionsdaily.com"),
  title:
    "Distortions Daily - daily satirical news twists from a universe slightly off course",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Where reality gets reimagined daily. Daily satirical news twists from a universe slightly off course.",
  openGraph: {
    title: "Distortions Daily",
    description:
      "Where reality gets reimagined daily. Today's real-world news — absurdified.",
    url: "https://distortionsdaily.com",
    siteName: "Distortions Daily",
    images: [
      {
        url: "https://distortionsdaily.com/og-image.png", // <- create this image soon!
        width: 1200,
        height: 630,
        alt: "Distortions Daily - Satirical News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Distortions Daily",
    description:
      "Where reality gets reimagined daily. Today's real-world news — absurdified.",
    images: ["https://distortionsdaily.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Just your normal stuff here like fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Merriweather:wght@400;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
