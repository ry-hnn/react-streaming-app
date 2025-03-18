import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = "31ebf24f";
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <h1>{movie.Title}</h1>
      <img className='movie-poster' src={movie.Poster} alt={`${movie.Title} Poster`} />
      <div className='movie-info'>
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
      </div>
    </div>
  );
}

export default MovieDetails;