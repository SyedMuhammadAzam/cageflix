import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus, FaInfoCircle } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  movie: {
    title: string;
    year: string;
    genres: string[];
    runtime: string;
  };
};

export default function MovieCard({ movie }: Props) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPoster() {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
        const response = await fetch(
          `https://www.omdbapi.com/?t=${encodeURIComponent(
            movie.title
          )}&apikey=${apiKey}`
        );
        const data = await response.json();
        if (data.Poster && data.Poster !== "N/A") {
          setPosterUrl(data.Poster);
        }
      } catch (error) {
        console.error("Failed to fetch poster:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPoster();
  }, [movie.title]);

  return (
    <div className="relative group">
      <MovieCardContent
        movie={movie}
        posterUrl={posterUrl}
        loading={loading}
        posterHeight="h-40"
      />

      <div className="pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-50 transition-all duration-300 ease-in-out">
        <MovieCardContent
          movie={movie}
          posterUrl={posterUrl}
          loading={loading}
          posterHeight="h-48"
          withActions
          className="w-72 shadow-2xl"
        />
      </div>
    </div>
  );
}

function MovieCardContent({
  movie,
  posterUrl,
  loading,
  posterHeight,
  withActions = false,
  className = "",
}: {
  movie: Props["movie"];
  posterUrl: string | null;
  loading: boolean;
  posterHeight: string;
  withActions?: boolean;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "bg-zinc-900 text-white overflow-hidden py-0 gap-2",
        className
      )}
    >
      <CardHeader className="p-0">
        <Poster url={posterUrl} loading={loading} className={posterHeight} />
      </CardHeader>
      <CardContent className="p-3">
        {withActions && <MovieActions />}
        <CardTitle className="text-sm mb-1 truncate">{movie.title}</CardTitle>
        <p className="text-xs text-gray-400">
          {movie.year} • {movie.runtime} mins
        </p>
        <p className="text-xs text-gray-500 truncate">
          {movie.genres.join(", ")}
        </p>
      </CardContent>
    </Card>
  );
}

function Poster({
  url,
  loading,
  className,
}: {
  url: string | null;
  loading: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full bg-gray-800 flex items-center justify-center",
        className
      )}
    >
      {loading ? (
        <div className="w-full h-full bg-gray-700 animate-pulse" />
      ) : url ? (
        <img
          src={url}
          alt="Movie Poster"
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="text-white text-sm text-center px-2">
          No Poster Available
        </span>
      )}
    </div>
  );
}

function MovieActions() {
  return (
    <div className="flex gap-2 mb-2">
      <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
        <FaPlay size={16} />
      </button>
      <button className="border border-gray-400 p-2 rounded-full hover:border-white transition">
        <FaPlus size={14} />
      </button>
      <button className="border border-gray-400 p-2 rounded-full hover:border-white transition">
        <FaInfoCircle size={14} />
      </button>
    </div>
  );
}
