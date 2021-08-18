import React, {useState, useEffect} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from "axios";
import MovieList from "./components/MoviesList";

function App() {

   const [isLoading, setIsLoading] = useState(false);
   const [movies, setMovies] = useState([]);
   const [movieError, setMovieError] = useState(false);

   const fetchMoviesHandler = async () => {
      setIsLoading(true)
      setMovieError(false);
      try {
         const {data} = await axios.get("https://swapi.dev/api/films/");

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

   //component did mount hook'o atitikmuo
   useEffect(() => {
      console.log("useeffect ran");
      fetchMoviesHandler()
   }, [])


   const showMoviesHandler = () => {
      if (!isLoading && movies.length > 0) {
         return <MovieList movies={movies}/>
      } else if (!isLoading && movies.length === 0 && !movieError) {
         return <p>No movies at the moment </p>
      } else if (movieError) {
         return <p> {movieError} </p>
      } else if (isLoading) {
         return <p>Loading ...</p>
      }
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
             {showMoviesHandler()}
             {/*{!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}*/}
             {/*{!isLoading && movies.length === 0 && !movieError && (*/}
             {/*    <p>No movies at the moment </p>*/}
             {/*)}*/}
             {/*{movieError && <p>{movieError}</p>}*/}
             {/*{isLoading && <p>Loading ...</p>}*/}
          </section>
       </React.Fragment>
   );
}

export default App;
