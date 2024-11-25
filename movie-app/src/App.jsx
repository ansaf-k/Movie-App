import { Routes, Route } from "react-router-dom";
import "./App.css";
import Banner from "./components/Banner.jsx";
import Card from "./components/Card.jsx";
import NavbarHead from "./components/NavbarHead.jsx";
import { useRef, useState } from "react";
import MovieDetails from "./components/MovieDetails.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const moviesRef = useRef(null);

  const scrollToMovies = () => {
    if (moviesRef.current) {
      moviesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <NavbarHead scrollToMovies={scrollToMovies} onSearchChange={handleSearchChange} />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Card movieRef={moviesRef} searchQuery={searchQuery} />
          </>
        } />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;