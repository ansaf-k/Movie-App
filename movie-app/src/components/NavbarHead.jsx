import { useState } from "react"
import "./Component.css"
import { Search, Menu, X } from 'lucide-react';
import PropTypes from "prop-types";

const NavbarHead = ({ scrollToMovies, onSearchChange }) => {

  const [searchMovies, setSearchMovies] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchMovies(value);
    onSearchChange(value);
  };


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm shadow-md font">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0">
                <span className="text-white text-4xl font-bold tracking-wide">CINEFLIX</span>
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Home</a>
                  <a onClick={scrollToMovies} className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Movies</a>
                </div>
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white p-1 transition duration-150 ease-in-out">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            <div className={`flex items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:flex`}>
              <div className="relative mr-4">
                <input
                  type="text"
                  value={searchMovies}
                  onChange={handleSearchChange}
                  placeholder="Search movies, TV shows..."
                  className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:font-sans focus:outline-none focus:lg:w-96 focus:ring-gray-600 w-64 transition-all duration-150 ease-in-out"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col space-y-2 mt-2">
              <a href="/" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Home</a>
              <a onClick={scrollToMovies} className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Movies</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

NavbarHead.propTypes = {
  scrollToMovies: PropTypes.func.isRequired, // Validate that scrollToMovies is a required function
  onSearchChange: PropTypes.func.isRequired, // Validate that onSearchChange is a required function
};

export default NavbarHead;