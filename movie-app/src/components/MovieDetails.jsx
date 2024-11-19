import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const { id } = useParams();
    const API_KEY = "944cdd190650ca9f1b9edc47da5d7b72";
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
                );
                const data = await response.json();
                setMovie(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="bg-gray-900 min-h-screen text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <img
                            className="w-full rounded-lg shadow-lg"
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                        <p className="text-gray-300 mb-4">{movie.tagline}</p>
                        <div className="mb-4">
                            <span className="text-red-500 font-bold">Rating:</span>{" "}
                            {movie.vote_average.toFixed(1)}/10
                        </div>
                        <div className="mb-4">
                            <span className="text-red-500 font-bold">Release Date:</span>{" "}
                            {movie.release_date}
                        </div>
                        <div className="mb-4">
                            <span className="text-red-500 font-bold">Runtime:</span>{" "}
                            {movie.runtime} minutes
                        </div>
                        <div className="mb-6">
                            <span className="text-red-500 font-bold">Genres:</span>{" "}
                            {movie.genres.map(genre => genre.name).join(", ")}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Overview</h2>
                            <p className="text-gray-300">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;    