import React, { useEffect, useState } from 'react';
import SetPriceMovie from './components/SetPriceMovie';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SetPricePage = () => {
  const [movies, setMovies] = useState([]);
  const [prices, setPrices] = useState(() => {
    const saved = localStorage.getItem('prices');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem('prices', JSON.stringify(prices));
  }, [prices]);

  const fetchPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await res.json();
    setMovies(data.results);
  };

  const handleAddToCart = (movie) => {
    console.log('Added to cart:', movie);
    // Optional: dispatch to cart or update global state
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Set Movie Prices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {movies.map((movie) => (
          <SetPriceMovie
            key={movie.id}
            movie={movie}
            prices={prices}
            setPrices={setPrices}
            onAdd={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default SetPricePage;