"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const response = await fetch("http://localhost:5000/watchlist");
        const data = await response.json();

        if (data.success) {
          const movieDetails = await Promise.all(
            data.movies.map(async (movieId) => {
              const res = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE5ZmU2YzA2YWVlNmYxNWFiNjEzYjFlYjA1NjhhYyIsIm5iZiI6MTczMjkwNDE3My44ODYwMDAyLCJzdWIiOiI2NzRhMDRlZDY0ZDRkM2YyNzE4ZjFmNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._E_F38WABQduywIHCxfCgnQA3alOj3zzHv_s8opSiH4",
                  },
                }
              );
              return res.json();
            })
          );
          setMovies(movieDetails);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWatchlist();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (movies.length === 0) {
    return <div>Your watchlist is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <div className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition duration-200">
              <img
                src={
                  movie.poster_path
                    ? `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
                    : "/unavailable.png"
                }
                alt={movie.title}
                className="w-full rounded-t-lg"
              />
              <div className="p-2 text-center font-semibold">{movie.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
