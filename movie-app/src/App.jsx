import MovieCard from "./MovieCard.jsx";
import SearchIcon from "./assets/search.svg";

import "./App.css";
import { useState } from "react";

const App = () => {

  const api_url = 'http://www.omdbapi.com/?apikey=35b28753'
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${api_url}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>Movie World</h1>

      <div className="search">
        <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} placeholder="Search for movies" />
        <img onClick={() => { searchMovies(searchTerm) }} src={SearchIcon} alt="search" />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie,index) => (
            <MovieCard key={index} state={movie} />
          ))}
        </div>
        ) : (
          <h2 style={{ color: 'red' }}>no movies found</h2>
        )
      }

    </div>
  );
};

export default App;
