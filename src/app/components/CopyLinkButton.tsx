"use client";

interface CopyLinkButtonProps {
  url: string;
}

export default function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard! 📋");
    } catch (err) {
      alert("Failed to copy link.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition ml-2"
    >
      <span className="mr-2">🔗</span>
      Copy Link
    </button>
  );
}
