export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-gray-900">
          Distortions Daily
        </h1>

        <p className="text-xl md:text-2xl font-serif text-gray-600 italic max-w-2xl mx-auto">
          Satirical daily news inspired by real-world headlines, <br />
          from a world just a few steps off course.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <a
            href={`/edition/${new Date().toISOString().split("T")[0]}`}
            className="px-6 py-3 bg-gray-900 text-white text-lg font-sans font-semibold rounded hover:bg-gray-800 transition"
          >
            Read Today's Edition →
          </a>
          <a
            href="/archive"
            className="px-6 py-3 bg-white text-gray-900 border border-gray-300 text-lg font-sans font-semibold rounded hover:bg-gray-100 transition"
          >
            Browse Archive
          </a>
        </div>
      </div>
    </main>
  );
}
