import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'
import './styles.css';
import { useNavigate } from "react-router-dom"
const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearRange, setYearRange] = useState({ minYear: 2000, maxYear: 2025 });
  const navigate = useNavigate();

  const fetchMovies = async (searchTerm) => {
    const apiKey = "31ebf24f"; // Your OMDB API key
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
      );
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };


  

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      setLoading(true);
      fetchMovies(searchTerm.trim());
      navigate(`/find-movie?searchTerm=${searchTerm}`);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed
    return () => clearTimeout(timeout);
  }, [loading]);

  // const updateYearRange = () => {
  //   setYearRange({
  //     minYear: parseInt(document.getElementById("min-year").value),
  //     maxYear: parseInt(document.getElementById("max-year").value),
  //   });
  // };

  const enforceSliderRules = () => {
    const minYear = parseInt(document.getElementById("min-year").value);
    const maxYear = parseInt(document.getElementById("max-year").value);

    // Ensure the min slider doesn't exceed the max slider
    if (minYear > maxYear) {
      document.getElementById("min-year").value = maxYear;
    }

    // Ensure the max slider doesn't go below the min slider
    if (maxYear < minYear) {
      document.getElementById("max-year").value = minYear;
    }

    updateYearRange();
  };



};

export default MovieSearch;
