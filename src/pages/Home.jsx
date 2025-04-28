import React, { useEffect, useState } from "react";
import MovieFetcher from "../components/MovieFetcher";

export default function Home() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // 👈 New state for live suggestions

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(value)}`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
    }
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSuggestions([]); // 👈 Clear suggestions when submitting

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-red-800 text-center mt-8 uppercase">
        Watch Your Favorite Movies ❤
      </h1>

      <div className="relative w-full max-w-md mx-auto mt-8">
        <form onSubmit={handleQuery} className="flex items-center gap-4">
          <input
            type="text"
            onChange={handleChange}
            value={query}
            placeholder="Search for movies..."
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Search
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white w-full border border-gray-300 mt-1 rounded-md max-h-60 overflow-y-auto shadow-lg">
            {suggestions.map((movie) => (
              <li
                key={movie.id}
                className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                onClick={() => handleSuggestionClick(movie.title)}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <p className="text-center mt-8 text-purple-600 font-semibold">Loading...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {movies.map((movie) => (
            <MovieFetcher
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-500 font-semibold">
          No movies found. Please try a different search term. 🎯
        </p>
      )}
    </>
  );
}
