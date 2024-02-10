import React, { useState, useEffect } from "react";
import countryData from "./countryData.json";
import "./App.css";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = countryData
        .filter((country) =>
          country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .map((country) => country.name);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowSuggestions(false);
      console.log("Escape");
    }
  };

  const handleSearch = () => {
    // You can perform search action here based on searchTerm
    console.log(`Search for: ${searchTerm}`);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a country..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {showSuggestions && (
        <ul className="suggestions-list">
          {suggestions.map((country, index) => (
            <li key={index}>{country}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;