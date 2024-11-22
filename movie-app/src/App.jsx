import { Routes, Route } from "react-router-dom";
import "./App.css";
import Banner from "./components/Banner.jsx";
import Card from "./components/Card.jsx";
import NavbarHead from "./components/NavbarHead.jsx";
import { useState } from "react";
import MovieDetails from "./components/MovieDetails.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <NavbarHead onSearchChange={handleSearchChange} />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Card searchQuery={searchQuery} />
          </>
        } />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;