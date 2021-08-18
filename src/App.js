import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from "axios";

function App() {
   const dummyMovies = [
      {
         id: 1,
         title: 'Some Dummy Movie',
         openingText: 'This is the opening text of the movie',
         releaseDate: '2021-05-18',
      },
      {
         id: 2,
         title: 'Some Dummy Movie 2',
         openingText: 'This is the second opening text of the movie',
         releaseDate: '2021-05-19',
      },
   ];

   const [movies, setMovies] = useState([]);

   const fetchMoviesHandler = async () => {
      try {
         const {data} = await axios.get("https://swapi.dev/api/films/");
         setMovies(data.results)
      } catch (err) {
         console.log(err.message)
      }
   }

   return (
       <React.Fragment>
          <section>
             <button onClick={fetchMoviesHandler}>Fetch Movies</button>
          </section>
          <section>
             <MoviesList movies={dummyMovies}/>
          </section>
       </React.Fragment>
   );
}

export default App;
