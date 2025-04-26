"use client";
import ShareButton from "./ShareButton";

interface CitizenLetterProps {
  name: string;
  letter: string;
  date: string; // <--- ADD this
}

export default function CitizenLetter({
  name,
  letter,
  date,
}: CitizenLetterProps) {
  return (
    <section className="bg-gray-50 p-6 rounded-md shadow-inner border-l-4 border-gray-300 flex flex-col gap-4">
      <div>
        <h4 className="text-lg font-bold uppercase mb-2 text-gray-700">
          Letter from a Citizen
        </h4>
        <blockquote className="italic text-gray-700 mb-2">
          “{letter}”
        </blockquote>
        <p className="text-sm text-gray-500 text-right">— {name}</p>
      </div>

      {/* Share Button */}
      <div className="flex justify-end">
        <ShareButton
          title={`"${letter.slice(0, 100)}..." — A Citizen's Letter`}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/edition/${date}`}
        />
      </div>
    </section>
  );
}
