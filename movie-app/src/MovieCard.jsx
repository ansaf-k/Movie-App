
const MovieCard = (movies) => {


  return (
    <div className="movie">
      <div>
        <p> {movies.state.Year} </p>
      </div>

      <div>
        <img src={movies.state.Poster} alt="Movie Poster" />
      </div>

      <div>
        <span>{movies.state.Type}</span>
        <h3>{movies.state.Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard; 