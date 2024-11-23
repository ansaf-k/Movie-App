import { useEffect, useState } from "react"
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
    const API_KEY = "944cdd190650ca9f1b9edc47da5d7b72"
    const YOUTUBE_BASE_URL = "https://www.youtube.com/results?search_query="
    const [data, setData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    const getMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
            const jsonData = await response.json()
            setData(jsonData.results.slice(0, 5))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchMovies = async () => {
            await getMovies()
        }
        fetchMovies()
    
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
        }, 4000)
    
        return () => clearInterval(interval)
    }, [data.length])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length)
    }



    return (
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen">
            {data.map((movie, index) => (
                <div
                    key={movie.id}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black/60 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 text-white p-4 sm:p-6 md:p-8 lg:p-10">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">{movie.title}</h2>
                                <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-xl hidden sm:block">
                                    {movie.overview.length > 150 ? `${movie.overview.slice(0, 150)}...` : movie.overview}
                                </p>
                                <div className="flex justify-center space-x-2 sm:space-x-4 mb-4">
                                    <button 
                                        onClick={() => window.open(`${YOUTUBE_BASE_URL}${movie.title}+trailer`, '_blank')}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-2 sm:px-4 rounded text-xs sm:text-sm md:text-base"
                                    >
                                        <Play className="inline-block mr-1 w-3 h-3 sm:w-4 sm:h-4" /> Play Trailer
                                    </button>
                                    <button onClick={() => navigate(`/movie/${movie.id}`)} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 sm:py-2 sm:px-4 rounded text-xs sm:text-sm md:text-base">
                                        <Info className="inline-block mr-1 w-3 h-3 sm:w-4 sm:h-4" /> More Info
                                    </button>
                                </div>
                                <div className="flex justify-center space-x-2">
                                    {data.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`w-2 h-2 rounded-full ${
                                                idx === currentIndex ? 'bg-white' : 'bg-gray-400'
                                            }`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full"
                aria-label="Next slide"
            >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
        </div>
    )
}

export default Banner