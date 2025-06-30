"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

interface Movie {
  id: string;
  title: string;
  year: string;
  genres: string[];
  runtime: string;
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);

  const uniqueGenres = Array.from(
    new Set(movies.flatMap((movie) => movie.genres))
  ).sort();

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = movies;

    if (search) {
      const fuse = new Fuse(result, {
        keys: ["title", "genres", "year", "runtime"],
        threshold: 0.3,
      });
      result = fuse.search(search).map((r) => r.item);
    }

    if (selectedGenre) {
      result = result.filter((movie) => movie.genres.includes(selectedGenre));
    }

    setFiltered(result);
  }, [search, selectedGenre, movies]);

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w mx-auto">
      <Header search={search} setSearch={setSearch} />
      <SubHeader
        genres={uniqueGenres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      <div className="relative z-0 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : filtered.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </main>
  );
}
