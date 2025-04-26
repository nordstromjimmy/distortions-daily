"use client";

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  const handleShare = () => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  return (
    <button
      onClick={handleShare}
      className="mt-4 inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-black text-white hover:bg-black transition cursor-pointer"
    >
      Share on X
    </button>
  );
}
