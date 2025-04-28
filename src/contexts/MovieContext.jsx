import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

// Custom hook to use the context
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the app loads
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) {
      // Parse and filter invalid entries
      const parsedFavorites = JSON.parse(storedFavs).filter(
        (movie) => movie && movie.id
      );
      setFavorites(parsedFavorites); // Set valid favorites
    }
  }, []);

  // Update localStorage only when favorites array is modified
  useEffect(() => {
    if (favorites.length > 0) {
      // If there are favorites, update localStorage with the current list
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      // If there are no favorites, clear localStorage
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  // Function to add a movie to favorites
  function addFavorites(movie) {
    setFavorites((prev) => [...prev, movie]);
  }

  // Function to remove a movie from favorites
  function removeFavorites(movieId) {
    // Filter out the movie with the given ID from the favorites array
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }

  // Check if a movie is in the favorites
  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId);
  }

  const value = {
    favorites,
    addFavorites,
    removeFavorites,
    isFavorite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
