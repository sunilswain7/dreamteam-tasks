import Link from "next/link";

async function Search({searchParams}) {
  const query = searchParams.query;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE5ZmU2YzA2YWVlNmYxNWFiNjEzYjFlYjA1NjhhYyIsIm5iZiI6MTczMjkwNDE3My44ODYwMDAyLCJzdWIiOiI2NzRhMDRlZDY0ZDRkM2YyNzE4ZjFmNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._E_F38WABQduywIHCxfCgnQA3alOj3zzHv_s8opSiH4'
    }
  };
  
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
  const data = await res.json();
  const movies = data.results;

  return (
    <div>
      <div >
      <h1>Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`}>
          <div className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition duration-200">
            <img src={movie.poster_path?`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`: "/unavailable.png"} alt={movie.title} className="w-full rounded-t-lg" />
            <div className="p-2 text-center font-semibold">{movie.title}</div>
          </div>
        </Link>
      ))}
      </div>
      
      
      
    </div>
    </div>
  )
}

export default Search