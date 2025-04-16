import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Cart from "./components/Cart";
import PaymentPopup from "./components/PaymentPopup";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const MovieStore = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [prices, setPrices] = useState(() => {
    const saved = localStorage.getItem("prices");
    return saved ? JSON.parse(saved) : {};
  });
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const fetchPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await res.json();
    setMovies(data.results);
  };

  const searchMovies = async () => {
    if (query.trim() === "") return fetchPopularMovies();
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowPopup(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showPopup]);

  const addToCart = (movie) => {
    if (!cart.find((item) => item.id === movie.id)) {
      setCart([...cart, movie]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4"
            onClick={searchMovies}
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAdd={addToCart}
              setPrices={setPrices}
              prices={prices}
            />
          ))}
        </div>
      </div>

      {showPopup && <PaymentPopup countdown={countdown} />}
    </div>
  );
};

export default MovieStore;
