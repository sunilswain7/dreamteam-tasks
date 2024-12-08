import Link from "next/link";


export default async function Home() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE5ZmU2YzA2YWVlNmYxNWFiNjEzYjFlYjA1NjhhYyIsIm5iZiI6MTczMjkwNDE3My44ODYwMDAyLCJzdWIiOiI2NzRhMDRlZDY0ZDRkM2YyNzE4ZjFmNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._E_F38WABQduywIHCxfCgnQA3alOj3zzHv_s8opSiH4'
    }
  };
  let movies = [];
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  const data = await res.json();
  movies = data.results

  return (
    <div className="mx-20 mt-4">
      <p className="text-xl text-gray-500">
      Welcome to <strong>Movies Area51</strong>, your ultimate destination for discovering, reviewing, and discussing the latest films. Whether you're a cinephile or just looking for your next movie night pick, we provide in-depth reviews, ratings, and recommendations on a wide range of movies, from blockbusters to hidden gems.
      </p>
      <h1 className="font-bold text-3xl">Trending Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-3 ">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`}>
          <div className="cursor-pointer ">
            <img src={movie.poster_path?`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`: "/unavailable.png"} alt={movie.title} className="w-full " />
            <div className="p-2 text-center font-semibold">{movie.title}</div>
          </div>
        </Link>
      ))}
      </div>
      
      
      
    </div>
  );
}

