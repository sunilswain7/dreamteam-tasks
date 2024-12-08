
import BookmarkButton from "@/app/components/BookmarkButton";
import Review from "@/app/components/Review";
import Link from "next/link";




async function MovieDetails({params}) {

  const {id} =  await params;



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE5ZmU2YzA2YWVlNmYxNWFiNjEzYjFlYjA1NjhhYyIsIm5iZiI6MTczMjkwNDE3My44ODYwMDAyLCJzdWIiOiI2NzRhMDRlZDY0ZDRkM2YyNzE4ZjFmNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._E_F38WABQduywIHCxfCgnQA3alOj3zzHv_s8opSiH4'
    }
  };

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  const sres = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, options)

  const movie = await res.json();
  const similarData = await sres.json();
  const similarMovies = similarData.results;


  return (
    <div className=" container p-4 mx-10">
      <div className="flex gap-7">
      <img src={movie.poster_path?`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`: "/unavailable.png"} alt={movie.title} className=" h-[500px] w-auto rounded-t-lg" />
        <div className="flex-col">
          <h1 className="text-3xl font-bold mt-4 ">{movie.title}</h1>
          <div className="flex gap-4">
          <p>{movie.status}</p>
          <p>{movie.original_language}</p>
          <p className="py-1 px-2 bg-cyan-600 text-white me-2 rounded">Rating: {movie.vote_average}/10</p>
          <BookmarkButton movieId={id}></BookmarkButton>
          </div>
      
          <p className="mt-2"><strong>Genre:</strong> {movie.genres.map(genre => {return <span className="mx-1 p-1 text-black me-2 rounded bg-yellow-300 " key={genre.id}>{genre.name}</span> })}</p>
        
          
          
          <p className="text-white  mt-2">{movie.overview}</p>
          
        </div>
      </div>
      
      <div>
        <Review id={id}/>
      </div>

      <div>
        
        <h1 className="text-2xl mt-10 mb-2">Similar Movies</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
          {similarMovies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition duration-200">
                <img src={movie.poster_path?`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`: "/unavailable.png"} alt={movie.title} className="w-full rounded-t-lg" />
                <div className="p-2 text-center font-semibold flex-wrap">{movie.title}</div>
              </div>
            </Link>
          ))}
          </div>
      </div>
      
    </div>
  );
}

export default MovieDetails;