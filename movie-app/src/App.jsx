import { Routes, Route } from "react-router-dom";
import "./App.css";
import Banner from "./components/Banner.jsx";
import Card from "./components/Card.jsx";
import NavbarHead from "./components/NavbarHead.jsx";
import { useState } from "react";
import MovieDetails from "./components/MovieDetails.jsx";


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <NavbarHead onSearchChange={handleSearchChange} />
      <Banner />
      <Routes>
        <Route path="/" element={<Card searchQuery={searchQuery} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;