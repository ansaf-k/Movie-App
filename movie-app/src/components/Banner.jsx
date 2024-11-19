import { useEffect, useState } from "react";
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';


const Banner = () => {

    const API_KEY = "944cdd190650ca9f1b9edc47da5d7b72";
    const [data, setData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);


    const getMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
            const jsonData = await response.json();
            setData(jsonData.results.slice(0, 5));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };


    return (
        <>
            <div className="relative w-full banner h-screen">
                {data.map((movie, index) => (
                    <div
                        key={movie.id}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-[70%] inset-0 flex justify-center bg-gradient-to-t from-gray-900 to-transparent">
                            <div className="text-white text-center p-4">
                                <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                                <p className="mb-4 mx-24 px-32">{movie.overview.slice(0, 350)}...</p>
                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    <Play className="inline-block mr-2" /> Play
                                </button>
                                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                    <Info className="inline-block mr-2" /> More Info
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                    <ChevronRight />
                </button>
                <div className="absolute bottom-4 opacity-40 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {data.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Banner



// {data.map((movie,index) =>(
//     <div key={index} className="relative h-[70vh] w-full overflow-hidden">
//     <img
//       src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
//       alt="Featured movie backdrop"
//       className="absolute inset-0 h-full w-full object-cover"
//     />
//     <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
//     <div className="absolute inset-0 flex items-center">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="max-w-2xl">
//           <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-6xl">{movie.title}</h1>
//           <p className="mb-6 text-lg text-gray-200 md:text-xl">
//             {movie.overview}
//           </p>
//           <div className="flex space-x-4">
//             <button className="flex items-center rounded-md bg-red-600 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:bg-red-700">
//               <Play className="mr-2 h-5 w-5" />
//               Play Trailer
//             </button>
//             <button className="flex items-center rounded-md bg-gray-800 bg-opacity-60 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80">
//               <Info className="mr-2 h-5 w-5" />
//               More Info
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// ))}