import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Star, Clock, Calendar, Globe, DollarSign, Film, Flag, MessageCircle, Building2 } from 'lucide-react'

const API_KEY = "944cdd190650ca9f1b9edc47da5d7b72"

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        )
        const data = await response.json()
        console.log(data);

        setMovie(data)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (!movie) return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div className="pt-20">
        <div className="relative w-full h-[60vh]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-2 text-shadow">{movie.title}</h1>
              <p className="text-xl md:text-2xl text-gray-300 italic">{movie.tagline || ''}</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-yellow-300 text-gray-900 rounded-full px-4 py-2 font-bold text-lg flex items-center">
            <Star className="w-5 h-5 mr-1 fill-current" />
            {movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A'}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <img
                className="w-full rounded-lg shadow-2xl"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="md:w-2/3 space-y-8">
              <div className="flex flex-wrap gap-3">
                {movie.genres && movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-gray-800 text-sm px-4 py-2 rounded-full border border-gray-700">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{movie.release_date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{movie.runtime ? `${movie.runtime} minutes` : 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Film className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{movie.status}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3 border-b border-gray-700 pb-2">Overview</h2>
                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Production Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-start">
                      <span className="text-gray-400 mr-2 font-medium">Companies:</span>
                      <span>{movie.production_companies ? movie.production_companies.map(company => company.name).join(", ") : 'N/A'}</span>
                    </p>
                    <p className="flex items-start">
                      <Flag className="w-4 h-4 mr-2 text-gray-400 mt-1 flex-shrink-0" />
                      <span>{movie.production_countries ? movie.production_countries.map(country => country.name).join(", ") : 'N/A'}</span>
                    </p>
                    <p className="flex items-start">
                      <MessageCircle className="w-4 h-4 mr-2 text-gray-400 mt-1 flex-shrink-0" />
                      <span>{movie.spoken_languages ? movie.spoken_languages.map(lang => lang.english_name).join(", ") : 'N/A'}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Financial Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <span className="text-gray-400 mr-2 font-medium">Budget:</span>
                      <span>{movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="text-gray-400 mr-2 font-medium">Revenue:</span>
                      <span>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</span>
                    </p>
                  </div>
                </div>
              </div>

              {movie.homepage && (
                <div className="mt-8">
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 shadow-lg"
                  >
                    Visit Official Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

