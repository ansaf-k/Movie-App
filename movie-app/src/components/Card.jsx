import { useEffect, useState } from "react";

const Card = () => {

    const API_KEY = "944cdd190650ca9f1b9edc47da5d7b72";
    const [movieList, setMovieList] = useState([]);
    const getMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setMovieList(jsonData.results);
            console.warn(movieList);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <>
            <div className="bg-gray-900">
                <div className="flex flex-wrap justify-center my-10 mx-4 md:mx-14">
                    {movieList.map((movie, index) => (
                        <div key={index} className="relative max-w-xs bg-white hover:scale-[1.02] transition-all duration-300 ease-out border-none rounded-lg shadow m-3">
                            <a href="#">
                                <img className="rounded-lg w-full h-auto grayscale-[.25]" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                            </a>
                            <div className="p-5 absolute bottom-0 bg-gradient-to-t from-gray-900 to-transparent"> {/* Reduced padding */}
                                <a href="#">
                                    <h5 className="mb-1 text-lg font-bold tracking-tight text-white dark:text-white">{movie.title}</h5> {/* Reduced font size */}
                                </a>
                                <p className="mb-2 text-sm font-normal text-white dark:text-gray-400">{movie.overview.slice(0, 100)}...</p> {/* Reduced font size and length */}
                                <a href="#" className="inline-flex items-center px-3 py-2 text-s font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 bg-opacity-75 duration-200 ease-out">
                                    Watch Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>  
            </div>
        </>
    )
}

export default Card