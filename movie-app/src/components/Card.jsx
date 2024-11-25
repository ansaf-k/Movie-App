import { Play } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Component.css"

const Card = ({ movieRef, searchQuery }) => {
    const navigate = useNavigate();
    const API_KEY = "944cdd190650ca9f1b9edc47da5d7b72";
    const [movieList, setMovieList] = useState([]);
    const [category, setCategory] = useState('popular');

    const categoryOptions = [
        { id: 'popular', name: 'Popular' },
        { id: 'trending', name: 'Trending' },
        { id: 'top_rated', name: 'Top Rated' },
        { id: 'upcoming', name: 'Upcoming' },
        { id: 'now_playing', name: 'Now Playing' }
    ];

    const getMovies = async (query, category = 'popular') => {
        const url = query
            ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
            : category === 'trending'
                ? `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
                : `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`;
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            setMovieList(jsonData.results);
            console.warn(movieList);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovies(searchQuery, category);
    }, [searchQuery, category])

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };



    return (
        <>
            <div ref={movieRef}>
                <div className="bg-gray-900">
                    <div className="sm:px-3 flex overflow-x-auto pt-8 space-x-4 scrollbar-hide justify-center">
                        {categoryOptions.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all duration-300 ${category === cat.id
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center my-10 mx-4 md:mx-14">
                        {movieList.map((movie, index) => (
                            <div
                                key={index}
                                className="main-trance relative w-64 bg-white hover:scale-[1.02] transition-all duration-300 ease-out border-none rounded-lg shadow m-3 cursor-pointer"
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                                <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                                    {movie.poster_path ? (
                                        <img
                                            className="w-full h-full object-cover grayscale-[.25]"
                                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                            <p className="text-gray-600 text-center px-4">Image Not Available</p>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute top-2 right-2 bg-amber-400 text-black text-sm font-bold px-2 py-1 rounded-full shadow trance opacity-0">
                                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                </div>
                                <div className="p-3 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent trance opacity-0 transition-opacity duration-300">
                                    <h5 className="mb-1 text-xl font-bold tracking-tight text-white">
                                        {movie.title}
                                        {movie.release_date && (
                                            <span className="ml-2 text-sm font-normal text-gray-300">
                                                ({new Date(movie.release_date).getFullYear()})
                                            </span>
                                        )}
                                    </h5>

                                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 transition-colors duration-200 ease-out trance opacity-0">
                                        <Play className="w-4 h-4 mr-2" />
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

Card.propTypes = {
    movieRef: PropTypes.object.isRequired,
    searchQuery: PropTypes.object.isRequired,
}

export default Card;