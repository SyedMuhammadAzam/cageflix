"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SubHeaderProps = {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
};

export default function SubHeader({
  genres,
  selectedGenre,
  onGenreChange,
}: SubHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 px-6 pt-3">
      <h2 className="text-2xl font-semibold">Nicolas Cage Movies</h2>

      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-[180px] bg-gray-800 border border-gray-600 text-white">
          <SelectValue placeholder="Filter by genre" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-white border border-gray-700">
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
