import React from 'react';

const MovieCard = ({ movie, onAdd, setPrices, prices }) => (
  <div className="border p-3 rounded bg-white shadow">
    <h2 className="font-bold text-lg mb-1">{movie.title}</h2>
    <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>
    <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-60 object-cover rounded mb-2"
    />
    <div className="mt-2 font-semibold text-blue-600">
        Price: ฿{prices[movie.id] || 'N/A'}
    </div>
    <button className="bg-green-500 text-white w-full mt-2" onClick={() => onAdd(movie)}>
      Add to Cart
    </button>
  </div>
);

export default MovieCard;