"use client";

import { useEffect, useRef, useState } from "react";
import { Search, User } from "lucide-react";
import { Input } from "./ui/input";

export default function Header({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-black/70 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center space-x-3">
        <img
          src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png"
          alt="Cineflix Logo"
          className="h-10 w-auto object-contain"
        />
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Cageflix
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <div ref={wrapperRef} className="relative">
          {!expanded && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-white hover:text-gray-300 transition mt-1"
            >
              <Search size={22} />
            </button>
          )}

          <Input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, genre, or description..."
            className={`absolute right-0 -top-5 bg-neutral-900 text-white placeholder-gray-400 rounded-md transition-all duration-300 ease-in-out px-4 py-2 w-72 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              expanded
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 pointer-events-none"
            } origin-top-right shadow-lg`}
          />
        </div>

        <div className="text-white cursor-pointer hover:text-gray-300 transition ">
          <User size={22} />
        </div>
      </div>
    </header>
  );
}
