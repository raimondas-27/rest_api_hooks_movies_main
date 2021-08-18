import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from "axios";

function App() {

   const [isLoading, setIsLoading] = useState(false);
   const [movies, setMovies] = useState([]);
   const [movieError, setMovieError] = useState(false);

   const fetchMoviesHandler = async () => {
      setIsLoading(true)
      setMovieError(false);
      try {
         const {data} = await axios.get("https://swapi.dev/api/film/");

         //perdyti duomenis i mums reikalingus
         console.log(data.results)
         const moviesTransformed = data.results.map((oneMovie) => {
            return {
               id: oneMovie.episode_id,
               title: oneMovie.title,
               openingText: oneMovie.opening_crawl,
               releaseDate: oneMovie.release_date,
            };
         })
         setMovies(moviesTransformed);
      } catch (err) {
         console.log(err.message)
         setMovieError(err.message);
      }
      setIsLoading(false);
   }

   return (
       <React.Fragment>
          <section>
             <button disabled={isLoading}
                     onClick={fetchMoviesHandler}>
                {isLoading ? "loading" : "Fetch Movies"}
             </button>
          </section>
          <section>
             {!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
             {!isLoading && movies.length === 0 && <p>No movies at the moment </p>}
             {isLoading && <p>Loading ...</p>}
          </section>
       </React.Fragment>
   );
}

export default App;
