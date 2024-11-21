import { useEffect, useState } from "react";
import {  Navigate, useNavigate } from "react-router-dom";

const Card = ({ searchQuery, categories }) => {
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
            <div className="bg-gray-900">
                <div className="flex justify-center space-x-4 pt-8">
                    {categoryOptions.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 ${category === cat.id
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
                            className="relative max-w-xs bg-white hover:scale-[1.02] transition-all duration-300 ease-out border-none rounded-lg shadow m-3 cursor-pointer"
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            <div>
                                <img className="rounded-lg w-full h-auto grayscale-[.25]" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div className="p-5 absolute bottom-0 bg-gradient-to-t from-gray-900 to-transparent">
                                <div>
                                    <h5 className="mb-1 text-lg font-bold tracking-tight text-white dark:text-white">{movie.title}</h5>
                                </div>
                                <p className="mb-2 text-sm font-normal text-white dark:text-gray-400">{movie.overview.slice(0, 100)}...</p>
                                <button className="inline-flex items-center px-3 py-2 text-s font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 bg-opacity-75 duration-200 ease-out">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Card;